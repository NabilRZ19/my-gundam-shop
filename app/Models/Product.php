<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Product extends Model
{
    use hasFactory;
    
    protected $fillable = [
        'name',
        'description',
        'grade',
        'originality',
        'is_pbandai',
        'price',
        'stock',
        'status',
        'image_url',
        'series',
    ];

    public function orderItems()
    {
        return $this->hasMany(OrderItem::class);
    }
}
