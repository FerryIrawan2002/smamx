<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Learn extends Model
{
    use HasFactory;

    protected $fillable = [
        'class_teacher_id',
        'week',
        'desc',
        'status',
    ];

    public function classTeacher(): BelongsTo
    {
        return $this->belongsTo(ClassTeacher::class);
    }

    public function learnfile(): HasMany
    {
        return $this->hasMany(LearnFile::class);
    }
}
