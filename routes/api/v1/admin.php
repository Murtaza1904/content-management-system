<?php

declare(strict_types=1);

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\V1\Admin\RoleController;
use App\Http\Controllers\Api\V1\Admin\UserController;
use App\Http\Controllers\Api\V1\Admin\ProfileController;
use App\Http\Controllers\Api\V1\Admin\PermissionController;

Route::prefix('v1/admin')->middleware(['auth:sanctum'])->group(static function (): void {
    // Profile
    Route::patch('info', [ProfileController::class, 'info']);
    Route::patch('password', [ProfileController::class, 'password']);

    // Permission
    Route::get('permissions', PermissionController::class);

    // Role Management
    Route::apiResource('roles', RoleController::class);

    // User Management
    Route::apiResource('users', UserController::class);
});
