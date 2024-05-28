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
    learn: any;
}

const Edit = ({ learn }: EditProps) => {
    const [showModal, setShowModal] = useState(false);
    const { data, setData, errors, put, processing, reset } = useForm({
        learn_id: learn.learn_id,
        week: learn.week,
        desc: learn.desc,
        status: learn.status,
    });

    useEffect(() => {
        setData({
            ...data,
            learn_id: learn.class_teacher_id,
            week: learn.week,
            desc: learn.desc,
            status: learn.status,
        });
    }, [learn]);

    function handleSubmit(e: any) {
        e.preventDefault();
        put(route("teacher.dashboard.update", learn.id), {
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
                <DialogContent className="max-w-[340px] sm:max-w-[600px] h-[70vh]  rounded-lg overflow-auto bg-white ">
                    <DialogHeader>
                        <DialogTitle>Update Data Materi</DialogTitle>
                    </DialogHeader>
                    <div className=" bg-white rounded-lg">
                        <form
                            className="flex flex-col gap-4 mt-4"
                            onSubmit={handleSubmit}
                        >
                            <InputTextLabelEdit
                                labelFor="week"
                                labelText="Minggu Ke"
                                inputId="week"
                                error={`${
                                    errors && errors.week === undefined
                                        ? ""
                                        : errors.week
                                }`}
                                inputProps={{
                                    name: "week",
                                    value: data.week,
                                    type: "text",
                                    placeholder: "Masukkan Minggu",
                                    onChange: (e) => {
                                        setData({
                                            ...data,
                                            week: e.target.value,
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
