<?php

declare(strict_types=1);

test('can see login page', function (): void {
    $page = visit(domain().'/login');

    $page->assertSee('Login');
});

test('can see validation errors', function (): void {
    $page = visit(domain().'/login');

    $page->click('#login-button')
        ->assertSee('The email field is required.')
        ->assertSee('The password field is required.');
});

test('can see invalid login credentials errors', function (): void {
    $page = visit(domain().'/login');

    $page->assertSee('Login')
        ->type('email', 'test@cms.com')
        ->type('password', '123')
        ->click('#login-button')
        ->assertSee('Invalid login credentials.');
});

test('can login and then logout', function (): void {
    $page = visit(domain().'/login');

    $page->assertSee('Login')
        ->type('email', 'superadmin@cms.com')
        ->type('password', 'Pa$$w0rd!')
        ->click('#login-button')
        ->assertSee('Welcome to admin panel');

    $page->click('.avatar-img')
        ->click('#logout-button')
        ->assertSee('Sign In to your account');
});
