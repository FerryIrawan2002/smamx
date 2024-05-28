import { Link, usePage } from "@inertiajs/react";
import Logo from "../../../public/assets/img/logo.png";
import { Book, BookUser, Home, LogOut, Menu, Pen, User } from "lucide-react";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/Components/ui/sheet";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { PageProps } from "@/types";

interface NavbarTeacherProps {
    urlLearn?: string;
    urlTask?: string;
    urlExam?: string;
    urlClass?: string;
}
const NavbarTeacher = ({
    urlLearn,
    urlTask,
    urlExam,
    urlClass,
}: NavbarTeacherProps) => {
    const { props } = usePage<PageProps>();

    return (
        <nav className="w-full  py-4 px-4 ">
            <div className="flex backdrop-blur-[2px] items-center justify-between bg-white/70 w-full pt-5 px-2 sm:py-2 sm:px-8 sm:border rounded-full">
                <Link
                    href="/guru/dashboard"
                    className="flex items-center gap-2 sm:gap-3"
                >
                    <img
                        loading="lazy"
                        className=" w-12 h-12 sm:w-16 sm:h-16"
                        src={Logo}
                        alt=""
                    />
                    <div className="flex flex-col font-bold text-xs sm:text-lg">
                        <span>SMA MUHAMMADIYAH 10</span>
                        <span>SURABAYA</span>
                    </div>
                </Link>
                {window.location.pathname.startsWith("/guru/dashboard/") ||
                window.location.pathname.startsWith("/guru/tugas") ||
                window.location.pathname.startsWith("/guru/ujian") ||
                window.location.pathname.startsWith("/guru/kelas") ? (
                    <ul className="hidden  font-semibold lg:flex items-center gap-10">
                        <li>
                            <Link
                                href={"/guru/dashboard"}
                                className={
                                    window.location.pathname ===
                                    "/guru/dashboard"
                                        ? "text-red-500"
                                        : "text-black-500"
                                }
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                href={`/guru/dashboard/${
                                    urlLearn || urlTask || urlExam || urlClass
                                }`}
                                className={
                                    window.location.pathname.startsWith(
                                        `/guru/dashboard/${
                                            urlLearn ||
                                            urlTask ||
                                            urlExam ||
                                            urlClass
                                        }`
                                    )
                                        ? "text-red-500"
                                        : "text-black-500"
                                }
                            >
                                Materi
                            </Link>
                        </li>
                        <li>
                            <Link
                                href={`/guru/tugas/${
                                    urlLearn || urlTask || urlExam || urlClass
                                }`}
                                className={
                                    window.location.pathname.startsWith(
                                        `/guru/tugas/${
                                            urlLearn ||
                                            urlTask ||
                                            urlExam ||
                                            urlClass
                                        }`
                                    )
                                        ? "text-red-500"
                                        : "text-black-500"
                                }
                            >
                                Tugas
                            </Link>
                        </li>
                        <li>
                            <Link
                                href={`/guru/ujian/${
                                    urlLearn || urlTask || urlExam || urlClass
                                }`}
                                className={
                                    window.location.pathname.startsWith(
                                        `/guru/ujian/${
                                            urlLearn ||
                                            urlTask ||
                                            urlExam ||
                                            urlClass
                                        }`
                                    )
                                        ? "text-red-500"
                                        : "text-black-500"
                                }
                            >
                                Ujian
                            </Link>
                        </li>{" "}
                        <li>
                            <Link
                                href={`/guru/kelas/${
                                    urlLearn || urlTask || urlExam || urlClass
                                }`}
                                className={
                                    window.location.pathname.startsWith(
                                        `/guru/kelas/${
                                            urlLearn ||
                                            urlTask ||
                                            urlExam ||
                                            urlClass
                                        }`
                                    )
                                        ? "text-red-500"
                                        : "text-black-500"
                                }
                            >
                                Kelas
                            </Link>
                        </li>
                    </ul>
                ) : null}

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <div className=" items-center gap-2  cursor-pointer hidden lg:flex">
                            <img
                                className="w-9 h-9 rounded-full object-cover"
                                loading="lazy"
                                src={
                                    window.location.origin +
                                    "/storage/" +
                                    props.auth.user.teacher.photo
                                }
                                alt=""
                            />
                            <div className=" flex-col w-auto hidden md:flex">
                                <span className=" text-sm font-semibold line-clamp-1">
                                    {props.auth.user.name}
                                </span>
                                <span className="text-xs font-medium text-gray-400 ">
                                    {props.auth.user.role}
                                </span>
                            </div>
                            <svg
                                className="hidden md:block ml-2"
                                xmlns="http://www.w3.org/2000/svg"
                                width={24}
                                height={24}
                                viewBox="0 0 24 24"
                            >
                                <path
                                    fill="none"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="m7 10l5 5m0 0l5-5"
                                ></path>
                            </svg>
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 mt-2 bg-white">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <Link href="/guru/profile">
                                <DropdownMenuItem className=" cursor-pointer">
                                    <User className="mr-2 h-4 w-4" />
                                    <span>Profile</span>
                                </DropdownMenuItem>
                            </Link>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <Link href={route("logout")} method="post">
                            <DropdownMenuItem className=" cursor-pointer">
                                <LogOut className="mr-2 h-4 w-4" />
                                <span>Log out</span>
                            </DropdownMenuItem>
                        </Link>
                    </DropdownMenuContent>
                </DropdownMenu>
                {window.location.pathname.startsWith("/guru/dashboard/") && (
                    <Sheet>
                        <SheetTrigger asChild>
                            <button className="lg:hidden">
                                <Menu className="w-6 h-6 text-gray-500" />
                            </button>
                        </SheetTrigger>
                        <SheetContent className=" w-52">
                            <SheetHeader className="flex flex-col gap-5 h-full">
                                <SheetTitle className=" text-start">
                                    Menu navigasi
                                </SheetTitle>
                                <div className=" flex flex-col justify-between h-full">
                                    <ul className=" flex flex-col gap-6 text-start">
                                        <li className="flex items-center gap-2">
                                            <Home className="size-5" />
                                            <span>Home</span>
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <Pen className="size-5" />
                                            <span>Tugas</span>
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <Book className="size-5" />
                                            <span>Materi</span>
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <BookUser className="size-5" />
                                            <span>Ujian</span>
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <User className="size-5" />
                                            <span>Profile</span>
                                        </li>
                                    </ul>
                                    <Link
                                        href={route("logout")}
                                        method="post"
                                        className="w-full justify-center flex items-center gap-2 bg-red-500 text-white rounded-lg py-2"
                                    >
                                        <LogOut className="size-5" />
                                        <span>Logout</span>
                                    </Link>
                                </div>
                            </SheetHeader>
                            <div className="grid gap-4 py-4"></div>
                            <SheetFooter>
                                <SheetClose asChild></SheetClose>
                            </SheetFooter>
                        </SheetContent>
                    </Sheet>
                )}
            </div>
        </nav>
    );
};

export default NavbarTeacher;
