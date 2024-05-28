import { Link, Head, usePage } from "@inertiajs/react";
import { PageProps } from "@/types";
import GuestLayout from "@/Layouts/GuestLayout";
import { useEffect } from "react";
import { toast } from "react-toastify";
import Toastify from "@/Components/Toastify";

export default function Welcome({
    auth,
    laravelVersion,
    phpVersion,
}: PageProps<{ laravelVersion: string; phpVersion: string }>) {
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
            <Head title="Welcome" />
            <GuestLayout>
                {flash?.error && <Toastify />}
                {flash?.success && <Toastify />}
                <section className=" h-hdv  w-full px-4 sm:px-12 lg:px-16">
                    <div className="py-8 px-4 mx-auto max-w-screen-xl text-center flex items-center h-dvh">
                        <section className="z-10">
                            <div className=" px-4 mb-44 mx-auto max-w-screen-xl md:text-center">
                                <h1 className="mb-4 text-4xl font-bold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
                                    Selamat Datang Di Website E-Learning SMA
                                    Muhammadiyah 10 Surabaya
                                </h1>
                                <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-400">
                                    Setiap butir ilmu yang kita peroleh akan
                                    menjadi bekal bagi masa depan kita. Ayo,
                                    mari kita tekun belajar untuk mewujudkan
                                    impian kita!
                                </p>
                                <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
                                    <Link
                                        href="/login"
                                        className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-red-600 hover:bg-red-600/80 focus:ring-4 focus:ring-red-300 dark:focus:ring-red-900"
                                    >
                                        Ayo Mulai Belajar
                                        <svg
                                            className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 14 10"
                                        >
                                            <path
                                                stroke="currentColor"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="M1 5h12m0 0L9 1m4 4L9 9"
                                            />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        </section>
                    </div>
                </section>
            </GuestLayout>
        </>
    );
}
