<?php

declare(strict_types=1);

namespace App\Http\Resources\Api\V1\Admin;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin murtaza1904\RolesPermissions\Models\Permission;
 */
final class PermissionResource extends JsonResource
{
    /**
     * Transform the permission resource into an array.
     *
     * @return array<string>
     */
    public function toArray(Request $request): array
    {
        unset($request);

        return [
            'id' => $this->id,
            'name' => $this->name,
        ];
    }
}
