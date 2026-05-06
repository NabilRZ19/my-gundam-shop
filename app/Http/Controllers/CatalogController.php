<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CatalogController extends Controller
{
    public function index(Request $request)
    {
        // Prepare a mapper closure for product shape
        $topSellIds = Product::orderBy('sold', 'desc')->take(5)->pluck('id')->toArray();
        $newArrivalIds = Product::latest()->take(8)->pluck('id')->toArray();

        $mapProduct = function ($product, $forceBadge = null) use ($topSellIds, $newArrivalIds) {
            $scale = '1/144';
            if ($product->grade === 'PG') $scale = '1/60';
            elseif (in_array($product->grade, ['MG', 'FM'])) $scale = '1/100';
            elseif ($product->grade === 'SD' || $product->grade === 'MGSD') $scale = 'Non-scale';

            // Badge definitions:
            // new arrival, discount(sale), limited stock, pbandai, top sell
            $badges = [];
            
            if (in_array($product->id, $newArrivalIds)) {
                $badges['new'] = true;
            }
            if ($forceBadge !== null || ($product->discount > 0)) {
                $badges['discount'] = $forceBadge ?? $product->discount;
            }
            if ($product->stock > 0 && $product->stock < 10) {
                $badges['limited'] = true;
            }
            if ($product->is_pbandai) {
                $badges['pbandai'] = true;
            }
            if (in_array($product->id, $topSellIds) && $product->sold > 0) {
                $badges['top_sell'] = true;
            }

            return [
                'id'          => $product->id,
                'name'        => $product->name,
                'grade'       => $product->grade,
                'scale'       => $scale,
                'price'       => $product->price,
                'status'      => ucfirst(str_replace('_', ' ', $product->status)),
                'badges'      => $badges,
                'is_pbandai'  => $product->is_pbandai,
                'originality' => $product->originality,
                'img'         => $product->image_url,
                'series'      => $product->series,
                'stock'       => $product->stock,
                'sold'        => $product->sold,
            ];
        };

        // New Arrivals – 8 most recent
        $newArrivals = Product::latest()
            ->take(8)
            ->get()
            ->map(fn($p) => $mapProduct($p));

        // Hot Items – On sale items or highly sought after
        $hotItems = Product::where('stock', '<', 15)
            ->orWhere('status', 'available')
            ->orderBy('stock')
            ->take(5)
            ->get()
            ->map(fn($p) => $mapProduct($p, rand(10, 25)));   // mock discount %

        // Filters from request
        $grades      = (array) $request->input('grades', []);
        $originality = (array) $request->input('originality', []);
        $series      = (array) $request->input('series', []);
        $minPrice    = $request->input('min_price', null);
        $maxPrice    = $request->input('max_price', null);
        $sortBy      = $request->input('sort', 'latest');

        // All Products query
        $query = Product::query();

        if (!empty($grades)) {
            $query->whereIn('grade', $grades);
        }
        if (!empty($originality)) {
            $query->where(function($q) use ($originality) {
                if (in_array('PBandai', $originality)) {
                    $q->orWhere('is_pbandai', true);
                    $normalOrig = array_diff($originality, ['PBandai']);
                    if (!empty($normalOrig)) {
                        $q->orWhereIn('originality', $normalOrig);
                    }
                } else {
                    $q->whereIn('originality', $originality);
                }
            });
        }
        if (!empty($series)) {
            $query->whereIn('series', $series);
        }
        if ($minPrice !== null) {
            $query->where('price', '>=', $minPrice);
        }
        if ($maxPrice !== null) {
            $query->where('price', '<=', $maxPrice);
        }

        match ($sortBy) {
            'price_asc'  => $query->orderBy('price', 'asc'),
            'price_desc' => $query->orderBy('price', 'desc'),
            'name_asc'   => $query->orderBy('name', 'asc'),
            default      => $query->latest(),
        };

        // Paginate and retain query string parameters
        $allProducts = $query->paginate(20)
                             ->withQueryString()
                             ->through(fn($p) => $mapProduct($p));

        // Filter options
        $gradeOptions  = Product::select('grade')->distinct()->pluck('grade')->toArray();
        $seriesOptions = Product::select('series')->distinct()->whereNotNull('series')->pluck('series')->toArray();

        return Inertia::render('Catalog', [
            'newArrivals'   => $newArrivals,
            'hotItems'      => $hotItems,
            'allProducts'   => $allProducts,
            'gradeOptions'  => $gradeOptions,
            'seriesOptions' => $seriesOptions,
            'filters'       => [
                'grades'      => $grades,
                'originality' => $originality,
                'series'      => $series,
                'min_price'   => $minPrice,
                'max_price'   => $maxPrice,
                'sort'        => $sortBy,
            ],
        ]);
    }
}
