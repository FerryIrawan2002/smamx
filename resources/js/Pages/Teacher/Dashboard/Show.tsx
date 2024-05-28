import StudentLayout from "@/Layouts/StudentLayout";
import TeacherLayout from "@/Layouts/TeacherLayout";
import { ClassTeacherCourse, PageProps, Schedule } from "@/types";
import { Head, Link, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import Create from "./Create";
import Toastify from "@/Components/Toastify";
import { toast } from "react-toastify";
import DataTableLearn from "../DataTable/DataTableLearn";
interface Props {
    classroom: ClassTeacherCourse;
    dataLearn: any;
}
const Index = ({ classroom, dataLearn }: Props) => {
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
            <Head title="Dashboard Guru" />
            <TeacherLayout urlLearn={classroom?.id}>
                {flash?.success && <Toastify />}
                {flash?.error && <Toastify />}
                <section className="mb-20">
                    <div className="relative h-52 md:h-60 lg:h-72 lg:mx-28">
                        <img
                            loading="lazy"
                            className="w-full h-full rounded-t-3xl brightness-75 object-cover"
                            src={`${window.location.origin}/storage/${classroom?.course?.photo}`}
                            alt=""
                        />
                        <div className="absolute bottom-6 left-6  md:left-8 lg:left-10 flex flex-col gap-1">
                            <span className=" text-3xl drop-shadow-xl md:text-4xl lg:text-5xl text-white font-semibold">
                                {classroom.course.course_name}
                            </span>
                            <div className="flex flex-col md:items-start gap-2 font-medium">
                                {classroom.schedules.map((schedule: any) => (
                                    <div className="flex items-center text-white">
                                        <span>{schedule.day}, </span>
                                        <span className="ml-1">
                                            {schedule.time_start} -{" "}
                                            {schedule.time_end}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 lg:mx-28 mt-3">
                        <button
                            className={`flex items-center gap-2 ${
                                activeContent === "tabel"
                                    ? " border-b-2 border-black text-black"
                                    : "  text-gray-500"
                            } py-2 px-4 transition duration-300`}
                            onClick={() => setActiveContent("tabel")}
                        >
                            <span>Tabel Materi</span>
                        </button>
                        <button
                            className={`flex items-center gap-2 ${
                                activeContent === "tambah"
                                    ? " border-b-2 border-black text-black"
                                    : " text-gray-500"
                            } py-2 px-4 transition duration-300`}
                            onClick={() => setActiveContent("tambah")}
                        >
                            <span>Tambah Materi</span>
                        </button>
                    </div>
                    <div className="lg:mx-28 mt-8">
                        {activeContent === "tambah" && (
                            <Create class_teacher_id={classroom.id} />
                        )}
                        {activeContent === "tabel" && (
                            <DataTableLearn rows={dataLearn} />
                        )}
                    </div>
                </section>
            </TeacherLayout>
        </>
    );
};

export default Index;
