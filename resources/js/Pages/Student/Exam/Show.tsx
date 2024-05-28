import StudentLayout from "@/Layouts/StudentLayout";
import { StudentClass, PageProps } from "@/types";
import { Head, usePage } from "@inertiajs/react";

import { useEffect, useState } from "react";

import { toast } from "react-toastify";
import Toastify from "@/Components/Toastify";
import Card from "./Card";
import Table from "./Table";

interface Props {
    classTeacher: StudentClass;
}

const Show = ({ classTeacher }: Props) => {
    const flash = usePage<PageProps>().props.flash;

    const [activeContent, setActiveContent] = useState("card");
    useEffect(() => {
        if (flash && flash?.error) {
            toast.error(flash.error, {
                position: "top-right",
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
                position: "top-right",
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
            <Head title="Dashboard Siswa" />
            <StudentLayout urlTask={classTeacher?.id}>
                {flash?.success && <Toastify />}
                {flash?.error && <Toastify />}
                <section className="mb-20">
                    <div className="flex flex-col gap-2 md:mt-12">
                        <div className="flex flex-col gap-2">
                            <span className="text-3xl font-semibold md:text-4xl lg:text-5xl">
                                Ujian {classTeacher.course.course_name}
                            </span>
                            <span className="text-gray-600 md:text-lg">
                                Tingkatkan kemampuanmu dengan mengikuti ujian
                            </span>
                        </div>
                    </div>
                    <div className="flex items-center text-sm font-semibold gap-2 mt-5">
                        <button
                            className={`flex items-center gap-2 ${
                                activeContent === "card"
                                    ? " border-b-2 border-black text-black"
                                    : " text-gray-500"
                            } py-2 px-4 transition duration-300`}
                            onClick={() => setActiveContent("card")}
                        >
                            <span>List Ujian</span>
                        </button>

                        <button
                            className={`flex items-center gap-2 ${
                                activeContent === "tabel"
                                    ? " border-b-2 border-black text-black"
                                    : "  text-gray-500"
                            } py-2 px-4 transition duration-300`}
                            onClick={() => setActiveContent("tabel")}
                        >
                            <span>Nilai Ujian</span>
                        </button>
                    </div>
                    {activeContent === "card" && (
                        <Card classTeacher={classTeacher} />
                    )}
                    {activeContent === "tabel" && (
                        <div className="mt-8">
                            <Table classTeacher={classTeacher} />
                        </div>
                    )}
                </section>
            </StudentLayout>
        </>
    );
};

export default Show;
