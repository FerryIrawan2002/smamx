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
import { Book, Mail, NotebookPen, Pen, Phone, User } from "lucide-react";
import { useEffect, useState } from "react";

interface EditProps {
    course: any;
}
const Edit = ({ course }: EditProps) => {
    const [showModal, setShowModal] = useState(false); // State untuk mengontrol modal
    const { data, setData, errors, processing, reset } = useForm({
        course_name: course.course_name,

        photo: course.photo,
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
            course_name: course.course_name,
            photo: course.photo,
        });
    }, [course]);

    const submit = (e: any) => {
        e.preventDefault();
        router.post(route("admin.mapel.update", course.id), {
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
                <DialogContent className=" max-w-[340px] sm:max-w-[425px] h-auto  rounded-lg overflow-auto bg-white">
                    <DialogHeader>
                        <DialogTitle>Update Data Mata Pelajaran</DialogTitle>
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
                                    labelFor="course_name"
                                    labelText="Nama mata pelajaran"
                                    inputId="course_name"
                                    error={`${
                                        errors &&
                                        errors.course_name === undefined
                                            ? ""
                                            : errors.course_name
                                    }`}
                                    inputProps={{
                                        name: "course_name",
                                        value: data.course_name,
                                        type: "text",
                                        placeholder: "Masukkan Mata Pelajaran",
                                        onChange: (e) => {
                                            setData({
                                                ...data,
                                                course_name: e.target.value,
                                            });
                                        },
                                    }}
                                >
                                    <Book className=" size-5 text-gray-600 absolute z-10 top-2.5  left-2.5" />
                                </InputTextLabelEdit>
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
