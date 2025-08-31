<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Education extends Model
{
    use HasFactory;

    protected $fillable = [
        'profile_id',
        'degree',
        'institution',
        'period',
        'order'
    ];

    public function profile()
    {
        return $this->belongsTo(Profile::class);
    }
}