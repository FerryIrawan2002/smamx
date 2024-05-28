<?php

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
        Schema::create('task_groups', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(\App\Models\Task::class, 'task_id');
            $table->foreignIdFor(\App\Models\Student::class, 'student_id')->nullable();
            $table->string('status')->default('Belum mengumpulkan');
            $table->string('file_name')->nullable();
            $table->integer('point')->nullable();
            $table->string('file')->nullable();
            $table->dateTime('deadline_at')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('task_groups');
    }
};
