import React, { useEffect, useState } from "react";
import { ClassTeacherCourse, Task, TaskGroup } from "@/types";
import { Download } from "lucide-react";

interface Props {
    classTask: ClassTeacherCourse;
}

const Table = ({ classTask }: Props) => {
    const [averageScore, setAverageScore] = useState<number>(0);
    useEffect(() => {
        if (classTask.tasks && classTask.tasks.length > 0) {
            const totalScore = classTask.tasks.reduce((total, task: Task) => {
                return (
                    total +
                    task.task_group
                        .map((group: TaskGroup) =>
                            group.point ? group.point : 0
                        )
                        .reduce((a: number, b: number) => a + b, 0)
                );
            }, 0);
            const average = totalScore / classTask.tasks.length;
            setAverageScore(average);
        } else {
            setAverageScore(0);
        }
    }, [classTask]);
    return (
        <div className="flex justify-center">
            <div className="flex flex-col bg-white rounded-lg overflow-x-auto">
                <div className="overflow-x-auto">
                    <div className="p-1.5 min-w-full">
                        <div>
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead>
                                    <tr>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                                        >
                                            Nama Tugas
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                                        >
                                            File
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                                        >
                                            Nilai
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {classTask.tasks &&
                                    classTask.tasks.length > 0 ? (
                                        classTask.tasks.map((task: Task) => (
                                            <React.Fragment key={task.id}>
                                                <tr>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                                                        {task.name}
                                                    </td>
                                                    {task.task_group &&
                                                        task.task_group.map(
                                                            (
                                                                group: TaskGroup
                                                            ) => (
                                                                <React.Fragment
                                                                    key={
                                                                        group.id
                                                                    }
                                                                >
                                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                                                                        {group.file ? (
                                                                            <a
                                                                                href={
                                                                                    window
                                                                                        .location
                                                                                        .origin +
                                                                                    "/storage/" +
                                                                                    group.file
                                                                                }
                                                                                target="_blank"
                                                                                rel="noopener noreferrer"
                                                                                className="flex text-sm items-center gap-2 text-blue-500 bg-blue-50 p-2 rounded-lg"
                                                                            >
                                                                                <Download />
                                                                                <span>
                                                                                    download
                                                                                </span>
                                                                            </a>
                                                                        ) : (
                                                                            "Belum Diunggah"
                                                                        )}
                                                                    </td>
                                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                                                                        {group.point !==
                                                                        null
                                                                            ? group.point
                                                                            : "Belum Dinilai"}
                                                                    </td>
                                                                </React.Fragment>
                                                            )
                                                        )}
                                                </tr>
                                            </React.Fragment>
                                        ))
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan={3}
                                                className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 text-center"
                                            >
                                                Tidak ada tugas
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                            <div className="flex  text-xl gap-2 mt-4 border-t py-4  justify-end">
                                <span className="">Rata Rata Nilai</span>
                                <span className="">{averageScore}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Table;
