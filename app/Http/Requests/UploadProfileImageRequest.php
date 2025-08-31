<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UploadProfileImageRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'profile_image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ];
    }

    public function messages(): array
    {
        return [
            'profile_image.required' => 'Harap pilih gambar profil.',
            'profile_image.image' => 'File harus berupa gambar.',
            'profile_image.mimes' => 'Gambar harus berformat: jpeg, png, jpg, atau gif.',
            'profile_image.max' => 'Ukuran gambar maksimal 2MB.',
        ];
    }
}