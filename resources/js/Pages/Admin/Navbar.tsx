import { LogOut, User } from "lucide-react";
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
import { Link, usePage } from "@inertiajs/react";
import { PageProps } from "@/types";
interface NavbarProps {
    toggleSidebar: () => void;
}

const Navbar = ({ toggleSidebar }: NavbarProps) => {
    const { props } = usePage<PageProps>();

    return (
        <nav className=" w-full h-20 z-50 top-0 fixed bg-gray-50 shadow-sm border-b lg:border-none border-gray-200">
            <div className="md:ml-64 items-center h-full px-4 flex justify-between md:justify-end">
                <button onClick={toggleSidebar} className="block md:hidden">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        viewBox="0 0 20 20"
                    >
                        <path
                            fill="currentColor"
                            fillRule="evenodd"
                            d="M2 8a1 1 0 0 1 1-1h10.308a1 1 0 1 1 0 2H3a1 1 0 0 1-1-1m0-4a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2H3a1 1 0 0 1-1-1m0 8a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2H3a1 1 0 0 1-1-1m0 4a1 1 0 0 1 1-1h10.308a1 1 0 1 1 0 2H3a1 1 0 0 1-1-1"
                            clipRule="evenodd"
                        ></path>
                    </svg>
                </button>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <div className="flex items-center gap-4  cursor-pointer">
                            <img
                                className="w-9 h-9 rounded-full"
                                src={`https://api.dicebear.com/5.x/initials/svg?seed=${props.auth.user.name}`}
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
                                className="hidden md:block"
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
                            <Link href="/admin/profile">
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
            </div>
        </nav>
    );
};

export default Navbar;
