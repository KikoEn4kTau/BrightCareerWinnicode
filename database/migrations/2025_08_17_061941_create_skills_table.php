<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        // Table untuk master skills
        Schema::create('skills', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique();
            $table->timestamps();
        });

        // Table pivot untuk user skills
        Schema::create('profile_skills', function (Blueprint $table) {
            $table->id();
            $table->foreignId('profile_id')->constrained()->onDelete('cascade');
            $table->foreignId('skill_id')->constrained()->onDelete('cascade');
            $table->string('color')->default('bg-blue-100 text-blue-800');
            $table->timestamps();
            
            $table->unique(['profile_id', 'skill_id']);
        });
    }

    public function down()
    {
        Schema::dropIfExists('profile_skills');
        Schema::dropIfExists('skills');
    }
};