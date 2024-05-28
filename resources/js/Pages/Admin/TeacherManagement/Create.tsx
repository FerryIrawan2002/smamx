import InputTextLabel from "@/Components/InputTextLabel";
import { Button } from "@/Components/ui/button";
import { useForm } from "@inertiajs/react";
import {
    BookUser,
    GraduationCap,
    Key,
    Mail,
    Phone,
    Settings,
    User,
} from "lucide-react";
import { useCallback, useState } from "react";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import FileInput from "@/Components/FileInput";
import GenderSelector from "@/Components/GenderInput";

const Create: React.FC = () => {
    const { data, setData, errors, post, processing, reset } = useForm({
        name: "",
        email: "",
        password: "",
        role: "guru",
        gender: "Laki-laki",
        phone_number: "",
        nip: "",
        photo: "",
        education: "",
    });

    const [generatedPassword, setGeneratedPassword] = useState("");

    function handleSubmit(e: any) {
        e.preventDefault();
        post(route("admin.guru.store"), {
            forceFormData: true,
            onSuccess: () =>
                reset(
                    "name",
                    "email",
                    "phone_number",
                    "nip",
                    "password",
                    "photo",
                    "education"
                ),
            preserveScroll: true,
        });
    }

    function generatePassword() {
        const randomPassword = Math.random().toString(36).slice(-8);
        setGeneratedPassword(randomPassword);
        setData({
            ...data,
            password: randomPassword,
        });
    }

    const handleDrop = useCallback(
        (acceptedFiles: any) => {
            setData("photo", acceptedFiles[0]);
        },
        [setData]
    );
    return (
        <form
            className="flex flex-col gap-4 mt-4 lg:w-3/4"
            onSubmit={handleSubmit}
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputTextLabel
                    labelFor="nip"
                    labelText="Nomor Induk Pegawai (NIP)"
                    inputId="nip"
                    error={`${
                        errors && errors.nip === undefined ? "" : errors.nip
                    }`}
                    maxLength={20}
                    inputProps={{
                        name: "nip",
                        value: data.nip,
                        type: "text",
                        placeholder: "Masukkan nip guru",
                        onChange: (e) => {
                            setData({
                                ...data,
                                nip: e.target.value,
                            });
                        },
                    }}
                >
                    <BookUser className=" size-5 text-gray-600 absolute z-10 top-2.5  left-2.5" />
                </InputTextLabel>
                <InputTextLabel
                    labelFor="name"
                    labelText="Nama Guru"
                    inputId="name"
                    error={`${
                        errors && errors.name === undefined ? "" : errors.name
                    }`}
                    maxLength={150}
                    inputProps={{
                        name: "name",
                        value: data.name,
                        type: "text",
                        placeholder: "Masukkan nama Guru",
                        onChange: (e) => {
                            setData({
                                ...data,
                                name: e.target.value,
                            });
                        },
                    }}
                >
                    <User className=" size-5 text-gray-600 absolute z-10 top-2.5  left-2.5" />
                </InputTextLabel>
            </div>

            <InputTextLabel
                labelFor="email"
                labelText="Email Guru"
                error={`${
                    errors && errors.email === undefined ? "" : errors.email
                }`}
                inputId="email"
                maxLength={150}
                inputProps={{
                    value: data.email,
                    name: "email",
                    type: "text",
                    placeholder: "Masukkan email Guru",
                    onChange: (e) => {
                        setData({
                            ...data,
                            email: e.target.value,
                        });
                    },
                    onBlur: (e) => {
                        const emailValue = e.target.value;
                        if (emailValue && !emailValue.includes("@")) {
                            setData({
                                ...data,
                                email: `${emailValue}@gmail.com`,
                            });
                        }
                    },
                }}
            >
                <Mail className=" size-5 text-gray-600 absolute z-10 top-2.5  left-2.5" />
            </InputTextLabel>

            <GenderSelector
                className="mb-4"
                selectedGender={data.gender}
                onChange={(e) => setData({ ...data, gender: e.target.value })}
            />
            <InputTextLabel
                labelFor="phone_number"
                labelText="No. Hp Guru"
                error={`${
                    errors && errors.phone_number === undefined
                        ? ""
                        : errors.phone_number
                }`}
                inputId="phone_number"
                maxLength={20}
                inputProps={{
                    value: data.phone_number,
                    name: "phone_number",
                    type: "text",
                    placeholder: "Masukkan no. hp Guru",
                    onChange: (e) => {
                        setData({
                            ...data,
                            phone_number: e.target.value,
                        });
                    },
                }}
            >
                <Phone className=" size-5 text-gray-600 absolute z-10 top-2.5  left-2.5" />
            </InputTextLabel>
            <InputTextLabel
                labelFor="education"
                labelText="Pendidikan Guru"
                error={`${
                    errors && errors.education === undefined
                        ? ""
                        : errors.education
                }`}
                inputId="education"
                maxLength={100}
                inputProps={{
                    value: data.education,
                    name: "education",
                    type: "text",
                    placeholder: "Masukkan pendidikan guru",
                    onChange: (e) => {
                        setData({
                            ...data,
                            education: e.target.value,
                        });
                    },
                }}
            >
                <GraduationCap className=" size-5 text-gray-600 absolute z-10 top-2.5  left-2.5" />
            </InputTextLabel>
            <div className="flex flex-col  gap-3">
                <div className="flex items-center gap-2">
                    {" "}
                    <Label>Upload Foto</Label>
                    <span className="text-sm bg-blue-200 px-3 py-1 rounded-xl text-blue-600 font-semibold">
                        wajib
                    </span>
                </div>
                <FileInput onDrop={handleDrop} accept="image/*" />
                {errors.photo && (
                    <div className="mt-2">
                        <span className="text-red-500 font-normal bg-red-50 py-2 px-6 border-red-300">
                            {errors.photo}
                        </span>
                    </div>
                )}
            </div>

            <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mt-4 w-full">
                <div className="md:mb-4 flex flex-col gap-2 w-full">
                    <div className="flex items-center gap-2">
                        <label className="font-medium text-sm ">
                            Password Guru
                        </label>
                        <span className="text-sm bg-blue-200 px-3 py-1 rounded-xl text-blue-600 font-semibold">
                            wajib
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="relative w-full">
                            <Key className=" size-5 text-gray-600 absolute z-10 top-2.5  left-2.5" />
                            <Input
                                type="text"
                                className="w-full px-4 py-2  pl-9"
                                name="password"
                                value={data.password || generatedPassword}
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                            />
                        </div>
                        <Button
                            type="button"
                            className="bg-blue-500 text-white flex items-center gap-2 hover:bg-blue-600"
                            onClick={generatePassword}
                        >
                            {" "}
                            <Settings className=" size-5" />
                            Generated
                        </Button>
                    </div>
                    <div className="mt-2">
                        {errors && errors.password && (
                            <span className="text-red-500 mt-2 text-sm font-normal bg-red-50 py-2 px-6 border-red-300">
                                {errors.password}
                            </span>
                        )}
                    </div>
                </div>
            </div>

            <div className="flex justify-end gap-2 mt-4 items-center">
                <Button variant="outline" className="w-32">
                    Reset
                </Button>
                <Button
                    variant={"blue"}
                    disabled={processing}
                    type="submit"
                    className="w-32"
                >
                    Simpan
                </Button>
            </div>
        </form>
    );
};

export default Create;
