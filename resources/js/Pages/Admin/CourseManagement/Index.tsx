import AdminLayout from "@/Layouts/AdminLayout";
import { Head } from "@inertiajs/react";
import { Plus, Table } from "lucide-react";
import { useState } from "react";
import Create from "./Create";
import DataTableCourse from "../DataTable/DataTableCourse";

interface Props {
    courses: any;
}

const Index = ({ courses }: Props) => {
    const [activeContent, setActiveContent] = useState("tambah");

    return (
        <>
            <Head title="Manajemen Mata Pelajaran" />
            <AdminLayout
                head="Manajemen Mata Pelajaran"
                description="proses dan kegiatan yang dilakukan untuk mengelola data Mata Pelajaran di lingkungan pendidikan"
                title="Manajemen Mata Pelajaran"
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
                            <span>Tambah Mata Pelajaran</span>
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
                            <span>Tabel Mata Pelajaran</span>
                        </button>
                    </div>
                </div>
                {activeContent === "tambah" && <Create />}
                {activeContent === "tabel" && (
                    <DataTableCourse rows={courses} />
                )}
            </AdminLayout>
        </>
    );
};

export default Index;
