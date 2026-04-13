<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    protected $fillable = [
        'admin_id',
        'Title',
        'Content',
        'image_url',
    ];

    public function admin()
    {
        return $this->belongsTo(User::class, 'admin_id');
    }

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }
}
