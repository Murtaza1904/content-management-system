<?php

declare(strict_types=1);

namespace App\Http\Requests\Api\V1\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Unique;
use murtaza1904\RolesPermissions\Models\Role;

final class RoleRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, array<Unique|string|null>>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:20', Rule::unique(Role::class)->ignore($this->role?->id ?? null)],
            'permissions' => ['required', 'array'],
            'permissions.*' => ['integer', 'exists:permissions,id'],
        ];
    }
}
