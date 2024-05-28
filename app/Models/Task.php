<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Task extends Model
{
    use HasFactory;

    protected $fillable = [
        'class_teacher_id',
        'name',
        'desc',
        'deadline',
        'status',
    ];

    public function classTeacher(): BelongsTo
    {
        return $this->belongsTo(ClassTeacher::class);
    }

    public function taskGroup(): HasMany
    {
        return $this->hasMany(TaskGroup::class);
    }
}
