import GenderSelector from "@/Components/GenderInput";
import InputTextLabelEdit from "@/Components/InputTextLabelEdit";
import { Button } from "@/Components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog";
import { Input } from "@/Components/ui/input";
import { router, useForm } from "@inertiajs/react";
import {
    GraduationCap,
    Mail,
    NotebookPen,
    Pen,
    Phone,
    User,
} from "lucide-react";
import { useEffect, useState } from "react";

interface EditProps {
    teacher: any;
}

const Edit = ({ teacher }: EditProps) => {
    const [showModal, setShowModal] = useState(false); // State untuk mengontrol modal
    const { data, setData, errors, processing, reset } = useForm({
        nip: teacher.teacher.nip,
        name: teacher.name,
        email: teacher.email,
        gender: teacher.teacher.gender,
        phone_number: teacher.teacher.phone_number,
        education: teacher.teacher.education,
        status: teacher.status,
        photo: teacher.teacher.photo,
    });
    const [previewImage, setPreviewImage] = useState(null);

    const handleFileChange = (e: any) => {
        const file = e.target.files[0];
        setData({ ...data, photo: file });
        const reader: any = new FileReader();
        reader.onloadend = () => {
            setPreviewImage(reader.result);
        };
        if (file) {
            reader.readAsDataURL(file);
        } else {
            setPreviewImage(null);
        }
    };
    useEffect(() => {
        setData({
            ...data,
            nip: teacher.teacher.nip,
            name: teacher.name,
            email: teacher.email,
            gender: teacher.teacher.gender,
            phone_number: teacher.teacher.phone_number,
            education: teacher.teacher.education,
            status: teacher.status,
            photo: teacher.teacher.photo,
        });
    }, [teacher]);

    const submit = (e: any) => {
        e.preventDefault();
        router.post(route("admin.guru.update", teacher.id), {
            ...data,
            _method: "put",
            forceFormData: true,
        });
    };

    return (
        <>
            <Dialog open={showModal} onOpenChange={setShowModal}>
                <DialogTrigger asChild>
                    <button type="button" onClick={() => setShowModal(true)}>
                        <Pen className="text-blue-500 hover:text-blue-600" />
                    </button>
                </DialogTrigger>
                <DialogContent className=" max-w-[340px] sm:max-w-[425px] h-[80vh]  rounded-lg overflow-auto bg-white">
                    <DialogHeader>
                        <DialogTitle>Update Data Guru</DialogTitle>
                    </DialogHeader>
                    <div className="bg-white mt-2">
                        <form name="createForm" onSubmit={submit}>
                            <div className="flex flex-col gap-4 ">
                                <div className="mb-4 flex flex-col gap-2">
                                    <div className="flex items-center relative w-full justify-center mt-2">
                                        <img
                                            className="h-32 w-32 object-cover rounded-full border-2"
                                            src={
                                                previewImage
                                                    ? previewImage
                                                    : window.location.origin +
                                                      "/storage/" +
                                                      data.photo
                                            }
                                        />
                                        <label
                                            htmlFor="foto"
                                            className="font-semibold text-sm"
                                        >
                                            <Pen className="absolute size-10 cursor-pointer text-white p-2 rounded-full bg-blue-500 right-20 bottom-1 sm:right-28" />
                                        </label>
                                    </div>

                                    <div className=" items-center gap-2 hidden">
                                        <input
                                            id="foto"
                                            type="file"
                                            className="w-full px-4 py-2"
                                            name="foto"
                                            onChange={(e) =>
                                                handleFileChange(e)
                                            }
                                        />
                                    </div>

                                    <span className="text-red-600">
                                        {errors.photo}
                                    </span>
                                </div>
                                <InputTextLabelEdit
                                    labelFor="nip"
                                    labelText="Nomor Induk Pegawai (NIP)"
                                    inputId="nip"
                                    error={`${
                                        errors && errors.nip === undefined
                                            ? ""
                                            : errors.nip
                                    }`}
                                    inputProps={{
                                        name: "nip",
                                        value: data.nip,
                                        type: "text",
                                        placeholder: "Masukkan nip siswa",
                                        onChange: (e) => {
                                            setData({
                                                ...data,
                                                nip: e.target.value,
                                            });
                                        },
                                    }}
                                >
                                    <NotebookPen className=" size-5 text-gray-600 absolute z-10 top-2.5  left-2.5" />
                                </InputTextLabelEdit>
                                <InputTextLabelEdit
                                    labelFor="name"
                                    labelText="Nama Guru"
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
                                        placeholder: "Masukkan nama guru",
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

                                <GenderSelector
                                    className="mb-4"
                                    selectedGender={data.gender}
                                    onChange={(e) =>
                                        setData({
                                            ...data,
                                            gender: e.target.value,
                                        })
                                    }
                                />
                                <InputTextLabelEdit
                                    labelFor="email"
                                    labelText="Email Guru"
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
                                        placeholder: "Masukkan email Guru",
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
                                <InputTextLabelEdit
                                    labelFor="phone_number"
                                    labelText="No. Hp Guru"
                                    error={`${
                                        errors &&
                                        errors.phone_number === undefined
                                            ? ""
                                            : errors.phone_number
                                    }`}
                                    inputId="phone_number"
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
                                </InputTextLabelEdit>

                                <InputTextLabelEdit
                                    labelFor="education"
                                    labelText="Pendidikan Guru"
                                    error={`${
                                        errors && errors.education === undefined
                                            ? ""
                                            : errors.education
                                    }`}
                                    inputId="education"
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
                                </InputTextLabelEdit>
                            </div>
                            <div className="mb-4 flex mt-4 flex-col gap-2">
                                <label
                                    htmlFor="status"
                                    className="font-medium text-sm"
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
                            <div className="mt-8 w-full flex gap-4 items-center justify-between">
                                <Button
                                    type="reset"
                                    className="w-1/2"
                                    onClick={() => reset()}
                                    variant={"outline"}
                                >
                                    Reset
                                </Button>
                                <Button
                                    variant={"blue"}
                                    className="w-1/2"
                                    disabled={processing}
                                    type="submit"
                                >
                                    Save
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
