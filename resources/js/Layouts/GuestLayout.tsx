import NavbarGuest from "@/Components/NavbarGuest";
import React from "react";
import Wallpaper from "../../../public/assets/svg/wallpaper.svg";
import Wallpaper2 from "../../../public/assets/img/alat_tulis.png";
import Footer from "@/Components/Footer";
const GuestLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <main className=" relative">
            <NavbarGuest />
            <div
                className="fixed  -z-10 w-full h-screen top-0 bg-cover bg-no-repeat"
                style={{ backgroundImage: `url(${Wallpaper})` }}
            >
                <img
                    src={Wallpaper2}
                    className=" hidden lg:block fixed w-1/2 lg:-bottom-40 xl:-bottom-60 left-1/2 -translate-x-1/2 opacity-10"
                    alt=""
                />
            </div>
            {children}
            <Footer />
        </main>
    );
};

export default GuestLayout;
