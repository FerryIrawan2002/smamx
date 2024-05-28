import Toastify from "@/Components/Toastify";
import TeacherLayout from "@/Layouts/TeacherLayout";
import { PageProps, Task } from "@/types";
import { Head, Link, usePage } from "@inertiajs/react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import DataTableGropTask from "../DataTable/DataTableGroupTask";
import { ChevronLeft } from "lucide-react";

interface Props {
    taskGroup: Task;
}

const DetailShow = ({ taskGroup }: Props) => {
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
            <Head title="Dashboard Tugas Guru" />
            <TeacherLayout>
                {flash?.success && <Toastify />}
                {flash?.error && <Toastify />}
                <section className="mb-20">
                    <button
                        onClick={() => window.history.back()}
                        className="flex items-center gap-2"
                    >
                        <ChevronLeft />
                        <span>Kembali</span>
                    </button>

                    <div className="mt-8">
                        <DataTableGropTask rows={taskGroup} />
                    </div>
                </section>
            </TeacherLayout>
        </>
    );
};

export default DetailShow;
