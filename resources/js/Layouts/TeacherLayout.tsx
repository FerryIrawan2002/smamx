import React from "react";
import Wallpaper from "../../../public/assets/svg/wallpaper.svg";
import Footer from "@/Components/Footer";
import NavbarTeacher from "@/Components/NavbarTeacher";
interface TeacherLayoutProps {
    children: React.ReactNode;
    urlLearn?: string;
    urlTask?: string;
    urlExam?: string;
    urlClass?: string;
}
const TeacherLayout = ({
    children,
    urlLearn,
    urlTask,
    urlExam,
    urlClass,
}: TeacherLayoutProps) => {
    return (
        <>
            <main className=" relative">
                <NavbarTeacher
                    urlLearn={urlLearn || ""}
                    urlTask={urlTask || ""}
                    urlExam={urlExam || ""}
                    urlClass={urlClass || ""}
                />
                <div
                    className="-z-10 w-full fixed h-screen top-0 bg-cover bg-no-repeat"
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

export default TeacherLayout;
