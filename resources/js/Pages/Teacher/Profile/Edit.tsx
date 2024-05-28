import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";
import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import TeacherLayout from "@/Layouts/TeacherLayout";

export default function Edit({
    auth,
    mustVerifyEmail,
    status,
}: PageProps<{ mustVerifyEmail: boolean; status?: string }>) {
    return (
        <TeacherLayout>
            <Head title="Profile Guru" />
            <div className="text-2xl mb-4  md:text-4xl gap-2 flex flex-col font-bold">
                <span>Profile Guru</span>
                <span className="text-sm md:text-lg font-medium text-gray-500">
                    proses dan kegiatan yang dilakukan untuk mengelola Profile
                    Guru di lingkungan pendidikan
                </span>
            </div>
            <div className=" mb-20">
                <div className="mx-auto  space-y-8">
                    <div className=" bg-white p-4 border-gray-300 border  sm:rounded-lg">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                        />
                    </div>

                    <div className=" bg-white p-4 border border-gray-300  sm:rounded-lg">
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>
                </div>
            </div>
        </TeacherLayout>
    );
}
