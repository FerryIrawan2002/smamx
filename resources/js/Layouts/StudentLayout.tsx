import React from "react";
import Wallpaper from "../../../public/assets/svg/wallpaper.svg";
import Wallpaper2 from "../../../public/assets/img/alat_tulis.png";
import Footer from "@/Components/Footer";
import NavbarStudent from "@/Components/NavbarStudent";

interface StudentLayoutProps {
    children: React.ReactNode;
    urlLearn?: string;
    urlTask?: string;
    urlExam?: string;
}
const StudentLayout = ({
    children,
    urlLearn,
    urlTask,
    urlExam,
}: StudentLayoutProps) => {
    return (
        <>
            <main className=" relative">
                <NavbarStudent
                    urlLearn={urlLearn || ""}
                    urlTask={urlTask || ""}
                    urlExam={urlExam || ""}
                />
                <div
                    className="  -z-10 w-full fixed h-screen top-0 bg-cover bg-no-repeat"
                    style={{ backgroundImage: `url(${Wallpaper})` }}
                ></div>
                <div className="mt-4 md:mt-6 lg:mt-8 mx-6 md:mx-10 lg:mx-20">
                    {children}
                </div>
                <Footer />
            </main>
        </>
    );
};

export default StudentLayout;
