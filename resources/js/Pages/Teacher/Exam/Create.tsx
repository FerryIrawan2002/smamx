import InputTextLabel from "@/Components/InputTextLabel";
import TextEditor from "@/Components/TextEditor";
import { Button } from "@/Components/ui/button";
import { Label } from "@/Components/ui/label";
import { useForm, usePage } from "@inertiajs/react";
import { CircleX, DeleteIcon, Notebook, TimerIcon } from "lucide-react";
import { useState } from "react";

interface Props {
    class_teacher_id: string;
}

const Create = ({ class_teacher_id }: Props) => {
    const { data, setData, errors, post, processing, reset } = useForm({
        class_teacher_id: class_teacher_id,
        name_exam: "",
        exam_date: "",
        url: "",
    });

    function handleSubmit(e: any) {
        e.preventDefault();
        post(route("teacher.ujian.store"), {
            onSuccess: () => reset("name_exam", "exam_date", "url"),
            preserveScroll: true,
        });
    }

    return (
        <>
            <form
                className="flex flex-col bg-white p-4 border rounded-xl gap-4 mt-10 lg:w-3/4"
                onSubmit={handleSubmit}
            >
                <InputTextLabel
                    labelFor="name_exam"
                    labelText="Nama Ujian"
                    inputId="name_exam"
                    error={`${
                        errors && errors.name_exam === undefined
                            ? ""
                            : errors.name_exam
                    }`}
                    maxLength={100}
                    inputProps={{
                        name: "name",
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
                    <Notebook className="size-5 text-gray-600 absolute z-10 top-2.5 left-2.5" />
                </InputTextLabel>
                <InputTextLabel
                    labelFor="exam_date"
                    labelText="Tanggal Ujian"
                    inputId="exam_date"
                    error={`${
                        errors && errors.exam_date === undefined
                            ? ""
                            : errors.exam_date
                    }`}
                    maxLength={100}
                    inputProps={{
                        name: "exam_date",
                        value: data.exam_date,
                        type: "date",
                        placeholder: "Masukkan Tanggal Ujian",
                        onChange: (e) => {
                            setData({
                                ...data,
                                exam_date: e.target.value,
                            });
                        },
                    }}
                >
                    <TimerIcon className="size-5 text-gray-600 absolute z-10 top-2.5 left-2.5" />
                </InputTextLabel>
                <InputTextLabel
                    labelFor="url"
                    labelText="Link Ujian"
                    inputId="url"
                    error={`${
                        errors && errors.url === undefined ? "" : errors.url
                    }`}
                    maxLength={200}
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
                    <TimerIcon className="size-5 text-gray-600 absolute z-10 top-2.5 left-2.5" />
                </InputTextLabel>
                <div className="flex justify-end gap-2 mt-4 items-center">
                    <Button variant="outline" className="w-32">
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
        </>
    );
};

export default Create;
