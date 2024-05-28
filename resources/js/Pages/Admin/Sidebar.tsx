import { Link } from "@inertiajs/react";
import Logo from "../../../../public/assets/img/logo.png";
import { useEffect, useRef } from "react";
import {
    Banknote,
    BookOpen,
    CalendarDays,
    Contact,
    DatabaseBackupIcon,
    DoorOpen,
    FileBadge2,
    LayoutDashboardIcon,
    NotebookTabs,
    Package,
    PictureInPicture,
    SquareIcon,
    User,
    User2,
    UserCog,
} from "lucide-react";

interface SidebarProps {
    isOpen: any;
    closeSidebar: any;
}

const Sidebar = ({ isOpen, closeSidebar }: SidebarProps) => {
    const sidebarRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (
                isOpen &&
                window.innerWidth < 768 && // Assuming md breakpoint is 768px
                sidebarRef.current &&
                !sidebarRef.current.contains(event.target as Node)
            ) {
                closeSidebar();
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleOutsideClick);
        } else {
            document.removeEventListener("mousedown", handleOutsideClick);
        }

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, [isOpen, closeSidebar]);

    const sidebarClass = isOpen ? "-left-0" : "-left-64";
    return (
        <nav
            ref={sidebarRef}
            className={`transform z-50 duration-300 md:flex md:flex-col h-dvh w-64 top-0 fixed p-4 overflow-y-auto bg-gray-50 border-r lg:border-none border-gray-200 md:left-0 ${sidebarClass}`}
        >
            <div className="flex flex-col h-full ">
                <div className="flex justify-center flex-col gap-1 items-center">
                    <img className="size-12" src={Logo} alt="" />
                    <span className=" font-bold text-lg">E-Learning</span>
                </div>

                <ul className="mt-6 flex flex-col gap-2">
                    <li>
                        <Link
                            href="/admin/dashboard"
                            className={` items-center flex gap-2 group rounded-md p-2  hover:bg-blue-100 transform duration-150 ${
                                window.location.pathname === "/admin/dashboard"
                                    ? " text-blue-700 font-semibold  bg-blue-200"
                                    : " text-gray-400 hover:text-blue-400"
                            }`}
                        >
                            <span
                                className={`h-5 w-1 rounded-e-lg transform duration-150${
                                    window.location.pathname ===
                                    "/admin/dashboard"
                                        ? " bg-blue-700 group-hover:bg-blue-700/65"
                                        : " bg-transparent"
                                }`}
                            ></span>
                            <LayoutDashboardIcon className=" ml-4" />
                            <span className="text-xs">Dashboard</span>
                        </Link>
                    </li>{" "}
                    <li>
                        <Link
                            href={route("admin.kelas.index")}
                            className={` items-center flex gap-2 group rounded-md p-2  hover:bg-blue-100 transform duration-150 ${
                                window.location.pathname === "/admin/kelas"
                                    ? " text-blue-700 font-semibold  bg-blue-200"
                                    : " text-gray-400 hover:text-blue-400"
                            }`}
                        >
                            <span
                                className={`h-5 w-1 rounded-e-lg transform duration-150${
                                    window.location.pathname === "/admin/kelas"
                                        ? " bg-blue-700 group-hover:bg-blue-700/65"
                                        : " bg-transparent"
                                }`}
                            ></span>
                            <DoorOpen className=" ml-4" />
                            <span className="text-xs">Kelas</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            href={route("admin.siswa.index")}
                            method="get"
                            className={` items-center flex gap-2 group rounded-md p-2  hover:bg-blue-100 transform duration-150  ${
                                window.location.pathname === "/admin/siswa"
                                    ? " text-blue-700 font-semibold  bg-blue-200"
                                    : " text-gray-400 hover:text-blue-400"
                            }`}
                        >
                            <span
                                className={`h-5 w-1 rounded-e-lg transform duration-150${
                                    window.location.pathname === "/admin/siswa"
                                        ? " bg-blue-700 group-hover:bg-blue-700/65"
                                        : " bg-transparent"
                                }`}
                            ></span>
                            <User2 className="ml-4" />
                            <span className="text-xs">Siswa</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            href={route("admin.guru.index")}
                            className={` items-center flex gap-2 group rounded-md p-2  hover:bg-blue-100 transform duration-150 ${
                                window.location.pathname === "/admin/guru"
                                    ? " text-blue-700 font-semibold  bg-blue-200"
                                    : " text-gray-400 hover:text-blue-400"
                            }`}
                        >
                            <span
                                className={`h-5 w-1 rounded-e-lg transform duration-150${
                                    window.location.pathname === "/admin/guru"
                                        ? " bg-blue-700 group-hover:bg-blue-700/65"
                                        : " bg-transparent"
                                }`}
                            ></span>
                            <Contact className=" ml-4" />
                            <span className="text-xs">Guru</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            href={route("admin.mapel.index")}
                            className={` items-center flex gap-2 group rounded-md p-2  hover:bg-blue-100 transform duration-150 ${
                                window.location.pathname === "/admin/mapel"
                                    ? " text-blue-700 font-semibold  bg-blue-200"
                                    : " text-gray-400 hover:text-blue-400"
                            }`}
                        >
                            <span
                                className={`h-5 w-1 rounded-e-lg transform duration-150${
                                    window.location.pathname === "/admin/mapel"
                                        ? " bg-blue-700 group-hover:bg-blue-700/65"
                                        : " bg-transparent"
                                }`}
                            ></span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="ml-4"
                            >
                                <rect
                                    width="18"
                                    height="18"
                                    x="3"
                                    y="3"
                                    rx="2"
                                />
                                <path d="M7 7v10" />
                                <path d="M11 7v10" />
                                <path d="m15 7 2 10" />
                            </svg>
                            <span className="text-xs">Mata Pelajaran</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            href={route("admin.jadwal.index")}
                            className={` items-center flex gap-2 group rounded-md p-2  hover:bg-blue-100 transform duration-150 ${
                                window.location.pathname === "/admin/jadwal"
                                    ? " text-blue-700 font-semibold  bg-blue-200"
                                    : " text-gray-400 hover:text-blue-400"
                            }`}
                        >
                            <span
                                className={`h-5 w-1 rounded-e-lg transform duration-150${
                                    window.location.pathname === "/admin/jadwal"
                                        ? " bg-blue-700 group-hover:bg-blue-700/65"
                                        : " bg-transparent"
                                }`}
                            ></span>
                            <NotebookTabs className=" ml-4" />
                            <span className="text-xs">Mengajar</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            href={route("admin.schedule.index")}
                            className={` items-center flex gap-2 group rounded-md p-2  hover:bg-blue-100 transform duration-150 ${
                                window.location.pathname === "/admin/schedule"
                                    ? " text-blue-700 font-semibold  bg-blue-200"
                                    : " text-gray-400 hover:text-blue-400"
                            }`}
                        >
                            <span
                                className={`h-5 w-1 rounded-e-lg transform duration-150${
                                    window.location.pathname ===
                                    "/admin/schedule"
                                        ? " bg-blue-700 group-hover:bg-blue-700/65"
                                        : " bg-transparent"
                                }`}
                            ></span>
                            <CalendarDays className=" ml-4" />
                            <span className="text-xs">Jadwal</span>
                        </Link>
                    </li>{" "}
                    <li>
                        <Link
                            href={route("admin.admin.index")}
                            className={` items-center flex gap-2 group rounded-md p-2  hover:bg-blue-100 transform duration-150 ${
                                window.location.pathname === "/admin/admin"
                                    ? " text-blue-700 font-semibold  bg-blue-200"
                                    : " text-gray-400 hover:text-blue-400"
                            }`}
                        >
                            <span
                                className={`h-5 w-1 rounded-e-lg transform duration-150${
                                    window.location.pathname === "/admin/admin"
                                        ? " bg-blue-700 group-hover:bg-blue-700/65"
                                        : " bg-transparent"
                                }`}
                            ></span>
                            <UserCog className=" ml-4" />
                            <span className="text-xs">Admin</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            href={route("admin.backup.index")}
                            className={` items-center flex gap-2 group rounded-md p-2  hover:bg-blue-100 transform duration-150 ${
                                window.location.pathname === "/admin/backup"
                                    ? " text-blue-700 font-semibold  bg-blue-200"
                                    : " text-gray-400 hover:text-blue-400"
                            }`}
                        >
                            <span
                                className={`h-5 w-1 rounded-e-lg transform duration-150${
                                    window.location.pathname === "/admin/backup"
                                        ? " bg-blue-700 group-hover:bg-blue-700/65"
                                        : " bg-transparent"
                                }`}
                            ></span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="ml-4"
                            >
                                <rect
                                    width="18"
                                    height="18"
                                    x="3"
                                    y="3"
                                    rx="2"
                                />
                                <path d="M7 7v10" />
                                <path d="M11 7v10" />
                                <path d="m15 7 2 10" />
                            </svg>
                            <span className="text-xs">Backup</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Sidebar;
