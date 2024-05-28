import { Link } from "@inertiajs/react";
import Logo from "../../../public/assets/img/logo.png";
const NavbarGuest = () => {
    return (
        <nav className="w-full  py-4 px-4 ">
            <div className="flex backdrop-blur-[2px] items-center justify-between bg-white/70 w-full pt-5 px-2 sm:py-2 sm:px-8 sm:border rounded-full">
                <Link href="/" className="flex items-center gap-2 sm:gap-3">
                    <img
                        className=" w-12 h-12 sm:w-16 sm:h-16"
                        src={Logo}
                        alt=""
                    />
                    <div className="flex flex-col font-bold text-xs sm:text-lg">
                        <span>SMA MUHAMMADIYAH 10</span>
                        <span>SURABAYA</span>
                    </div>
                </Link>
            </div>
        </nav>
    );
};

export default NavbarGuest;
