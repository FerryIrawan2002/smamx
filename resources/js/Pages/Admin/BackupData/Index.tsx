import AdminLayout from "@/Layouts/AdminLayout";
import { Head } from "@inertiajs/react";
import { useState } from "react";
import DataTableRestoreStudent from "../DataTableRestore/DataTableRestoreStudent";
import DataTableRestoreTeacher from "../DataTableRestore/DataTableRestoreTeacher";
import DataTableRestoreCourse from "../DataTableRestore/DataTableRestoreCourse";
import DataTableRestoreClass from "../DataTableRestore/DataTableRestoreClass";
import DataTableRestoreTeacherClass from "../DataTableRestore/DataTableRestoreTeacherClass";
import DataTableRestoreAdmin from "../DataTableRestore/DataTableRestoreAdmin";
import DataTableRestoreSchedule from "../DataTableRestore/DataTableRestoreSchedule";

interface Props {
    teacher: any;
    student: any;
    course: any;
    classroom: any;
    classroomTeacherCourse: any;
    admins: any;
    schedule: any;
}
const Index = ({
    teacher,
    student,
    course,
    classroom,
    classroomTeacherCourse,
    admins,
    schedule,
}: Props) => {
    const [activeContent, setActiveContent] = useState("student");

    return (
        <>
            <Head title="Manajemen Backup Data" />
            <AdminLayout
                title="Manajemen Backup Data"
                description="proses dan kegiatan yang dilakukan untuk mengelola data backup di lingkungan pendidikan"
                head="Manajemen Backup Data"
            >
                <div className="flex overflow-x-auto w-auto gap-2 my-4 font-medium text-xs lg:text-sm">
                    <button
                        className={`flex items-center  gap-2 ${
                            activeContent === "student"
                                ? "bg-blue-600 text-white"
                                : "bg-blue-200 text-blue-600"
                        } py-2 px-4 rounded-lg transition duration-300`}
                        onClick={() => setActiveContent("student")}
                    >
                        <div className="flex items-center gap-2">
                            <span>Siswa</span>
                            <span>({student.length})</span>
                        </div>
                    </button>
                    <button
                        className={`flex items-center gap-2 ${
                            activeContent === "teacher"
                                ? "bg-blue-600 text-white"
                                : "bg-blue-200 text-blue-600"
                        } py-2 px-4 rounded-lg transition duration-300`}
                        onClick={() => setActiveContent("teacher")}
                    >
                        <div className="flex items-center gap-2">
                            <span>Guru</span>
                            <span>({teacher.length})</span>
                        </div>
                    </button>
                    <button
                        className={`flex items-center gap-2 ${
                            activeContent === "admin"
                                ? "bg-blue-600 text-white"
                                : "bg-blue-200 text-blue-600"
                        } py-2 px-4 rounded-lg transition duration-300`}
                        onClick={() => setActiveContent("admin")}
                    >
                        <div className="flex items-center gap-2">
                            <span>Admin</span>
                            <span>({admins.length})</span>
                        </div>
                    </button>
                    <button
                        className={`flex items-center gap-2 ${
                            activeContent === "course"
                                ? "bg-blue-600 text-white"
                                : "bg-blue-200 text-blue-600"
                        } py-2 px-4 rounded-lg transition duration-300`}
                        onClick={() => setActiveContent("course")}
                    >
                        <div className="flex w-36 items-center gap-2">
                            <span>Mata Pelajaran</span>
                            <span>({course.length})</span>
                        </div>
                    </button>
                    <button
                        className={`flex items-center gap-2 ${
                            activeContent === "class"
                                ? "bg-blue-600 text-white"
                                : "bg-blue-200 text-blue-600"
                        } py-2 px-4 rounded-lg transition duration-300`}
                        onClick={() => setActiveContent("class")}
                    >
                        <div className="flex w-20 items-center gap-2">
                            <span>Kelas</span>
                            <span>({classroom.length})</span>
                        </div>
                    </button>
                    <button
                        className={`flex items-center gap-2 ${
                            activeContent === "gurukelasmapel"
                                ? "bg-blue-600 text-white"
                                : "bg-blue-200 text-blue-600"
                        } py-2 px-4 rounded-lg transition duration-300`}
                        onClick={() => setActiveContent("gurukelasmapel")}
                    >
                        <div className="flex items-center gap-2">
                            <span>Ajar</span>
                            <span>({classroomTeacherCourse.length})</span>
                        </div>
                    </button>
                    <button
                        className={`flex items-center gap-2 ${
                            activeContent === "shcedule"
                                ? "bg-blue-600 text-white"
                                : "bg-blue-200 text-blue-600"
                        } py-2 px-4 rounded-lg transition duration-300`}
                        onClick={() => setActiveContent("shcedule")}
                    >
                        <div className="flex items-center gap-2">
                            <span>Jadwal</span>
                            <span>({schedule.length})</span>
                        </div>
                    </button>
                </div>
                {activeContent === "student" && (
                    <DataTableRestoreStudent rows={student} />
                )}
                {activeContent === "teacher" && (
                    <DataTableRestoreTeacher rows={teacher} />
                )}
                {activeContent === "admin" && (
                    <DataTableRestoreAdmin rows={admins} />
                )}
                {activeContent === "course" && (
                    <DataTableRestoreCourse rows={course} />
                )}
                {activeContent === "class" && (
                    <DataTableRestoreClass rows={classroom} />
                )}
                {activeContent === "gurukelasmapel" && (
                    <DataTableRestoreTeacherClass
                        rows={classroomTeacherCourse}
                    />
                )}
                {activeContent === "shcedule" && (
                    <DataTableRestoreSchedule rows={schedule} />
                )}
            </AdminLayout>
        </>
    );
};

export default Index;
