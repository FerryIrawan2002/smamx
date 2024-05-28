<?php

namespace App\Models;

use App\UUIDTrait;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class ClassTeacher extends Model
{
    use HasFactory, SoftDeletes, UUIDTrait;

    protected $fillable = [
        'class_room_id',
        'teacher_id',
        'status',
        'course_id',
    ];

    protected $dates = [
        'deleted_at',
    ];


    public function classroom(): BelongsTo
    {
        return $this->belongsTo(ClassRoom::class, 'class_room_id');
    }

    public function teacher(): BelongsTo
    {
        return $this->belongsTo(Teacher::class, 'teacher_id');
    }

    public function course(): BelongsTo
    {
        return $this->belongsTo(Course::class);
    }

    public function schedules(): HasMany
    {
        return $this->hasMany(Schedule::class);
    }

    public function learn(): HasMany
    {
        return $this->hasMany(Learn::class);
    }

    public function tasks(): HasMany
    {
        return $this->hasMany(Task::class);
    }

    public function exams(): HasMany
    {
        return $this->hasMany(Exam::class);
    }
}
