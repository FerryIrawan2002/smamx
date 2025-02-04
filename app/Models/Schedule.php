<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Schedule extends Model
{
    use HasFactory, SoftDeletes;

    protected $dates = ['deleted_at'];

    protected $fillable = [
        'class_teacher_id',
        'day',
        'time_start',
        'time_end',
        'status',
    ];

    public function classTeacher(): BelongsTo
    {
        return $this->belongsTo(ClassTeacher::class);
    }

    
}
