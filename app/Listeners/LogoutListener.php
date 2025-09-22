<?php

declare(strict_types=1);

namespace App\Listeners;

use App\Models\ActivityLog;
use Illuminate\Auth\Events\Logout;

final class LogoutListener
{
    public function handle(Logout $event): void
    {
        /** @var \App\Models\User $user */
        $user = $event->user;

        ActivityLog::create([
            'user_id' => $user->id,
            'action' => 'logout',
            'description' => 'User logged out',
        ]);
    }
}
