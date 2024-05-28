import Toastify from "@/Components/Toastify";
import Navbar from "@/Pages/Admin/Navbar";
import Sidebar from "@/Pages/Admin/Sidebar";
import { PageProps } from "@/types";
import { Head, usePage } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface Props {
    children: React.ReactNode;
    title?: string;
    description?: string;
    head: string;
}
const AdminLayout = ({ children, title, description, head }: Props) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
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
            {flash?.success && <Toastify />}
            {flash?.error && <Toastify />}
            <Head title={head} />
            <Navbar toggleSidebar={toggleSidebar} />
            <Sidebar
                isOpen={isSidebarOpen}
                closeSidebar={() => setIsSidebarOpen(false)}
            />
            <div className="md:ml-64 mt-28 mx-4 md:mx-0 md:px-8 pb-16">
                <div className="text-2xl md:text-4xl gap-1 flex flex-col font-bold">
                    <span>{title}</span>
                    <span className="  text-sm md:text-lg font-medium text-gray-500">
                        {description}
                    </span>
                </div>
                {children}
            </div>
        </>
    );
};

export default AdminLayout;
