<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api\V1\Admin;

use Illuminate\Http\JsonResponse;
use murtaza1904\RolesPermissions\Models\Permission;
use App\Http\Resources\Api\V1\Admin\PermissionResource;

final readonly class PermissionController
{
    /**
     * Display a listing of the permission.
     */
    public function __invoke(): JsonResponse
    {
        return response()->json([
            'permissions' => PermissionResource::collection(Permission::orderBy('name')->get()),
        ]);
    }
}
