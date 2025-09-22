<?php

declare(strict_types=1);

namespace App\Observers;

use App\Models\User;
use App\Models\ActivityLog;
use Illuminate\Support\Facades\Storage;

final class UserObserver
{
    /**
     * Handle the User "created" event.
     */
    public function created(User $user): void
    {
        ActivityLog::create([
            'user_id' => auth()->id(),
            'action' => 'user created',
            'description' => 'User created: ' . $user->firstname . ' ' . $user->lastname,
        ]);
    }

    /**
     * Handle the User "updated" event.
     */
    public function updated(User $user): void
    {
        ActivityLog::create([
            'user_id' => auth()->id(),
            'action' => 'user updated',
            'description' => 'User updated: ' . $user->firstname . ' ' . $user->lastname,
        ]);
    }

    /**
     * Handle the User "deleted" event.
     */
    public function deleted(User $user): void
    {
        ActivityLog::create([
            'user_id' => auth()->id(),
            'action' => 'user deleted',
            'description' => 'User deleted: ' . $user->firstname . ' ' . $user->lastname,
        ]);
        
        if (Storage::exists($user->avatar)) {
            Storage::delete($user->avatar);
        }
    }
}
