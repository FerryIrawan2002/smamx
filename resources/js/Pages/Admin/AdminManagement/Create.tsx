import InputTextLabel from "@/Components/InputTextLabel";
import { Button } from "@/Components/ui/button";
import { PageProps } from "@/types";
import { useForm, usePage } from "@inertiajs/react";
import { Key, Mail, Settings, User } from "lucide-react";
import { useState } from "react";
import { Input } from "@/Components/ui/input";

const Create: React.FC = () => {
    const { classes } = usePage<PageProps>().props;
    const { data, setData, errors, post, processing, reset } = useForm({
        name: "",
        email: "",
        password: "",
        role: "admin",
    });

    const [generatedPassword, setGeneratedPassword] = useState("");

    function handleSubmit(e: any) {
        e.preventDefault();
        post(route("admin.admin.store"), {
            onSuccess: () => reset("name", "email", "password"),
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
    return (
        <form
            className="flex flex-col gap-4 mt-4 lg:w-3/4"
            onSubmit={handleSubmit}
        >
            <InputTextLabel
                labelFor="name"
                labelText="Nama Admin"
                inputId="name"
                error={`${
                    errors && errors.name === undefined ? "" : errors.name
                }`}
                maxLength={150}
                inputProps={{
                    name: "name",
                    value: data.name,
                    type: "text",
                    placeholder: "Masukkan nama admin",
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

            <InputTextLabel
                labelFor="email"
                labelText="Email Admin"
                error={`${
                    errors && errors.email === undefined ? "" : errors.email
                }`}
                inputId="email"
                maxLength={150}
                inputProps={{
                    value: data.email,
                    name: "email",
                    type: "text",
                    placeholder: "Masukkan email admin",
                    onChange: (e) => {
                        setData({
                            ...data,
                            email: e.target.value,
                        });
                    },
                }}
            >
                <Mail className=" size-5 text-gray-600 absolute z-10 top-2.5  left-2.5" />
            </InputTextLabel>
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mt-2 w-full">
                <div className="md:mb-4 flex flex-col gap-2 w-full">
                    <label className="font-medium text-sm ">
                        Password Admin
                    </label>
                    <div className="flex items-center gap-2">
                        <div className="relative w-full">
                            <Key className=" size-5 text-gray-600 absolute z-10 top-2.5  left-2.5" />
                            <Input
                                type="text"
                                className="w-full px-4 py-2 pl-9"
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
