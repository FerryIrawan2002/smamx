import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";
import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import AdminLayout from "@/Layouts/AdminLayout";

export default function Edit({
    auth,
    mustVerifyEmail,
    status,
}: PageProps<{ mustVerifyEmail: boolean; status?: string }>) {
    return (
        <AdminLayout head="Profile">
            <div className="text-2xl md:text-4xl flex flex-col font-bold">
                <span>Profile Admin</span>
                <span className="text-sm md:text-lg font-medium text-gray-500">
                    proses dan kegiatan yang dilakukan untuk mengelola Profile
                    Admin di lingkungan pendidikan
                </span>
            </div>
            <div className="mt-10">
                <div className="mx-auto  space-y-8">
                    <div className=" bg-white  sm:rounded-lg">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                        />
                    </div>

                    <div className=" bg-white  sm:rounded-lg">
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
