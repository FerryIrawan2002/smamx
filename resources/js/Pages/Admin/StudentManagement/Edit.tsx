import { Button } from "@/Components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog";
import { PageProps } from "@/types";
import { useForm, usePage } from "@inertiajs/react";
import { BookUser, CalendarDays, Mail, Pen, Phone, User } from "lucide-react";
import { useEffect, useState } from "react";
import InputTextLabelEdit from "@/Components/InputTextLabelEdit";
import GenderSelector from "@/Components/GenderInput";

interface EditProps {
    student: any;
}

const Edit = ({ student }: EditProps) => {
    const { classes } = usePage<PageProps>().props;
    const [showModal, setShowModal] = useState(false);

    const { data, setData, errors, put, processing, reset } = useForm({
        name: student.user.name,
        email: student.user.email,
        gender: student.gender,
        phone_number: student.phone_number,
        class_room_id: student.class_room_id,
        entry_year: student.entry_year,
        nisn: student.nisn,
        status: student.user.status,
    });

    useEffect(() => {
        setData({
            ...data,
            name: student.user.name,
            email: student.user.email,
            gender: student.gender,
            phone_number: student.phone_number,
            class_room_id: student.class_room_id,
            entry_year: student.entry_year,
            nisn: student.nisn,
            status: student.user.status,
        });
    }, [student]);

    function handleSubmit(e: any) {
        e.preventDefault();
        put(route("admin.siswa.update", student.user.id), {
            onSuccess: () => {
                reset();
                setShowModal(false);
            },
        });
    }

    return (
        <>
            <Dialog open={showModal} onOpenChange={setShowModal}>
                <DialogTrigger asChild>
                    <button type="button" onClick={() => setShowModal(true)}>
                        <Pen className="text-blue-500 hover:text-blue-600" />
                    </button>
                </DialogTrigger>
                <DialogContent className="max-w-[340px] sm:max-w-[425px] h-[80vh]  rounded-lg overflow-auto bg-white ">
                    <DialogHeader>
                        <DialogTitle>Update Data Siswa</DialogTitle>
                    </DialogHeader>
                    <div className=" bg-white rounded-lg">
                        <form
                            className="flex flex-col gap-4 mt-6 text-sm"
                            onSubmit={handleSubmit}
                        >
                            <InputTextLabelEdit
                                labelFor="nisn"
                                labelText="Nomor Induk Siswa Nasional (NISN)"
                                inputId="nisn"
                                error={`${
                                    errors && errors.nisn === undefined
                                        ? ""
                                        : errors.nisn
                                }`}
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
                            </InputTextLabelEdit>
                            <InputTextLabelEdit
                                labelFor="name"
                                labelText="Nama Siswa"
                                inputId="name"
                                error={`${
                                    errors && errors.name === undefined
                                        ? ""
                                        : errors.name
                                }`}
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
                            </InputTextLabelEdit>

                            <InputTextLabelEdit
                                labelFor="email"
                                labelText="Email Siswa"
                                error={`${
                                    errors && errors.email === undefined
                                        ? ""
                                        : errors.email
                                }`}
                                inputId="email"
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
                                }}
                            >
                                <Mail className=" size-5 text-gray-600 absolute z-10 top-2.5  left-2.5" />
                            </InputTextLabelEdit>
                            <div className="mb-4 flex flex-col gap-2">
                                <label
                                    htmlFor="class_room_id"
                                    className="font-medium text-sm "
                                >
                                    kelas
                                </label>
                                <div className="flex items-center gap-4">
                                    <select
                                        className="w-full border-gray-400 rounded-lg"
                                        name="class_room_id"
                                        id="class_room_id"
                                        value={data.class_room_id}
                                        onChange={(e) => {
                                            setData({
                                                ...data,
                                                class_room_id: e.target.value,
                                            });
                                        }}
                                    >
                                        {classes.map((item, index) => {
                                            return (
                                                <option
                                                    value={item.id}
                                                    key={index}
                                                >
                                                    {item.class_name}
                                                </option>
                                            );
                                        })}
                                    </select>
                                </div>
                            </div>

                            <GenderSelector
                                className="mb-4"
                                selectedGender={data.gender}
                                onChange={(e) =>
                                    setData({ ...data, gender: e.target.value })
                                }
                            />
                            <InputTextLabelEdit
                                labelFor="phone_number"
                                labelText="No. Hp Siswa"
                                error={`${
                                    errors && errors.phone_number === undefined
                                        ? ""
                                        : errors.phone_number
                                }`}
                                inputId="phone_number"
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
                            </InputTextLabelEdit>
                            <InputTextLabelEdit
                                labelFor="entry_year"
                                labelText="Tahun masuk siswa"
                                error={`${
                                    errors && errors.entry_year === undefined
                                        ? ""
                                        : errors.entry_year
                                }`}
                                inputId="entry_year"
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
                            </InputTextLabelEdit>
                            <div className="mb-4 flex flex-col gap-2">
                                <label
                                    htmlFor="status"
                                    className="font-semibold text-sm"
                                >
                                    Status
                                </label>
                                <div className="flex items-center gap-2">
                                    <select
                                        name="status"
                                        className="w-full px-4 py-2 rounded-md border-gray-400"
                                        id="status"
                                        value={data.status}
                                        onChange={(e) => {
                                            setData("status", e.target.value);
                                        }}
                                    >
                                        <option value={1}>Aktif</option>
                                        <option value={0}>Tidak Aktif</option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex justify-end gap-2 mt-4 items-center">
                                <Button
                                    onClick={() => reset()}
                                    variant="outline"
                                    type="button"
                                    className="w-32"
                                >
                                    Reset
                                </Button>
                                <Button
                                    disabled={processing}
                                    type="submit"
                                    variant={"blue"}
                                    className="w-32"
                                >
                                    Simpan
                                </Button>
                            </div>
                        </form>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default Edit;
