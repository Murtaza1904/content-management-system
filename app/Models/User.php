<?php

declare(strict_types=1);

namespace App\Models;

use Laravel\Sanctum\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Http\UploadedFile;

final class User extends Authenticatable
{
    /** 
     * @use HasFactory<\Database\Factories\UserFactory>
     * @use Notifiable<\Illuminate\Notifications\Notification>
     * @use HasApiTokens<\Laravel\Sanctum\PersonalAccessToken>
     * @use HasUuids
     */
    use HasFactory, Notifiable, HasApiTokens, HasUuids;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'firstname',
        'lastname',
        'email',
        'password',
        'avatar',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'password' => 'hashed',
        ];
    }

    /**
     * Interact with the user's avatar.
     */
    public function avatar(): Attribute
    {
        return Attribute::make(
            set: fn ($value): string|null => $value instanceof UploadedFile ? $value->store('users') : $value,
        );
    }

    /**
     * Scope a query to exclude the super admin user.
     * @param Builder<\App\Models\User> $query
     */
    public function scopeExcludeSuperAdmin(Builder $query): void
    {
        $query->whereNot('email', 'superadmin@cms.com');
    }
}
