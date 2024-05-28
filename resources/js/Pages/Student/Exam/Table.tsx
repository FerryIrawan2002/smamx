import React, { useEffect, useState } from "react";
import { Exam, ExamGroup, StudentClass, Task, TaskGroup } from "@/types";
import { Download } from "lucide-react";

interface Props {
    classTeacher: StudentClass;
}

const Table = ({ classTeacher }: Props) => {
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
                                            Nama Ujian
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
                                    {classTeacher.exams &&
                                    classTeacher.exams.length > 0 ? (
                                        classTeacher.exams.map((exam: Exam) => (
                                            <React.Fragment key={exam.id}>
                                                <tr>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                                                        {exam.name_exam}
                                                    </td>
                                                    {exam.exam_group &&
                                                        exam.exam_group.map(
                                                            (
                                                                group: ExamGroup
                                                            ) => (
                                                                <React.Fragment
                                                                    key={
                                                                        group.id
                                                                    }
                                                                >
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Table;
