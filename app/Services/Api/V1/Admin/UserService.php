<?php

declare(strict_types=1);

namespace App\Services\Api\V1\Admin;

use App\Models\User;
use murtaza1904\AvatarGenerator\Facades\Avatar;

final class UserService
{
    public function generateAvatar(User $user): void
    {
        $filename = Avatar::create($user->firstname.' '.$user->lastname)->save();

        $user->update(['avatar' => 'avatars/'. $filename]);
    }
}

