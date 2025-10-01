<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Requests\Api\V1\Admin\UserRequest;
use App\Http\Resources\Api\V1\Admin\UserResource;
use App\Models\User;
use App\Services\Api\V1\Admin\UserService;
use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller;

final class UserController extends Controller
{
    public function __construct()
    {
        $this->middleware(['permission:view-users'])->only('index', 'show');
        $this->middleware(['permission:create-users'])->only('create', 'store');
        $this->middleware(['permission:edit-users'])->only('edit', 'update');
        $this->middleware(['permission:delete-users'])->only('destroy');
    }

    /**
     * Display a listing of the user.
     */
    public function index(): JsonResponse
    {
        $users = User::excludeSuperAdmin()->orderBy('firstname')->paginate(10);

        return response()->json([
            'users' => UserResource::collection($users),
            'meta' => [
                'current_page' => $users->currentPage(),
                'last_page' => $users->lastPage(),
                'per_page' => $users->perPage(),
                'total' => $users->total(),
            ],
        ]);
    }

    /**
     * Store a newly created user in database.
     */
    public function store(UserRequest $userRequest): JsonResponse
    {
        $user = User::create($userRequest->validated());

        if (empty($user->avatar)) {
            // Generate avatar if not provided
            $userService = new UserService();
            $userService->generateAvatar($user);
        }

        return response()->json([
            'message' => 'User created successfully',
        ], 201);
    }

    /**
     * Display the specified user.
     */
    public function show(User $user): JsonResponse
    {
        return response()->json([
            'user' => new UserResource($user),
        ]);
    }

    /**
     * Update the specified user in database.
     */
    public function update(UserRequest $userRequest, User $user): JsonResponse
    {
        /** @var array<string,mixed> $data */
        $data = $userRequest->safe()->except('password', 'avatar');
        $user->fill($data);

        $password = $userRequest->validated('password');
        if (is_string($password) && $password !== '') {
            $user->password = $password;
        }

        $user->save();

        return response()->json([
            'message' => 'User updated successfully',
        ]);
    }

    /**
     * Remove the specified user from database.
     */
    public function destroy(User $user): JsonResponse
    {
        $user->delete();

        return response()->json([
            'message' => 'User deleted successfully',
        ]);
    }
}
