<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Profile extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'name',
        'role',
        'location',
        'about',
        'profile_image',
        'email',
        'phone',
        'linkedin',
        'website',
        'github',
        'cv_file'
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function skills(): BelongsToMany
    {
        return $this->belongsToMany(Skill::class, 'profile_skills')
                    ->withPivot('color')
                    ->withTimestamps();
    }

    public function experiences(): HasMany
    {
        return $this->hasMany(Experience::class)->orderBy('order');
    }

    public function education(): HasMany
    {
        return $this->hasMany(Education::class)->orderBy('order');
    }

    // Accessor untuk profile image URL
    public function getProfileImageUrlAttribute()
    {
        if ($this->profile_image) {
            return asset('storage/' . $this->profile_image);
        }
        return null;
    }

    // Accessor untuk CV file URL
    public function getCvFileUrlAttribute()
    {
        if ($this->cv_file) {
            return asset('storage/' . $this->cv_file);
        }
        return null;
    }
}