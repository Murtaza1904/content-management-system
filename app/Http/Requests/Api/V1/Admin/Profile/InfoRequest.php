<?php

declare(strict_types=1);

namespace App\Http\Requests\Api\V1\Admin\Profile;

use Illuminate\Foundation\Http\FormRequest;

final class InfoRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, array<string>>
     */
    public function rules(): array
    {
        return [
            'firstname' => ['required', 'string', 'max:20'],
            'lastname' => ['required', 'string', 'max:20'],
        ];
    }
}
