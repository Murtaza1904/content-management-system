<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Requests\Api\V1\Admin\RoleRequest;
use Illuminate\Http\JsonResponse;
use murtaza1904\RolesPermissions\Models\Role;
use App\Http\Resources\Api\V1\Admin\RoleResource;

final readonly class RoleController
{
    /**
     * Display a listing of the role.
     */
    public function index(): JsonResponse
    {
        $roles = Role::orderBy('slug')->paginate(10);

        return response()->json([
            'roles' => RoleResource::collection($roles),
            'meta' => [
                'current_page' => $roles->currentPage(),
                'last_page' => $roles->lastPage(),
                'per_page' => $roles->perPage(),
                'total' => $roles->total(),
            ],
        ]);
    }

    /**
     * Store a newly created role in database.
     */
    public function store(RoleRequest $roleRequest): JsonResponse
    {
        $role = Role::create($roleRequest->safe()->only('name', 'slug'));

        $role->permissions()->sync($roleRequest->input('permissions'));

        return response()->json([
            'message' => 'Role created successfully',
        ], 201);
    }

    /**
     * Display the specified role.
     */
    public function show(Role $role): JsonResponse
    {
        return response()->json([
            'role' => new RoleResource($role->load('permissions')),
        ]);
    }

    /**
     * Update the specified role in database.
     */
    public function update(RoleRequest $roleRequest, Role $role): JsonResponse
    {
        $role->update($roleRequest->validated());

        $role->permissions()->sync($roleRequest->input('permissions'));

        return response()->json([
            'message' => 'Role updated successfully',
        ]);
    }

    /**
     * Remove the specified role from database.
     */
    public function destroy(Role $role): JsonResponse
    {
        $role->delete();

        return response()->json([
            'message' => 'Role deleted successfully',
        ]);
    }
}
