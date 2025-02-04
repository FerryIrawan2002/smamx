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
    const user = usePage<PageProps>().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            email: user.email,
        });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        patch(route("teacher.profile.update"), {
            preserveScroll: true,
        });
    };

    return (
        <section className={className}>
            <form onSubmit={submit} className=" space-y-6">
                <div>
                    <InputLabel htmlFor="name" value="Name" />

                    <TextInput
                        id="name"
                        className="mt-1 block w-full disabled:bg-gray-100 disabled:text-gray-500"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        required
                        isFocused
                        autoComplete="name"
                    />
                </div>
                <div>
                    <InputLabel htmlFor="name" value="NIP" />

                    <TextInput
                        id="name"
                        className="mt-1 block w-full disabled:bg-gray-100 disabled:text-gray-500"
                        value={user.teacher.nip}
                        disabled
                        required
                        isFocused
                        autoComplete="name"
                    />
                </div>
                <div>
                    <InputLabel htmlFor="name" value="No Telepon" />

                    <TextInput
                        id="name"
                        className="mt-1 block w-full disabled:bg-gray-100 disabled:text-gray-500"
                        value={user.teacher.phone_number}
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
                        value={user.teacher.gender}
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

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="text-sm mt-2 text-gray-800">
                            Your email address is unverified.
                            <Link
                                href={route("verification.send")}
                                method="post"
                                as="button"
                                className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Click here to re-send the verification email.
                            </Link>
                        </p>

                        {status === "verification-link-sent" && (
                            <div className="mt-2 font-medium text-sm text-green-600">
                                A new verification link has been sent to your
                                email address.
                            </div>
                        )}
                    </div>
                )}

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
