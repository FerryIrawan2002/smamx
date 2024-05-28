import { useEffect, FormEventHandler, useState } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import WebLocalStorage from "web-local-storage";
export default function Login() {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });
    const els = WebLocalStorage();
    useEffect(() => {
        const storedEmail = els.get("rememberedEmail");
        const storedPassword = els.get("rememberedPassword");

        if (storedEmail && storedPassword) {
            setData({
                email: storedEmail,
                password: storedPassword,
                remember: true,
            });
        }
        return () => {
            reset("password");
        };
    }, []);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        if (data.remember) {
            els.set("rememberedEmail", data.email);
            els.set("rememberedPassword", data.password);
        } else {
            els.remove("rememberedEmail");
            els.remove("rememberedPassword");
        }

        post(route("login"));
    };

    const [showPassword, setShowPassword] = useState(false);

    return (
        <>
            <Head title="Log in" />
            <GuestLayout>
                <div className="min-h-screen  flex flex-col items-center justify-center ">
                    <div className="flex flex-col z-20  mb-44  px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-md w-full max-w-xl">
                        <h1 className="text-center text-2xl md:text-3xl lg:text-4xl font-semibold">
                            Login Dengan Akun Anda
                        </h1>
                        <h2 className="mt-1 text-sm md:text-lg text-center">
                            Pastikan akun anda telah terdaftar di aplikasi ini !
                        </h2>
                        <div className="mt-10">
                            <form id="form" onSubmit={submit}>
                                <div className="flex flex-col mb-6">
                                    <label
                                        htmlFor="username"
                                        className="mb-2  tracking-wider text-sm font-semibold "
                                    >
                                        Email
                                    </label>
                                    <div>
                                        <div className="relative">
                                            <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                                                <svg
                                                    className="h-6 w-6"
                                                    fill="none"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                                </svg>
                                            </div>
                                            <input
                                                id="email"
                                                type="email"
                                                name="email"
                                                onChange={(e) => {
                                                    setData({
                                                        ...data,
                                                        email: e.target.value,
                                                    });
                                                }}
                                                value={data.email}
                                                className="text-sm sm:text-base py-3 placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full focus:outline-none focus:border-blue-400"
                                                placeholder="JhonDoe@gmail.com"
                                            />
                                        </div>

                                        {errors.email && (
                                            <span className="text-red-600">
                                                {errors.email}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div className="flex flex-col mb-5">
                                    <label
                                        htmlFor="password"
                                        className="mb-2  tracking-wider text-sm font-semibold "
                                    >
                                        Password
                                    </label>
                                    <div>
                                        <div className="relative">
                                            <div className="relative">
                                                <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                                                    <span>
                                                        <svg
                                                            className="h-6 w-6"
                                                            fill="none"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            viewBox="0 0 24 24"
                                                            stroke="currentColor"
                                                        >
                                                            <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                                        </svg>
                                                    </span>
                                                </div>
                                                <input
                                                    id="password"
                                                    type={
                                                        showPassword
                                                            ? "text"
                                                            : "password"
                                                    }
                                                    name="password"
                                                    onChange={(e) => {
                                                        setData({
                                                            ...data,
                                                            password:
                                                                e.target.value,
                                                        });
                                                    }}
                                                    value={data.password}
                                                    className="text-sm sm:text-base py-3 placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full  focus:outline-none focus:border-blue-400"
                                                    placeholder="Password"
                                                />
                                                <button
                                                    className="absolute right-4 top-3"
                                                    type="button"
                                                    onClick={() =>
                                                        setShowPassword(
                                                            !showPassword
                                                        )
                                                    }
                                                >
                                                    {showPassword ? (
                                                        <EyeIcon className="text-gray-400" />
                                                    ) : (
                                                        <EyeOffIcon className="text-gray-400" />
                                                    )}
                                                </button>
                                            </div>
                                        </div>

                                        {errors.password && (
                                            <span className="text-red-600">
                                                {errors.password}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 mb-6">
                                    <input
                                        type="checkbox"
                                        id="remember"
                                        className="size-5 rounded-md focus:outline-none focus:ring-0 cursor-pointer"
                                        onChange={(e) => {
                                            setData({
                                                ...data,
                                                remember: e.target.checked,
                                            });
                                        }}
                                        checked={data.remember}
                                    />
                                    <label
                                        htmlFor="remember"
                                        className=" cursor-pointer"
                                    >
                                        Ingat saya
                                    </label>
                                </div>
                                <div className="flex w-full">
                                    <button
                                        disabled={processing}
                                        type="submit"
                                        className="w-full mt-2 bg-red-500 hover:bg-red-600 rounded-lg text-white font-bold py-3 px-4  focus:outline-none focus:shadow-outline"
                                    >
                                        Sign in
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </GuestLayout>
        </>
    );
}
