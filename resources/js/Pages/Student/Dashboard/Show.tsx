import StudentLayout from "@/Layouts/StudentLayout";
import { StudentClass, Learn, LearnFile } from "@/types";
import { Head, Link } from "@inertiajs/react";
import { Download, TimerIcon } from "lucide-react";
import { useState } from "react";
import noData from "../../../../../public/assets/img/nodata.png";
interface Props {
    classTeacher: StudentClass;
}
import moment from "moment";
import sanitizeAndValidateHTML from "@/lib/SanitizeHTML";

const Show = ({ classTeacher }: Props) => {
    moment.locale("id");

    const formatDate = (dateString: string) => {
        const date = moment(dateString).locale("id");
        const formattedDate = date.format("DD MMMM YYYY - HH:mm");
        return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
    };
    const LearnComponent = ({ learn }: any) => {
        const sanitizedHTML = sanitizeAndValidateHTML(learn.desc);

        return (
            <div className="flex  flex-col gap-1 mt-2">
                <span>Deskripsi : </span>
                <div
                    dangerouslySetInnerHTML={{
                        __html: sanitizedHTML,
                    }}
                ></div>
            </div>
        );
    };

    return (
        <>
            <Head title="Mapel Siswa" />
            <StudentLayout urlLearn={classTeacher?.id}>
                <div className="relative h-52 md:h-60 lg:h-72 lg:mx-28">
                    <img
                        className="w-full h-full rounded-t-3xl brightness-75 object-cover"
                        src={`${window.location.origin}/storage/${classTeacher?.course?.photo}`}
                        alt=""
                    />
                    <div className="absolute bottom-6 left-6  md:left-8 lg:left-10 flex flex-col gap-1">
                        <span className=" text-3xl drop-shadow-xl md:text-4xl lg:text-5xl text-white font-semibold">
                            {classTeacher.course.course_name}
                        </span>
                        <div className="flex flex-col md:items-start gap-2 font-medium">
                            {classTeacher.schedules.map((schedule: any) => (
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
                <div className="mt-4 lg:mx-28 gap-2 md:gap-4 w-auto grid grid-cols-1 mb-20  lg:grid-cols-4">
                    <div className="p-4 lg:col-start-1 lg:col-end-2  h-32 rounded-xl border flex flex-col gap-2 bg-white">
                        <span className="text-lg font-semibold">
                            {classTeacher.teacher.user.name}
                        </span>
                        <a
                            href={`https://wa.me/${classTeacher.teacher.phone_number}`}
                            target="_blank"
                            className="flex items-center gap-2 group"
                        >
                            <div className="flex items-center gap-2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={23.82}
                                    height={24}
                                    viewBox="0 0 256 258"
                                >
                                    <defs>
                                        <linearGradient
                                            id="logosWhatsappIcon0"
                                            x1="50%"
                                            x2="50%"
                                            y1="100%"
                                            y2="0%"
                                        >
                                            <stop
                                                offset="0%"
                                                stopColor="#1faf38"
                                            ></stop>
                                            <stop
                                                offset="100%"
                                                stopColor="#60d669"
                                            ></stop>
                                        </linearGradient>
                                        <linearGradient
                                            id="logosWhatsappIcon1"
                                            x1="50%"
                                            x2="50%"
                                            y1="100%"
                                            y2="0%"
                                        >
                                            <stop
                                                offset="0%"
                                                stopColor="#f9f9f9"
                                            ></stop>
                                            <stop
                                                offset="100%"
                                                stopColor="#fff"
                                            ></stop>
                                        </linearGradient>
                                    </defs>
                                    <path
                                        fill="url(#logosWhatsappIcon0)"
                                        d="M5.463 127.456c-.006 21.677 5.658 42.843 16.428 61.499L4.433 252.697l65.232-17.104a122.994 122.994 0 0 0 58.8 14.97h.054c67.815 0 123.018-55.183 123.047-123.01c.013-32.867-12.775-63.773-36.009-87.025c-23.23-23.25-54.125-36.061-87.043-36.076c-67.823 0-123.022 55.18-123.05 123.004"
                                    ></path>
                                    <path
                                        fill="url(#logosWhatsappIcon1)"
                                        d="M1.07 127.416c-.007 22.457 5.86 44.38 17.014 63.704L0 257.147l67.571-17.717c18.618 10.151 39.58 15.503 60.91 15.511h.055c70.248 0 127.434-57.168 127.464-127.423c.012-34.048-13.236-66.065-37.3-90.15C194.633 13.286 162.633.014 128.536 0C58.276 0 1.099 57.16 1.071 127.416m40.24 60.376l-2.523-4.005c-10.606-16.864-16.204-36.352-16.196-56.363C22.614 69.029 70.138 21.52 128.576 21.52c28.3.012 54.896 11.044 74.9 31.06c20.003 20.018 31.01 46.628 31.003 74.93c-.026 58.395-47.551 105.91-105.943 105.91h-.042c-19.013-.01-37.66-5.116-53.922-14.765l-3.87-2.295l-40.098 10.513z"
                                    ></path>
                                    <path
                                        fill="#fff"
                                        d="M96.678 74.148c-2.386-5.303-4.897-5.41-7.166-5.503c-1.858-.08-3.982-.074-6.104-.074c-2.124 0-5.575.799-8.492 3.984c-2.92 3.188-11.148 10.892-11.148 26.561c0 15.67 11.413 30.813 13.004 32.94c1.593 2.123 22.033 35.307 54.405 48.073c26.904 10.609 32.379 8.499 38.218 7.967c5.84-.53 18.844-7.702 21.497-15.139c2.655-7.436 2.655-13.81 1.859-15.142c-.796-1.327-2.92-2.124-6.105-3.716c-3.186-1.593-18.844-9.298-21.763-10.361c-2.92-1.062-5.043-1.592-7.167 1.597c-2.124 3.184-8.223 10.356-10.082 12.48c-1.857 2.129-3.716 2.394-6.9.801c-3.187-1.598-13.444-4.957-25.613-15.806c-9.468-8.442-15.86-18.867-17.718-22.056c-1.858-3.184-.199-4.91 1.398-6.497c1.431-1.427 3.186-3.719 4.78-5.578c1.588-1.86 2.118-3.187 3.18-5.311c1.063-2.126.531-3.986-.264-5.579c-.798-1.593-6.987-17.343-9.819-23.64"
                                    ></path>
                                </svg>
                                <span className=" group-hover:underline">
                                    {classTeacher.teacher.phone_number}
                                </span>
                            </div>
                        </a>
                        <a
                            href={`mailto:${classTeacher.teacher.user.email}`}
                            target="_blank"
                            className="flex items-center gap-2 group"
                        >
                            <div className="flex items-center gap-2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={24}
                                    height={24}
                                    viewBox="0 0 256 256"
                                >
                                    <g fill="none">
                                        <rect
                                            width={256}
                                            height={256}
                                            fill="#f4f2ed"
                                            rx={60}
                                        ></rect>
                                        <path
                                            fill="#4285f4"
                                            d="M41.636 203.039h31.818v-77.273L28 91.676v97.727c0 7.545 6.114 13.636 13.636 13.636"
                                        ></path>
                                        <path
                                            fill="#34a853"
                                            d="M182.545 203.039h31.819c7.545 0 13.636-6.114 13.636-13.636V91.675l-45.455 34.091"
                                        ></path>
                                        <path
                                            fill="#fbbc04"
                                            d="M182.545 66.675v59.091L228 91.676V73.492c0-16.863-19.25-26.477-32.727-16.363"
                                        ></path>
                                        <path
                                            fill="#ea4335"
                                            d="M73.455 125.766v-59.09L128 107.583l54.545-40.909v59.091L128 166.675"
                                        ></path>
                                        <path
                                            fill="#c5221f"
                                            d="M28 73.493v18.182l45.454 34.091v-59.09L60.727 57.13C47.227 47.016 28 56.63 28 73.493"
                                        ></path>
                                    </g>
                                </svg>
                                <span className=" group-hover:underline">
                                    {classTeacher.teacher.user.email}
                                </span>
                            </div>
                        </a>
                    </div>
                    <div className=" flex flex-col gap-2 lg:col-start-2 lg:col-end-5">
                        <div className="flex flex-col gap-4">
                            {classTeacher.learn &&
                            classTeacher.learn.length > 0 ? (
                                classTeacher.learn.map((learn: Learn) => (
                                    <div className="flex shadow flex-col p-4 border bg-white  rounded-xl">
                                        <div
                                            key={learn.id}
                                            className="flex items-center gap-3 w-full "
                                        >
                                            <img
                                                src={
                                                    window.location.origin +
                                                    "/storage/" +
                                                    classTeacher.teacher.photo
                                                }
                                                className="size-10 rounded-full object-cover"
                                                alt=""
                                            />
                                            <div className="flex flex-col">
                                                <span className=" font-semibold">
                                                    {
                                                        classTeacher.teacher
                                                            .user.name
                                                    }
                                                </span>
                                                <span className="text-sm font-medium text-gray-500">
                                                    {formatDate(
                                                        learn.created_at
                                                    )}
                                                </span>
                                            </div>
                                        </div>
                                        <hr className="my-4" />
                                        <div className="flex flex-col ml-6 gap-2">
                                            <span className="text-2xl font-bold">
                                                {learn.week}
                                            </span>
                                            <LearnComponent learn={learn} />
                                        </div>
                                        {learn.learnfile.length > 0 && (
                                            <hr className="my-4" />
                                        )}
                                        <div
                                            className="flex flex-col gap-2
                                        "
                                        >
                                            {learn.learnfile.map(
                                                (file: LearnFile) => (
                                                    <a
                                                        href={
                                                            window.location
                                                                .origin +
                                                            "/storage/" +
                                                            file.file
                                                        }
                                                        className="flex"
                                                    >
                                                        <span className=" bg-blue-500 font-semibold text-white rounded-lg px-4 py-2 flex items-center gap-2">
                                                            <Download />
                                                            <span className=" text-sm">
                                                                {file.name}
                                                            </span>
                                                        </span>
                                                    </a>
                                                )
                                            )}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="flex items-center justify-center p-4 rounded-xl border bg-white py-12 flex-col gap-1">
                                    <img
                                        src={noData}
                                        className="size-40"
                                        alt=""
                                    />
                                    <div className="flex flex-col gap-2 text-center">
                                        <span className="font-medium text-lg">
                                            Maaf, tidak ada materi
                                        </span>
                                        <span className="text-sm text-gray-500">
                                            Belum ada materi hari ini
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </StudentLayout>
        </>
    );
};

export default Show;
