<?php

namespace App\Models;

use App\UUIDTrait;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Teacher extends Model
{
    use HasFactory, SoftDeletes;

    protected $dates = [
        'deleted_at'
    ];

    protected $fillable = [
        'nip',
        'gender',
        'phone_number',
        'education',
        'photo',
        'user_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function classes()
    {
        return $this->belongsToMany(ClassRoom::class, 'class_teachers');
    }

    public function hasClassTeachers(): bool
    {
        return $this->classes()->exists();
    }


    public function delete()
    {
        if ($this->hasClassTeachers()) {
            return false; // Return false to indicate deletion failure
        }

        return parent::delete(); // Proceed with deletion if no class teachers associated
    }
}
