<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;

class HomeController extends Controller
{
    public function index()
    {
        // Ambil data produk terbaru dari database
        $products = Product::latest()->get()->map(function ($product) {
            // Translate status DB ke status type yang dibutuhkan UI
            $statusType = 'stock';
            if ($product->status === 'out_of_stock' || $product->status === 'coming_soon') {
                $statusType = 'restock';
            } elseif ($product->stock < 10) {
                $statusType = 'limited';
            }

            // Tentukan skala kasar berdasarkan grade untuk tampilan
            $scale = '1/144';
            if ($product->grade === 'PG') $scale = '1/60';
            elseif (in_array($product->grade, ['MG', 'FM'])) $scale = '1/100';
            elseif ($product->grade === 'SD' || $product->grade === 'MGSD') $scale = 'Non-scale';

            return [
                'id' => $product->id,
                'name' => $product->name,
                'grade' => $product->grade,
                'scale' => $scale,
                'price' => $product->price,
                'status' => ucfirst(str_replace('_', ' ', $product->status)),
                'statusType' => $statusType,
                'img' => $product->image_url,
                'series' => $product->series,
            ];
        });

        // Ambil daftar grade (kategori) dan series yang tersedia
        $categories = Product::select('grade')->distinct()->pluck('grade')->toArray();
        $seriesList = Product::select('series')->distinct()->whereNotNull('series')->pluck('series')->toArray();

        return Inertia::render('Home', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'products' => $products,
            'categories' => $categories,
            'seriesList' => $seriesList,
        ]);
    }
}
