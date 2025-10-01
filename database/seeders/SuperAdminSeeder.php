<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;
use murtaza1904\RolesPermissions\Models\Role;

final class SuperAdminSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $storagePath = storage_path('app/public/avatars');

        if (! File::isDirectory($storagePath)) {
            File::makeDirectory($storagePath, 0755, true);
        }

        File::copy(
            public_path('images/super-admin-avatar.png'),
            $storagePath.'/super-admin-avatar.png',
        );

        $user = User::factory()->create([
            'firstname' => 'Super',
            'lastname' => 'Admin',
            'email' => 'superadmin@cms.com',
            'password' => 'Pa$$w0rd!',
            'avatar' => 'avatars/super-admin-avatar.png',
        ]);

        $role = Role::create(['name' => 'Super Admin']);

        $user->assignRole($role);
    }
}
