<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\Api\V1\Auth\LoginRequest;
use App\Http\Resources\Api\V1\Admin\UserResource;
use Illuminate\Http\JsonResponse;

final class AuthController extends Controller
{
    /**
     * Handle an authentication attempt.
     * 
     * @param LoginRequest $loginRequest
     * @return JsonResponse
     */
    public function login(LoginRequest $loginRequest): JsonResponse
    {
        if (Auth::attempt(['email' => $loginRequest->email, 'password' => $loginRequest->password])) {
            $user = Auth::user();

            return response()->json([
                'user' => new UserResource($user),
                'token' => $user->createToken('auth_token')->plainTextToken,
            ]);
        }

        return response()->json([
            'message' => 'Invalid login credentials',
        ], 401);
    }

    /**
     * Handle logout and revoke token.
     * 
     * @return JsonResponse
     */
    public function logout(): JsonResponse
    {
        Auth::user()?->currentAccessToken()?->delete();

        return response()->json([
            'message' => 'Logged out successfully',
        ]);
    }
}
