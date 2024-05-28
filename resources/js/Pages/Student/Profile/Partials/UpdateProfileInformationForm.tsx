import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Link, useForm, usePage } from "@inertiajs/react";
import { Transition } from "@headlessui/react";
import { FormEventHandler } from "react";
import { PageProps } from "@/types";

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = "",
}: {
    mustVerifyEmail: boolean;
    status?: string;
    className?: string;
}) {
    const { user } = usePage<PageProps>().props.auth;

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            email: user.email,
        });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        patch(route("student.profile.update"));
    };

    return (
        <section className={className}>
            {" "}
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    Informasi Profile{" "}
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                    Perbarui informasi profil dan alamat email akun Anda.
                </p>
            </header>
            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="name" value="Nama Siswa" />

                    <TextInput
                        id="name"
                        className="mt-1 block w-full disabled:bg-gray-100 disabled:text-gray-500"
                        value={data.name}
                        disabled
                        required
                        isFocused
                        autoComplete="name"
                    />

                    <InputError className="mt-2" message={errors.name} />
                </div>
                <div>
                    <InputLabel htmlFor="name" value="Nisn" />

                    <TextInput
                        id="name"
                        className="mt-1 block w-full disabled:bg-gray-100 disabled:text-gray-500"
                        value={user.student.nisn}
                        disabled
                        required
                        isFocused
                        autoComplete="name"
                    />
                </div>
                <div>
                    <InputLabel htmlFor="name" value="Jenis Kelamin" />

                    <TextInput
                        id="name"
                        className="mt-1 block w-full disabled:bg-gray-100 disabled:text-gray-500"
                        value={user.student.gender}
                        disabled
                        required
                        isFocused
                        autoComplete="name"
                    />
                </div>
                <div>
                    <InputLabel htmlFor="name" value="Tahun Masuk" />

                    <TextInput
                        id="name"
                        className="mt-1 block w-full disabled:bg-gray-100 disabled:text-gray-500"
                        value={user.student.entry_year}
                        disabled
                        required
                        isFocused
                        autoComplete="name"
                    />
                </div>
                <div>
                    <InputLabel htmlFor="name" value="Nomor Telepon" />

                    <TextInput
                        id="name"
                        className="mt-1 block w-full disabled:bg-gray-100 disabled:text-gray-500"
                        value={user.student.phone_number}
                        disabled
                        required
                        isFocused
                        autoComplete="name"
                    />
                </div>
                <div>
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        className="mt-1 block w-full"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                        required
                        autoComplete="username"
                    />

                    <InputError className="mt-2" message={errors.email} />
                </div>

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Save</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">Saved.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
