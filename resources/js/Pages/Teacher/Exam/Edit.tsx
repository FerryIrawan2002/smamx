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
    exam: any;
}

const Edit = ({ exam }: EditProps) => {
    const [showModal, setShowModal] = useState(false);
    const { data, setData, errors, put, processing, reset } = useForm({
        name_exam: exam.name_exam,
        exam_date: exam.exam_date,
        url: exam.url,
        status: exam.status,
    });

    useEffect(() => {
        setData({
            ...data,
            name_exam: exam.name_exam,
            exam_date: exam.exam_date,
            url: exam.url,
            status: exam.status,
        });
    }, [exam]);

    function handleSubmit(e: any) {
        e.preventDefault();
        put(route("teacher.ujian.update", exam.id), {
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
                <DialogContent className="max-w-[340px] sm:max-w-[600px] h-[79vh]  rounded-lg overflow-auto bg-white ">
                    <DialogHeader>
                        <DialogTitle>Update Data Ujian</DialogTitle>
                    </DialogHeader>
                    <div className=" bg-white rounded-lg">
                        <form
                            className="flex flex-col gap-4 mt-4"
                            onSubmit={handleSubmit}
                        >
                            <InputTextLabelEdit
                                labelFor="name_exam"
                                labelText="Nama Ujian"
                                inputId="name_exam"
                                error={`${
                                    errors && errors.name_exam === undefined
                                        ? ""
                                        : errors.name_exam
                                }`}
                                inputProps={{
                                    name: "name_exam",
                                    value: data.name_exam,
                                    type: "text",
                                    placeholder: "Masukkan Nama Ujian",
                                    onChange: (e) => {
                                        setData({
                                            ...data,
                                            name_exam: e.target.value,
                                        });
                                    },
                                }}
                            >
                                <Calendar className=" size-5 text-gray-600 absolute z-10 top-2.5  left-2.5" />
                            </InputTextLabelEdit>
                            <InputTextLabelEdit
                                labelFor="exam_date"
                                labelText="exam_date"
                                inputId="exam_date"
                                error={`${
                                    errors && errors.exam_date === undefined
                                        ? ""
                                        : errors.exam_date
                                }`}
                                inputProps={{
                                    name: "exam_date",
                                    value: data.exam_date,
                                    type: "datetime-local",
                                    placeholder: "Masukkan Tanggal Ujian",
                                    onChange: (e) => {
                                        setData({
                                            ...data,
                                            exam_date: e.target.value,
                                        });
                                    },
                                }}
                            >
                                <Calendar className=" size-5 text-gray-600 absolute z-10 top-2.5  left-2.5" />
                            </InputTextLabelEdit>
                            <InputTextLabelEdit
                                labelFor="url"
                                labelText="Link Ujian"
                                inputId="url"
                                error={`${
                                    errors && errors.url === undefined
                                        ? ""
                                        : errors.url
                                }`}
                                inputProps={{
                                    name: "url",
                                    value: data.url,
                                    type: "text",
                                    placeholder: "Masukkan Link Ujian",
                                    onChange: (e) => {
                                        setData({
                                            ...data,
                                            url: e.target.value,
                                        });
                                    },
                                }}
                            >
                                <Calendar className=" size-5 text-gray-600 absolute z-10 top-2.5  left-2.5" />
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
