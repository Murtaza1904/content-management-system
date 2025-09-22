<?php

declare(strict_types=1);

namespace App\Listeners;

use App\Models\ActivityLog;
use Illuminate\Auth\Events\Login;

final class LoginListener
{
    public function handle(Login $event): void
    {
        /** @var \App\Models\User $user */
        $user = $event->user;

        ActivityLog::create([
            'user_id' => $user->id,
            'action' => 'login',
            'description' => 'User logged in',
        ]);
    }
}
