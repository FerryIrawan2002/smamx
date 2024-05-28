<?php

namespace App\Http\Middleware;

use Closure;
use App\Models\Task;
use App\Models\TaskGroup;
use Carbon\Carbon;

class CheckTaskGroupStatus
{
    public function handle($request, Closure $next)
    {
        // Get all tasks that have passed their deadline
        $overdueTasks = Task::where('deadline', '<', Carbon::now())->get();

        // For each overdue task, update status of its task groups to 'Terlambat'
        foreach ($overdueTasks as $task) {
            $task->taskGroup()->whereNull('file')->update(['status' => 'Terlambat']);
        }

        // Get all tasks that have their deadline changed to a future date
        $futureTasks = Task::where('deadline', '>', Carbon::now())->get();

        // For each task with future deadline, update status of its task groups to 'Belum mengumpulkan'
        foreach ($futureTasks as $task) {
            $task->taskGroup()->whereNull('file')->update(['status' => 'Belum mengumpulkan']);
        }

        // Get all task groups with files
        $submittedTaskGroups = TaskGroup::whereNotNull('file')->whereNotNull('point')->get();
        foreach ($submittedTaskGroups as $taskGroup) {
            if ($taskGroup->status !== 'Selesai') {
                $taskGroup->update(['status' => 'Telah mengumpulkan']);
            }
        }

        // Get all task groups with files and past deadline
        $evaluatedTaskGroups = TaskGroup::whereNotNull('file')
            ->whereHas('task', function ($query) {
                $query->where('deadline', '<', Carbon::now());
            })
            ->get();

        foreach ($evaluatedTaskGroups as $taskGroup) {
            if (is_null($taskGroup->point)) {
                $taskGroup->update(['status' => 'Dinilai']);
            } else {
                $taskGroup->update(['status' => 'Selesai']);
            }
        }

        return $next($request);
    }
}
