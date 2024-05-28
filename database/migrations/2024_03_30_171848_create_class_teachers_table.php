<?php

use App\Models\ClassRoom;
use App\Models\Course;
use App\Models\Teacher;
use App\Models\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('class_teachers', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignIdFor(ClassRoom::class, 'class_room_id');
            $table->foreignIdFor(Teacher::class, 'teacher_id');
            $table->foreignIdFor(Course::class, 'course_id');
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('class_teachers');
    }
};
