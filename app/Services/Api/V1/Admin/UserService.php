<?php

declare(strict_types=1);

namespace App\Services\Api\V1\Admin;

use App\Models\User;
use Laravolt\Avatar\Avatar;

final class UserService
{
    /**
     * Generate an avatar for the user if none is provided.
     */
    public function generateAvatar(User $user): void
    {
        $generate = new Avatar();

        $fileName = $user->id . '.png';
        $path = "app/public/avatars/";
        $filePath = storage_path($path . $fileName);

        if (!file_exists(storage_path($path))) {
            mkdir(storage_path($path), 0755, true);
        }

        $generate->create($user->firstname . ' ' . $user->lastname)->save($filePath);

        $user->update(['avatar' => 'avatars/' . $fileName]);
    }
}
