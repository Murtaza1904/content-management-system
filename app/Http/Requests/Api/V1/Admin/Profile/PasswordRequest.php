<?php

declare(strict_types=1);

namespace App\Http\Requests\Api\V1\Admin\Profile;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

final class PasswordRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, array<Password|string|null>>
     */
    public function rules(): array
    {
        return [
            'current_password' => ['required', 'string', 'current_password:api'],
            'password' => ['required', 'string', 'confirmed', Password::defaults()],
        ];
    }
}
