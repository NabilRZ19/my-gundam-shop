<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Address extends Model
{
    protected $fillable = [
        'user_id',
        'address_name',
        'full_address',
        'city',
        'postal_code',
        'is_primary',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
