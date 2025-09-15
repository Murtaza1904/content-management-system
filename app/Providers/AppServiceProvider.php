<?php

declare(strict_types=1);

namespace App\Providers;

use App\Listeners\LoginListener;
use App\Listeners\LogoutListener;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\ServiceProvider;

final class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Event::listen([
            'Illuminate\Auth\Events\Login' => LoginListener::class,
            'Illuminate\Auth\Events\Logout' => LogoutListener::class,
        ]);
    }
}
