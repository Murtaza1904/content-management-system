<?php

declare(strict_types=1);

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\V1\Admin\UserController;

Route::prefix('v1/admin')->middleware(['auth:sanctum'])->group(static function (): void {
    //User Management
    Route::apiResource('users', UserController::class);
});