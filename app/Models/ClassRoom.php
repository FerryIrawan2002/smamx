<?php

namespace App\Models;

use App\UUIDTrait;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;


class ClassRoom extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'class_name',
        'major',
        'status',
        'class_number'
    ];

    protected $dates = [
        'deleted_at',
    ];

    public function students(): HasMany
    {
        return $this->hasMany(Student::class, 'class_room_id');
    }

    public function teachers(): BelongsToMany
    {
        return $this->belongsToMany(Teacher::class, 'class_teachers');
    }
}
