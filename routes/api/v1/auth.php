<?php

declare(strict_types=1);

use App\Http\Controllers\Api\V1\AuthController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1/auth')->middleware('throttle:5')->controller(AuthController::class)
    ->group(static function (): void {
        // Login
        Route::post('/login', 'login');

        // Logout
        Route::post('/logout', 'logout')->middleware('auth:sanctum');
    });
