<?php

declare(strict_types=1);

namespace App\Listeners;

use App\Models\ActivityLog;
use Illuminate\Auth\Events\Logout;

final class LogoutListener
{
    /**
     * Handle the event.
     */
    public function handle(Logout $event): void
    {
        ActivityLog::create([
            'user_id' => $event->user->id,
            'action' => 'logout',
            'description' => 'User logged out',
        ]);
    }
}
