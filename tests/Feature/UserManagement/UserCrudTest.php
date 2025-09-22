<?php

declare(strict_types=1);

use App\Models\User;

test('can see user listing', function (): void {
    $this->actingAs(User::whereEmail('superadmin@cms.com')->first());

    visit('/admin/users')
        ->assetSee('users');
});
