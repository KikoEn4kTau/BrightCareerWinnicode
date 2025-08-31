<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Job extends Model
{
    use HasFactory;

    protected $table = 'jobs'; // pastikan nama tabel benar

    protected $fillable = [
        'judul',
        'deskripsi',
        'kualifikasi', 
        'perusahaan',
        'kota',
        'tipe',
        'tenure',
        'gaji_minimum',
        'gaji_maksimum',
        'url_logo',
        'status'
    ];
}