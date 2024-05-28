import Toastify from "@/Components/Toastify";
import AdminLayout from "@/Layouts/AdminLayout";
import { PageProps } from "@/types";
import { Head, usePage } from "@inertiajs/react";
import { Plus, Table, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Create from "./Create";
import DataTableTeacher from "../DataTable/DataTableTeacher";

interface Props {
    teachers: any;
}
const Index = ({ teachers }: Props) => {
    const [activeContent, setActiveContent] = useState("tambah");

    return (
        <AdminLayout
            title="Manajemen Guru"
            description="proses dan kegiatan yang dilakukan untuk mengelola data Guru di lingkungan pendidikan"
            head="Manajemen Guru"
        >
            <div className="flex overflow-x-auto w-full gap-4 md:gap-6 justify-between mt-4 font-medium">
                <div
                    className="flex items-center gap-2 text-xs lg:text-sm mb-4
                    "
                >
                    <button
                        className={`flex items-center gap-2 ${
                            activeContent === "tambah"
                                ? "bg-blue-600 text-white"
                                : "bg-blue-200 text-blue-600"
                        } py-2 px-4 rounded-lg transition duration-300`}
                        onClick={() => setActiveContent("tambah")}
                    >
                        <Plus size={20} />
                        <span>Tambah Guru</span>
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
                        <span>Tabel Guru</span>
                    </button>
                </div>
            </div>
            {activeContent === "tambah" && <Create />}
            {activeContent === "tabel" && <DataTableTeacher rows={teachers} />}
        </AdminLayout>
    );
};

export default Index;
