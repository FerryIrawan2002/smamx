<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;


class TaskGroup extends Model
{
    use HasFactory;

    protected $fillable = [
        'task_id',
        'student_id',
        'status',
        'point',
        'file',
        'file_name',
        'deadline_at',
    ];

    public function task(): BelongsTo
    {
        return $this->BelongsTo(Task::class);
    }

    public function student(): BelongsTo
    {
        return $this->belongsTo(Student::class);
    }
}
