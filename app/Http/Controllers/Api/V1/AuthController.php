<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api\V1;

use App\Http\Requests\Api\V1\Auth\LoginRequest;
use App\Http\Resources\Api\V1\Admin\UserResource;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;

final readonly class AuthController
{
    /**
     * Handle an authentication attempt.
     */
    public function login(LoginRequest $loginRequest): JsonResponse
    {
        if (Auth::attempt(['email' => $loginRequest->validated('email'), 'password' => $loginRequest->validated('password')])) {
            /** @var \App\Models\User $user */
            $user = Auth::user();

            return response()->json([
                'user' => new UserResource($user),
                'permissions' => $user->permissions()->pluck('name'),
                'token' => $user->createToken('auth_token')->plainTextToken,
            ]);
        }

        return response()->json([
            'message' => 'Invalid login credentials.',
        ], 401);
    }

    /**
     * Handle logout and revoke token.
     */
    public function logout(): JsonResponse
    {
        /** @var \App\Models\User|null $user */
        $user = Auth::user();
        $user?->currentAccessToken()?->delete();

        return response()->json([
            'message' => 'Logged out successfully',
        ]);
    }
}
