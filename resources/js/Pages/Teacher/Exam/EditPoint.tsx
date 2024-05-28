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
import { Calendar, NotebookPen, Pen, TimerIcon } from "lucide-react";
import { useEffect, useState } from "react";
import InputTextLabelEdit from "@/Components/InputTextLabelEdit";
import { Label } from "@/Components/ui/label";
import TextEditor from "@/Components/TextEditor";

interface EditProps {
    point: any;
}

const EditPoint = ({ point }: EditProps) => {
    const [showModal, setShowModal] = useState(false);
    const { data, setData, errors, put, processing, reset } = useForm({
        point: point.point,
    });

    useEffect(() => {
        setData({
            ...data,
            point: point.point,
        });
    }, [point]);

    function handleSubmit(e: any) {
        e.preventDefault();
        put(route("teacher.detail-ujian.update", point.id), {
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
                <DialogContent className="max-w-[340px] sm:max-w-[300px] h-auto  rounded-lg overflow-auto bg-white ">
                    <DialogHeader>
                        <DialogTitle>Tambahkan Nilai ujian</DialogTitle>
                    </DialogHeader>
                    <div className=" bg-white rounded-lg">
                        <form
                            className="flex flex-col gap-4"
                            onSubmit={handleSubmit}
                        >
                            <InputTextLabelEdit
                                labelFor="point"
                                labelText="Nilai Ujian"
                                inputId="name"
                                error={`${
                                    errors && errors.point === undefined
                                        ? ""
                                        : errors.point
                                }`}
                                inputProps={{
                                    name: "point",
                                    value: data.point,
                                    type: "text",
                                    placeholder: "Masukkan nilai Ujian",
                                    onChange: (e) => {
                                        setData({
                                            ...data,
                                            point: e.target.value,
                                        });
                                    },
                                }}
                            >
                                <NotebookPen className=" size-5 text-gray-600 absolute z-10 top-2.5  left-2.5" />
                            </InputTextLabelEdit>
                            <div className="flex w-full gap-2 mt-2 items-center">
                                <Button
                                    disabled={processing}
                                    type="submit"
                                    className="w-full"
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

export default EditPoint;
