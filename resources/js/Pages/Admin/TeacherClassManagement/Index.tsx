import AdminLayout from "@/Layouts/AdminLayout";
import { Plus, Table } from "lucide-react";
import { useState } from "react";
import Create from "./Create";
import DataTableTeacherClass from "../DataTable/DataTableTeacherClass";

interface Props {
    teacherClassroom: any;
}

const Index = ({ teacherClassroom }: Props) => {
    const [activeContent, setActiveContent] = useState("tambah");

    return (
        <AdminLayout
            title="Manajemen Ajaran"
            description="proses dan kegiatan yang dilakukan untuk mengelola data Ajar di lingkungan pendidikan"
            head="Manajemen Ajaran"
        >
            <div className="flex overflow-x-auto w-full gap-4 md:gap-6 justify-between my-4 font-medium">
                <div className="flex items-center gap-2 text-xs lg:text-sm">
                    <button
                        className={`flex items-center gap-2 ${
                            activeContent === "tambah"
                                ? "bg-blue-600 text-white"
                                : "bg-blue-200 text-blue-600"
                        } py-2 px-4 rounded-lg transition duration-300`}
                        onClick={() => setActiveContent("tambah")}
                    >
                        <Plus size={20} />
                        <span>Tambah Ajar</span>
                    </button>

                    <button
                        className={`flex items-center gap-2 ${
                            activeContent === "tabel"
                                ? "bg-blue-600 text-white"
                                : "bg-blue-200 text-blue-600"
                        } py-2 px-4 rounded-lg transition duration-300`}
                        onClick={() => setActiveContent("tabel")}
                    >
                        <Table size={20} />
                        <span>Tabel Ajar</span>
                    </button>
                </div>
            </div>
            {activeContent === "tambah" && (
                <>
                    <Create />
                </>
            )}
            {activeContent === "tabel" && (
                <DataTableTeacherClass rows={teacherClassroom} />
            )}
        </AdminLayout>
    );
};

export default Index;
