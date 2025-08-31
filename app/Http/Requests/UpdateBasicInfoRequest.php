<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateBasicInfoRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => 'nullable|string|max:255',
            'role' => 'nullable|string|max:255',
            'location' => 'nullable|string|max:255',
            'about' => 'nullable|string|max:2000',
        ];
    }

    public function messages(): array
    {
        return [
            'name.max' => 'Nama maksimal 255 karakter.',
            'role.max' => 'Posisi maksimal 255 karakter.',
            'location.max' => 'Lokasi maksimal 255 karakter.',
            'about.max' => 'Deskripsi tentang diri maksimal 2000 karakter.',
        ];
    }
}