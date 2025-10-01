<?php

declare(strict_types=1);

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Murtaza1904\RolesPermissions\Http\Middleware\PermissionMiddleware;
use Murtaza1904\RolesPermissions\Http\Middleware\RoleMiddleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        api: [
            __DIR__.'/../routes/api/v1/auth.php',
            __DIR__.'/../routes/api/v1/admin.php',
        ],
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->append(PermissionMiddleware::class);
        $middleware->append(RoleMiddleware::class);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        //
    })->create();
