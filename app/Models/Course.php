<?php

namespace App\Models;

use App\UUIDTrait;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;


class Course extends Model
{
    use HasFactory, SoftDeletes;

    protected $dates = [
        'deleted_at'
    ];

    protected $fillable = [
        'course_name',
        'photo',
        'status',
    ];
    public function classTeachers(): HasMany
    {
        return $this->hasMany(ClassTeacher::class);
    }
    public function hasClassTeachers(): bool
    {
        return $this->classTeachers()->exists();
    }


    public function delete()
    {
        if ($this->hasClassTeachers()) {
            return false; // Return false to indicate deletion failure
        }

        return parent::delete(); // Proceed with deletion if no class teachers associated
    }
}
