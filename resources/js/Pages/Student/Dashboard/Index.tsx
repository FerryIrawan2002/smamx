import Toastify from "@/Components/Toastify";
import StudentLayout from "@/Layouts/StudentLayout";
import { StudentClass, Schedule, Teacher, Course, PageProps } from "@/types";
import { Head, Link, usePage } from "@inertiajs/react";
import { TimerIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface Props {
    studentClass: StudentClass[];
    classroomStudent: any;
}

const Index = ({ studentClass, classroomStudent }: Props) => {
    const flash = usePage<PageProps>().props.flash;
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
            <Head title="Dashboard Siswa" />
            {flash?.success && <Toastify />}
            {flash?.error && <Toastify />}
            <StudentLayout>
                <section className="mb-20">
                    <div className="flex flex-col gap-2  md:mt-12">
                        <div className="flex flex-col gap-2">
                            <span className="text-3xl font-semibold md:text-4xl lg:text-5xl">
                                Anda telah masuk ke kelas{" "}
                                <span className=" font-bold">
                                    {classroomStudent.class_name}
                                </span>
                            </span>
                            <span className=" text-gray-600 md:text-lg">
                                Tingkatkan Pengalaman Belajar Anda Temukan Semua
                                yang Anda Butuhkan dalam Dashboard Siswa Kami!
                            </span>
                        </div>
                        <div className=" grid grid-cols-1  mt-8 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10 md:mt-8 lg:mt-10">
                            {studentClass.map((classroom: StudentClass) => (
                                <Link
                                    href={`/siswa/dashboard/${classroom.id}`}
                                    key={classroom.id}
                                    className="flex flex-col gap-2 rounded-3xl bg-white  shadow  hover:bg-gray-100 transform duration-300 "
                                >
                                    <div className="relative h-52 w-full ">
                                        <img
                                            className="w-full h-full object-cover rounded-t-3xl"
                                            src={
                                                window.location.origin +
                                                "/storage/" +
                                                classroom?.course?.photo
                                            }
                                            alt=""
                                        />
                                        <img
                                            className=" z-10 left-4 -bottom-11 rounded-full border-4 border-white absolute size-24 md:-bottom-9 object-cover"
                                            src={
                                                window.location.origin +
                                                "/storage/" +
                                                classroom?.teacher?.photo
                                            }
                                            alt=""
                                        />
                                    </div>
                                    <div className="mt-6 md:mt-8 flex flex-col p-4">
                                        {" "}
                                        <span className=" font-semibold text-xl">
                                            {classroom?.course?.course_name}
                                        </span>
                                        <span className=" text-gray-500 text-lg">
                                            {classroom?.teacher?.user.name}
                                        </span>
                                    </div>
                                    <div className="flex flex-col gap-2 items-end  p-4">
                                        {classroom.schedules.map(
                                            (schedule: Schedule) => (
                                                <div className="flex flex-col px-4 py-1 rounded-full  bg-red-100">
                                                    <span className=" text-sm font-medium">
                                                        {schedule.day},{" "}
                                                        {schedule.time_start} -{" "}
                                                        {schedule.time_end}
                                                    </span>
                                                </div>
                                            )
                                        )}
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            </StudentLayout>
        </>
    );
};

export default Index;
