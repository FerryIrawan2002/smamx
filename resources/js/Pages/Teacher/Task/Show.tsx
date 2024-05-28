import Toastify from "@/Components/Toastify";
import TeacherLayout from "@/Layouts/TeacherLayout";
import { PageProps, Task } from "@/types";
import { Head, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Create from "./Create";
import DataTableTask from "../DataTable/DataTableTask";

interface Props {
    classRoom: any;
    tasks: Task;
}
const Show = ({ classRoom, tasks }: Props) => {
    const flash = usePage<PageProps>().props.flash;
    const [activeContent, setActiveContent] = useState("tabel");
    useEffect(() => {
        if (flash && flash?.error) {
            toast.error(flash.error, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        } else if (flash && flash?.success) {
            toast.success(flash.success, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    }, [flash]);
    return (
        <>
            <Head title="Dashboard Tugas Guru" />
            <TeacherLayout urlTask={classRoom?.id}>
                {flash?.success && <Toastify />}
                {flash?.error && <Toastify />}
                <section className="mb-20">
                    <div className="flex items-center justify-between">
                        <div className="flex flex-col gap-2">
                            <span className="text-3xl font-semibold md:text-4xl lg:text-5xl">
                                Tambah Tugas baru
                            </span>
                            <span className=" ml-2 text-gray-600 md:text-lg">
                                Tambahkan Tugas Baru di kelas ini
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center text-sm font-semibold gap-2 mt-5">
                        <button
                            className={`flex items-center gap-2 ${
                                activeContent === "tabel"
                                    ? " border-b-2 border-black text-black"
                                    : " text-gray-500"
                            } py-2 px-4 transition duration-300`}
                            onClick={() => setActiveContent("tabel")}
                        >
                            <span>Tabel Tugas</span>
                        </button>

                        <button
                            className={`flex items-center gap-2 ${
                                activeContent === "tambah"
                                    ? " border-b-2 border-black text-black"
                                    : "  text-gray-500"
                            } py-2 px-4 transition duration-300`}
                            onClick={() => setActiveContent("tambah")}
                        >
                            <span>Tambah Tugas</span>
                        </button>
                    </div>
                    {activeContent === "tambah" && (
                        <Create class_teacher_id={classRoom.id} />
                    )}
                    {activeContent === "tabel" && (
                        <div className="mt-8">
                            <DataTableTask rows={tasks} />
                        </div>
                    )}
                </section>
            </TeacherLayout>
        </>
    );
};

export default Show;
