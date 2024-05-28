import Toastify from "@/Components/Toastify";
import StudentLayout from "@/Layouts/StudentLayout";
import TeacherLayout from "@/Layouts/TeacherLayout";
import { ClassTeacherCourse, PageProps, Schedule } from "@/types";
import { Head, Link, usePage } from "@inertiajs/react";
import { useEffect } from "react";
import { toast } from "react-toastify";

interface Props {
    classrooms: ClassTeacherCourse[];
    teacher: any;
}
const Index = ({ classrooms, teacher }: Props) => {
    const { auth } = usePage<PageProps>().props;
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
            <Head title="Dashboard Guru" />
            {flash?.success && <Toastify />}
            {flash?.error && <Toastify />}
            <TeacherLayout>
                <section className="mb-20">
                    <div className="flex flex-col gap-2">
                        <span className="text-3xl font-semibold md:text-4xl lg:text-5xl">
                            Selamat datang, {auth.user.name}
                        </span>
                        <span className=" text-gray-600 md:text-lg">
                            Anda memiliki {classrooms.length} Kelas dan Mata
                            Pelajaran yang anda ajar
                        </span>
                    </div>
                    <div className=" grid grid-cols-1  mt-8 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10 md:mt-8 lg:mt-10">
                        {classrooms.map((classroom: ClassTeacherCourse) => (
                            <Link
                                href={`/guru/dashboard/${classroom.id}`}
                                key={classroom.id}
                                className="flex flex-col gap-2 rounded-3xl bg-white  shadow  hover:bg-gray-100 transform duration-300 "
                            >
                                <div className="h-52 w-full ">
                                    <img
                                        loading="lazy"
                                        className="w-full h-full object-cover rounded-t-3xl"
                                        src={`https://api.dicebear.com/5.x/initials/svg?seed=${classroom?.course.course_name}`}
                                        alt=""
                                    />
                                </div>
                                <div className=" flex flex-col p-4">
                                    <span className=" font-semibold text-2xl">
                                        {classroom?.class_room.class_name}
                                    </span>
                                    <span className=" text-gray-500 text-lg">
                                        {classroom?.course.course_name}
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
                </section>
            </TeacherLayout>
        </>
    );
};

export default Index;
