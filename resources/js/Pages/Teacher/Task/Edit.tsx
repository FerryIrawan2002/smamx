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
import { Calendar, Pen, TimerIcon } from "lucide-react";
import { useEffect, useState } from "react";
import InputTextLabelEdit from "@/Components/InputTextLabelEdit";
import { Label } from "@/Components/ui/label";
import TextEditor from "@/Components/TextEditor";

interface EditProps {
    task: any;
}

const Edit = ({ task }: EditProps) => {
    const [showModal, setShowModal] = useState(false);
    const { data, setData, errors, put, processing, reset } = useForm({
        name: task.name,
        desc: task.desc,
        deadline: task.deadline,
    });

    useEffect(() => {
        setData({
            ...data,
            name: task.name,
            desc: task.desc,
            deadline: task.deadline,
        });
    }, [task]);

    function handleSubmit(e: any) {
        e.preventDefault();
        put(route("teacher.tugas.update", task.id), {
            onSuccess: () => {
                reset();
                setShowModal(false);
            },
            preserveScroll: true,
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
                <DialogContent className="max-w-[340px] sm:max-w-[600px] h-[80vh]  rounded-lg overflow-auto bg-white ">
                    <DialogHeader>
                        <DialogTitle>Update Data Materi</DialogTitle>
                    </DialogHeader>
                    <div className=" bg-white rounded-lg">
                        <form
                            className="flex flex-col gap-4 mt-4"
                            onSubmit={handleSubmit}
                        >
                            <InputTextLabelEdit
                                labelFor="name"
                                labelText="Nama tugas"
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
                                    placeholder: "Masukkan Nama Tugas",
                                    onChange: (e) => {
                                        setData({
                                            ...data,
                                            name: e.target.value,
                                        });
                                    },
                                }}
                            >
                                <Calendar className=" size-5 text-gray-600 absolute z-10 top-2.5  left-2.5" />
                            </InputTextLabelEdit>
                            <InputTextLabelEdit
                                labelFor="deadline"
                                labelText="Deadline"
                                inputId="deadline"
                                error={`${
                                    errors && errors.deadline === undefined
                                        ? ""
                                        : errors.deadline
                                }`}
                                inputProps={{
                                    name: "deadline",
                                    value: data.deadline,
                                    type: "datetime-local",
                                    placeholder: "Masukkan Deadline",
                                    onChange: (e) => {
                                        setData({
                                            ...data,
                                            deadline: e.target.value,
                                        });
                                    },
                                }}
                            >
                                <Calendar className=" size-5 text-gray-600 absolute z-10 top-2.5  left-2.5" />
                            </InputTextLabelEdit>
                            <div className="flex flex-col gap-3 mt-2">
                                <Label htmlFor="desc">Deskripsi Materi</Label>
                                <TextEditor
                                    value={data.desc}
                                    onChange={(value) => {
                                        setData({
                                            ...data,
                                            desc: value,
                                        });
                                    }}
                                />
                                {errors.desc && (
                                    <span className="text-red-500">
                                        {errors.desc}
                                    </span>
                                )}
                            </div>

                            <div className="flex justify-end gap-2 mt-4 items-center">
                                <Button
                                    onClick={() => reset()}
                                    variant="outline"
                                    className="w-32"
                                >
                                    Reset
                                </Button>
                                <Button
                                    disabled={processing}
                                    type="submit"
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
