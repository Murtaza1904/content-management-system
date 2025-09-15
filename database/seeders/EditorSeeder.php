<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Models\User;
use App\Services\Api\V1\Admin\UserService;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

final class EditorSeeder extends Seeder
{
    /**
     * @use WithoutModelEvents
     */
    use WithoutModelEvents;

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $userService = new UserService();

        for($i = 1; $i <= 5; $i++) {
            $user = User::create([
                'firstname' => fake()->firstName(),
                'lastname'  => fake()->lastName(),
                'email'     => fake()->safeEmail(),
                'password'  => 'Pa$$w0rd!',
            ]);

            $userService->generateAvatar($user);
        }
    }
}
