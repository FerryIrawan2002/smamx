import AdminLayout from "@/Layouts/AdminLayout";
import { Plus, Table } from "lucide-react";
import { useState } from "react";
import Create from "./Create";
import DataTableStudent from "../DataTable/DataTableStudent";

interface Props {
    students: any;
}

const Index = ({ students }: Props) => {
    const [activeContent, setActiveContent] = useState("tambah");
    return (
        <AdminLayout
            title="Manajemen Siswa"
            description=" proses dan kegiatan yang dilakukan untuk mengelola siswa
                        di lingkungan pendidikan"
            head="Manajemen Siswa"
        >
            <div className="flex overflow-x-auto w-full gap-4 md:gap-6 justify-between mt-4  font-medium">
                <div className="flex items-center gap-2 text-xs lg:text-sm mb-4">
                    <button
                        className={`flex items-center gap-2 ${
                            activeContent === "tambah"
                                ? "bg-blue-600 text-white"
                                : "bg-blue-200 text-blue-600"
                        } py-2 px-4 rounded-lg transition duration-300`}
                        onClick={() => setActiveContent("tambah")}
                    >
                        <Plus size={20} />
                        <span>Tambah Siswa</span>
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
                        <span>Tabel Siswa</span>
                    </button>
                </div>
            </div>

            {activeContent === "tambah" && <Create />}
            {activeContent === "tabel" && <DataTableStudent rows={students} />}
        </AdminLayout>
    );
};

export default Index;
