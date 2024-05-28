<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class LearnFile extends Model
{
    use HasFactory;

    protected $fillable = [
        'file',
        'name',
        'learn_id',
    ];

    public function learn(): BelongsTo
    {
        return $this->belongsTo(Learn::class);
    }
}
