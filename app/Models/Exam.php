<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Exam extends Model
{
    use HasFactory;

    protected $fillable = [
        'class_teacher_id',
        'name_exam',
        'exam_date',
        'url',
        'status',
    ];

    public function classTeacher(): BelongsTo
    {
        return $this->belongsTo(ClassTeacher::class);
    }

    public function examGroup(): HasMany
    {
        return $this->hasMany(ExamGroup::class);
    }
}
