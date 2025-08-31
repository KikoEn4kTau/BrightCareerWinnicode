<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateContactInfoRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'email' => 'nullable|email|max:255',
            'phone' => 'nullable|string|max:20',
            'linkedin' => 'nullable|string|max:255',
            'website' => 'nullable|url|max:255',
            'github' => 'nullable|string|max:255',
        ];
    }

    public function messages(): array
    {
        return [
            'email.email' => 'Format email tidak valid.',
            'email.max' => 'Email maksimal 255 karakter.',
            'phone.max' => 'Nomor telepon maksimal 20 karakter.',
            'linkedin.max' => 'LinkedIn URL maksimal 255 karakter.',
            'website.url' => 'Format website tidak valid.',
            'website.max' => 'Website URL maksimal 255 karakter.',
            'github.max' => 'GitHub URL maksimal 255 karakter.',
        ];
    }
}