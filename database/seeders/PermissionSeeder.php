<?php

declare(strict_types=1);

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use murtaza1904\RolesPermissions\Models\Permission;

final class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $permissions = [
            //Roles
            'view-roles', 'create-roles', 'edit-roles', 'delete-roles',
            //Users
            'view-users', 'create-users', 'edit-users', 'delete-users',
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }
    }
}
