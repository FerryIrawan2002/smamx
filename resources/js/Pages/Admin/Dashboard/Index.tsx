import AdminLayout from "@/Layouts/AdminLayout";
import { Link } from "@inertiajs/react";
import {
    ChevronRight,
    DoorOpenIcon,
    SquareLibrary,
    Users,
    Users2Icon,
} from "lucide-react";
import DoughnutChart from "./DoughnoutChart";
interface Props {
    studentCounts: any;
    courseCounts: any;
    classCounts: any;
    studentFemale: Number;
    studentMale: Number;
    teacherMale: Number;
    teacherFemale: Number;
    classRoom: any[];
}
const Index = ({
    studentCounts,
    courseCounts,
    classCounts,
    studentFemale,
    studentMale,
    teacherMale,
    teacherFemale,
    classRoom,
}: Props) => {
    console.log(classRoom);
    return (
        <AdminLayout
            title="Dashboard Admin"
            head="Dashboard"
            description=" Selamat Datang, Admin SMA Muhammadiyah 10 Surabaya"
        >
            <div className="grid gap-3 mt-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                <div className="w-full flex gap-3 bg-white shadow-[0px_1px_3px_0px_rgba(0,_0,_0,_0.22)] rounded-md p-4">
                    <Users
                        size={36}
                        className="p-2 w-10 text-white bg-blue-400 rounded-xl"
                    />
                    <div className="flex flex-col w-full mt-1 gap-1">
                        <span className="text-xl font-bold">
                            {studentCounts.siswa_1_count +
                                studentCounts.siswa_0_count}
                        </span>
                        <span className="text-sm font-semibold text-gray-500">
                            Total Siswa
                        </span>
                        <div className="justify-end text-blue-500 flex w-full mt-8">
                            <Link
                                href="/admin/siswa"
                                className="text-xs hover:text-blue-700 hover:underline flex items-center gap-1"
                            >
                                <span>Lihat Detail</span>
                                <ChevronRight size={16} />
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="w-full flex gap-3 bg-white shadow-[0px_1px_3px_0px_rgba(0,_0,_0,_0.22)] rounded-md p-4">
                    <Users2Icon
                        size={36}
                        className="p-2 w-10 text-white bg-purple-400 rounded-xl"
                    />
                    <div className="flex flex-col w-full mt-1 gap-1">
                        <span className="text-xl font-bold">
                            {studentCounts.guru_1_count +
                                studentCounts.guru_0_count}
                        </span>
                        <span className="text-sm font-semibold text-gray-500">
                            Total Guru
                        </span>
                        <div className="justify-end text-blue-500 flex w-full mt-8">
                            <Link
                                href="/admin/guru"
                                className="text-xs hover:text-blue-700 hover:underline flex items-center gap-1"
                            >
                                <span>Lihat Detail</span>
                                <ChevronRight size={16} />
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="w-full flex gap-3 bg-white shadow-[0px_1px_3px_0px_rgba(0,_0,_0,_0.22)] rounded-md p-4">
                    <DoorOpenIcon
                        size={36}
                        className="p-2 w-10 text-white bg-green-400 rounded-xl"
                    />
                    <div className="flex flex-col w-full mt-1 gap-1">
                        <span className="text-xl font-bold">{classCounts}</span>
                        <span className="text-sm font-semibold text-gray-500">
                            Total Kelas
                        </span>
                        <div className="justify-end text-blue-500 flex w-full mt-8">
                            <Link
                                href="/admin/kelas"
                                className="text-xs hover:text-blue-700 hover:underline flex items-center gap-1"
                            >
                                <span>Lihat Detail</span>
                                <ChevronRight size={16} />
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="w-full flex gap-3 bg-white shadow-[0px_1px_3px_0px_rgba(0,_0,_0,_0.22)] rounded-md p-4">
                    <SquareLibrary
                        size={36}
                        className="p-2 w-10 text-white bg-blue-400 rounded-xl"
                    />
                    <div className="flex flex-col w-full mt-1 gap-1">
                        <span className="text-xl font-bold">
                            {courseCounts}
                        </span>
                        <span className="text-sm font-semibold text-gray-500">
                            Total Mata Pelajaran
                        </span>
                        <div className="justify-end text-blue-500 flex w-full mt-8">
                            <Link
                                href="/admin/mapel"
                                className="text-xs hover:text-blue-700 hover:underline flex items-center gap-1"
                            >
                                <span>Lihat Detail</span>
                                <ChevronRight size={16} />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>{" "}
            <div className="grid gap-3 mt-4 grid-cols-1 md:grid-cols-3">
                <div className="w-full flex-col flex gap-3 bg-white shadow-[0px_1px_3px_0px_rgba(0,_0,_0,_0.22)] rounded-md p-4">
                    <div className="flex items-center gap-3">
                        <Users
                            size={36}
                            className="p-2 text-white bg-blue-400 rounded-xl"
                        />{" "}
                        <span className="text-lg font-semibold">
                            Informasi Siswa
                        </span>
                    </div>

                    <hr />
                    <div className="flex items-center justify-center">
                        <DoughnutChart
                            female={studentFemale}
                            male={studentMale}
                        />
                    </div>

                    <div className="flex flex-col gap-2 mt-2">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Aktif</span>
                            <span>{studentCounts.siswa_1_count}</span>
                        </div>
                        <hr />
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">
                                Tidak Aktif
                            </span>
                            <span>{studentCounts.siswa_0_count}</span>
                        </div>
                    </div>
                </div>
                <div className="w-full  flex-col flex gap-3 bg-white shadow-[0px_1px_3px_0px_rgba(0,_0,_0,_0.22)] rounded-md p-4">
                    <div className="flex items-center gap-3">
                        <Users2Icon
                            size={36}
                            className="p-2 text-white bg-purple-400 rounded-xl"
                        />{" "}
                        <span className="text-lg font-semibold">
                            Informasi Guru
                        </span>
                    </div>

                    <hr />
                    <div className="flex items-center justify-center">
                        <DoughnutChart
                            female={teacherFemale}
                            male={teacherMale}
                        />
                    </div>
                </div>
                <div className="w-full  flex-col flex gap-3 bg-white shadow-[0px_1px_3px_0px_rgba(0,_0,_0,_0.22)] rounded-md p-4">
                    <div className="flex items-center gap-3">
                        <DoorOpenIcon
                            size={36}
                            className="p-2  text-white bg-green-400 rounded-xl"
                        />
                        <span className="text-lg font-semibold">
                            Informasi Kelas
                        </span>
                    </div>

                    <hr />
                    <div className="grid grid-cols-3 font-medium text-sm">
                        <span className="text-center">Kelas</span>
                        <span className="text-center">Siswa</span>
                        <span className="text-center">Guru</span>
                    </div>
                    <div className="flex flex-col h-52 overflow-y-auto  gap-2 mt-2">
                        {classRoom.map((classRoom: any) => (
                            <>
                                <div className="grid text-center grid-cols-3 font-medium text-sm">
                                    <span className="text-sm font-medium">
                                        {classRoom.class_name}
                                    </span>
                                    <span>{classRoom.students.length}</span>
                                    <span>{classRoom.teachers.length}</span>
                                </div>
                                <hr />
                            </>
                        ))}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default Index;
