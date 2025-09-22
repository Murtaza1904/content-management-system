<?php

declare(strict_types=1);

use App\Http\Controllers\Api\V1\Admin\ProfileController;
use App\Http\Controllers\Api\V1\Admin\UserController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1/admin')->middleware(['auth:sanctum'])->group(static function (): void {
    // Profile
    Route::patch('info', [ProfileController::class, 'info']);
    Route::patch('password', [ProfileController::class, 'password']);

    // User Management
    Route::apiResource('users', UserController::class);
});
