import React, { useState } from "react";
import { CircleX, Notebook, TimerIcon, Upload } from "lucide-react";
import { ClassTeacherCourse, Task, TaskGroup } from "@/types";
import moment from "moment";
import { Link, router } from "@inertiajs/react";
import Edit from "./Edit";
import noData from "../../../../../public/assets/img/nodata.png";
interface Props {
    classTask: ClassTeacherCourse;
}
const Card = ({ classTask }: Props) => {
    function formatDate(dateString: string) {
        const formattedDate = moment(dateString)
            .locale("id")
            .format("DD MMMM YYYY - HH:mm");
        return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
    }

    const [descriptionVisible, setDescriptionVisible] = useState<boolean[]>([]);

    useState(() => {
        setDescriptionVisible(Array(classTask.tasks.length).fill(true));
    });
    function sanitizeAndValidateHTML(html: string) {
        const cleanHTML = html.replace(/<\/?script\b[^>]*>/g, "");

        return cleanHTML;
    }

    const toggleDescription = (index: number) => {
        setDescriptionVisible((prev) => {
            const newVisibility = [...prev];
            newVisibility[index] = !newVisibility[index];
            return newVisibility;
        });
    };

    return (
        <div className="grid grid-cols-1 mt-8 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10 md:mt-8 lg:mt-10">
            {classTask.tasks && classTask.tasks.length > 0 ? (
                classTask.tasks.map((task: Task, index: number) => (
                    <div
                        className="flex flex-col p-4 border rounded-lg gap-2 bg-white"
                        key={task.id}
                    >
                        <div className="flex items-center gap-2">
                            <span className="bg-gray-100 p-2 w-10 rounded-full">
                                <Notebook size={24} />
                            </span>

                            <span className="text-xl font-semibold">
                                {task.name}
                            </span>
                        </div>

                        <div className="flex flex-col gap-2 mt-2">
                            <span>
                                Deadline :{" "}
                                <span className="bg-red-200 font-medium ml-2 text-sm  rounded-full px-4 py-1">
                                    {formatDate(task.deadline)}
                                </span>
                            </span>
                        </div>
                        <div className="flex flex-col gap-2">
                            <span>
                                Status :{" "}
                                <span className="font-semibold">
                                    {task.task_group &&
                                    task.task_group.length > 0 ? (
                                        task.task_group.map(
                                            (group: TaskGroup) => (
                                                <span key={group.id}>
                                                    {group.status}
                                                </span>
                                            )
                                        )
                                    ) : (
                                        <span className="font-medium">
                                            Penugasan di tutup !
                                        </span>
                                    )}
                                </span>
                            </span>
                        </div>

                        <div className="flex flex-col gap-2">
                            <span>Deskripsi : </span>
                            <div
                                className={`text-gray-600 ${
                                    descriptionVisible[index]
                                        ? "line-clamp-3"
                                        : "line-clamp-0"
                                }`}
                                dangerouslySetInnerHTML={{
                                    __html: sanitizeAndValidateHTML(task.desc),
                                }}
                            />
                        </div>
                        <button
                            onClick={() => toggleDescription(index)}
                            className="text-xs underline text-gray-600 mt-2"
                        >
                            {descriptionVisible[index]
                                ? "Tampilkan"
                                : "Sembunyikan"}{" "}
                            Deskripsi Tugas
                        </button>
                        <hr className="my-1" />
                        {task.task_group.map((group: TaskGroup) =>
                            group.status === "Dinilai" ? (
                                <Link
                                    href={`/siswa/detail-tugas/${group.id}`}
                                    className="flex text-sm justify-center items-center gap-2 bg-green-500 hover:bg-green-600 transform duration-300 text-white rounded-lg px-4 py-2"
                                >
                                    <TimerIcon />
                                    <span className="font-semibold">
                                        Detail Tugas
                                    </span>
                                </Link>
                            ) : group.status === "Belum mengumpulkan" ? (
                                <Edit task_group={group} />
                            ) : group.status === "Telah mengumpulkan" ? (
                                <div className="flex text-sm items-center justify-between gap-2 bg-yellow-100  transform duration-300 text-gray-800 rounded-lg px-4 py-2">
                                    <span className="w-[90%] overflow-hidden font-semibold">
                                        {group.file_name}
                                    </span>
                                    <button
                                        onClick={() =>
                                            router.delete(
                                                `/siswa/tugas/${group.id}`
                                            )
                                        }
                                    >
                                        <CircleX
                                            size={24}
                                            className=" text-red-500"
                                        />
                                    </button>
                                </div>
                            ) : group.status === "Terlambat" ? (
                                <span className="text-red-600 text-sm text-center bg-red-100 p-2   w-full rounded-lg font-semibold">
                                    Anda terlambat Mengumpulkan Tugas !
                                </span>
                            ) : group.status === "Selesai" ? (
                                <span className="text-green-600 text-sm text-center  bg-green-100 p-2   w-full rounded-lg font-semibold">
                                    Cek nilai kamu !
                                </span>
                            ) : null
                        )}
                    </div>
                ))
            ) : (
                <div className="flex items-center md:col-span-2 lg:col-span-4 justify-center p-4 rounded-xl border bg-white py-12 flex-col gap-1 w-full">
                    <img src={noData} className="size-40" alt="" />
                    <div className="flex flex-col gap-2 text-center">
                        <span className="font-medium text-lg">
                            Maaf, tidak ada Tugas
                        </span>
                        <span className="text-sm text-gray-500">
                            Belum ada Tugas hari ini
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Card;
