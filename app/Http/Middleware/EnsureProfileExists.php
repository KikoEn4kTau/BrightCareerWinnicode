<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;

class EnsureProfileExists
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (auth()->check()) {
            $user = auth()->user();
            
            // Cek apakah user sudah memiliki profile
            if (!$user->profile) {
                try {
                    // Buat profile baru
                    $user->profile()->create([
                        'user_id' => $user->id,
                    ]);
                    
                    Log::info("Profile created for user ID: {$user->id}");
                } catch (\Exception $e) {
                    Log::error("Failed to create profile for user ID: {$user->id}", [
                        'error' => $e->getMessage()
                    ]);
                }
            }
        }

        return $next($request);
    }
}