<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('jobs', function (Blueprint $table) {
            $table->id();
            $table->string('judul');
            $table->text('deskripsi');
            $table->text('kualifikasi');
            $table->string('perusahaan');
            $table->string('kota');
            $table->enum('tipe', ['WFH', 'Onsite', 'Hybrid']);
            $table->string('tenure');
            $table->string('gaji_minimum');
            $table->string('gaji_maksimum');
            $table->string('url_logo')->nullable();
            $table->enum('status', ['Aktif', 'Nonaktif'])->default('Aktif');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('jobs');
    }
};