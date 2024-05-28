import AdminLayout from "@/Layouts/AdminLayout";
import { Plus, Table } from "lucide-react";
import { useState } from "react";
import Create from "./Create";
import DataTableClass from "../DataTable/DataTableClass";

interface Props {
    classes: any;
}

const Index = ({ classes }: Props) => {
    const [activeContent, setActiveContent] = useState("tambah");

    return (
        <AdminLayout
            title="Manajemen Kelas"
            description="proses dan kegiatan yang dilakukan untuk mengelola data Kelas di lingkungan pendidikan"
            head="Manajemen Kelas"
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
                        <span>Tambah Kelas</span>
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
                        <span>Tabel Kelas</span>
                    </button>
                </div>
            </div>
            {activeContent === "tambah" && <Create />}
            {activeContent === "tabel" && <DataTableClass rows={classes} />}
        </AdminLayout>
    );
};

export default Index;
