<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UploadCvRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'cv_file' => 'required|file|mimes:pdf,doc,docx|max:5120', // 5MB
        ];
    }

    public function messages(): array
    {
        return [
            'cv_file.required' => 'Harap pilih file CV.',
            'cv_file.file' => 'Harus berupa file.',
            'cv_file.mimes' => 'CV harus berformat: PDF, DOC, atau DOCX.',
            'cv_file.max' => 'Ukuran file CV maksimal 5MB.',
        ];
    }
}