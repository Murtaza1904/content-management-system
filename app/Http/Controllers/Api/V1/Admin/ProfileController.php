<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Requests\Api\V1\Admin\Profile\InfoRequest;
use App\Models\User;
use Illuminate\Container\Attributes\CurrentUser;
use Illuminate\Http\JsonResponse;

final readonly class ProfileController
{
    /**
     * Update the current user info in database.
     */
    public function info(InfoRequest $infoRequest, #[CurrentUser] User $user): JsonResponse
    {
        $user->update($infoRequest->validated());

        return response()->json([
            'message' => 'Profile info updated.',
        ]);
    }

    /**
     * Update the current user password in database.
     */
    public function password(InfoRequest $infoRequest, #[CurrentUser] User $user): JsonResponse
    {
        $user->update([
            'password' => $infoRequest->password,
        ]);

        return response()->json([
            'message' => 'Profile password updated.',
        ]);
    }
}
