import InputTextLabel from "@/Components/InputTextLabel";
import { Button } from "@/Components/ui/button";
import { PageProps } from "@/types";
import { useForm, usePage } from "@inertiajs/react";
import {
    BookUser,
    CalendarDays,
    Key,
    Mail,
    Phone,
    Settings,
    User,
} from "lucide-react";
import { useState } from "react";
import { Input } from "@/Components/ui/input";
import SelectOption from "@/Components/SelectOption";
import GenderSelector from "@/Components/GenderInput";

const Create: React.FC = () => {
    const { classes } = usePage<PageProps>().props;
    const { data, setData, errors, post, processing, reset } = useForm({
        name: "",
        email: "",
        password: "",
        role: "siswa",
        gender: "perempuan",
        phone_number: "",
        nisn: "",
        entry_year: "",
        class_room_id: "",
    });

    const [generatedPassword, setGeneratedPassword] = useState("");

    function handleSubmit(e: any) {
        e.preventDefault();
        post(route("admin.siswa.store"), {
            onSuccess: () =>
                reset(
                    "name",
                    "email",
                    "phone_number",
                    "nisn",
                    "password",
                    "class_room_id"
                ),
            preserveScroll: true,
        });
    }

    function generatePassword() {
        const randomPassword = Math.random().toString(36).slice(-10);
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputTextLabel
                    labelFor="nisn"
                    labelText="Nomor Induk Siswa Nasional (NISN)"
                    inputId="nisn"
                    error={`${
                        errors && errors.nisn === undefined ? "" : errors.nisn
                    }`}
                    maxLength={20}
                    inputProps={{
                        name: "nisn",
                        value: data.nisn,
                        type: "text",
                        placeholder: "Masukkan nisn siswa",
                        onChange: (e) => {
                            setData({
                                ...data,
                                nisn: e.target.value,
                            });
                        },
                    }}
                >
                    <BookUser className=" size-5 text-gray-600 absolute z-10 top-2.5  left-2.5" />
                </InputTextLabel>
                <InputTextLabel
                    labelFor="name"
                    labelText="Nama Siswa"
                    inputId="name"
                    error={`${
                        errors && errors.name === undefined ? "" : errors.name
                    }`}
                    maxLength={150}
                    inputProps={{
                        name: "name",
                        value: data.name,
                        type: "text",
                        placeholder: "Masukkan nama siswa",
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
                labelText="Email Siswa"
                error={`${
                    errors && errors.email === undefined ? "" : errors.email
                }`}
                inputId="email"
                maxLength={150}
                inputProps={{
                    value: data.email,
                    name: "email",
                    type: "text",
                    placeholder: "Masukkan email siswa",
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
                <Mail className="size-5 text-gray-600 absolute z-10 top-2.5 left-2.5" />
            </InputTextLabel>

            <SelectOption
                optionName="Pilih Kelas"
                htmlFor="class_room_id"
                labelName="Kelas"
                optionMap={classes.map((item, index) => {
                    return (
                        <option value={item.id} key={index}>
                            {item.class_name}
                        </option>
                    );
                })}
                errors={errors.class_room_id}
                selectOptionProps={{
                    name: "class_room_id",
                    value: data.class_room_id,
                    onChange: (e: any) => {
                        setData({
                            ...data,
                            class_room_id: e.target.value,
                        });
                    },
                }}
            />
            <GenderSelector
                className="mb-4"
                selectedGender={data.gender}
                onChange={(e) => setData({ ...data, gender: e.target.value })}
            />
            <InputTextLabel
                labelFor="phone_number"
                labelText="No. Hp Siswa"
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
                    placeholder: "Masukkan no. hp siswa",
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
                labelFor="entry_year"
                labelText="Tahun masuk siswa"
                error={`${
                    errors && errors.entry_year === undefined
                        ? ""
                        : errors.entry_year
                }`}
                inputId="entry_year"
                maxLength={4}
                inputProps={{
                    value: data.entry_year,
                    name: "entry_year",
                    type: "text",
                    placeholder: "Masukkan tahun masuk siswa",
                    onChange: (e) => {
                        setData({
                            ...data,
                            entry_year: e.target.value,
                        });
                    },
                }}
            >
                <CalendarDays className=" size-5 text-gray-600 absolute z-10 top-2.5  left-2.5" />
            </InputTextLabel>
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4 w-full">
                <div className="md:mb-4 flex flex-col gap-2 w-full">
                    <label className="font-medium text-sm ">
                        Password Siswa
                    </label>
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
