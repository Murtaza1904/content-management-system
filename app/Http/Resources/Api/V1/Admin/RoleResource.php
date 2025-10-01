<?php

declare(strict_types=1);

namespace App\Http\Resources\Api\V1\Admin;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin murtaza1904\RolesPermissions\Models\Role;
 */
final class RoleResource extends JsonResource
{
    /**
     * Transform the role resource into an array.
     *
     * @return array<string>
     */
    public function toArray(Request $request): array
    {
        unset($request);

        return [
            'id' => $this->id,
            'name' => $this->name,
            'slug' => $this->slug,
            'updated_at' => $this->updated_at->format('d M Y'),
            $this->mergeWhen($this->relationLoaded('permissions'), [
                'permissions' => PermissionResource::collection($this->whenLoaded('permissions')),
            ]),
        ];
    }
}
