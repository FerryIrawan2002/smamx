import InputTextLabel from "@/Components/InputTextLabel";
import TextEditor from "@/Components/TextEditor";
import { Button } from "@/Components/ui/button";
import { Label } from "@/Components/ui/label";
import { useForm, usePage } from "@inertiajs/react";
import { CircleX, DeleteIcon, TimerIcon } from "lucide-react";
import { useState } from "react";

interface Props {
    class_teacher_id: string;
}

const Create = ({ class_teacher_id }: Props) => {
    const day = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat"];
    const { data, setData, errors, post, processing, reset } = useForm({
        class_teacher_id: class_teacher_id,
        week: "",
        desc: "",
        files: [] as File[],
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const fileList = Array.from(e.target.files) as File[];
            setData("files", [...data.files, ...fileList]);
        }
    };

    const handleDeleteFile = (index: number) => {
        const updatedFiles = [...data.files];
        updatedFiles.splice(index, 1);
        setData("files", updatedFiles);
    };

    function handleSubmit(e: any) {
        e.preventDefault();
        post(route("teacher.dashboard.store"), {
            forceFormData: true,
            onSuccess: () => reset("week", "desc", "files"),
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
                    labelFor="week"
                    labelText="Minggu ke"
                    inputId="week"
                    error={`${
                        errors && errors.week === undefined ? "" : errors.week
                    }`}
                    maxLength={10}
                    inputProps={{
                        name: "week",
                        value: data.week,
                        type: "text",
                        placeholder: "Masukkan Minggu Materi",
                        onChange: (e) => {
                            setData({
                                ...data,
                                week: e.target.value,
                            });
                        },
                    }}
                >
                    <TimerIcon className="size-5 text-gray-600 absolute z-10 top-2.5 left-2.5" />
                </InputTextLabel>
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
                        placeholder="Masukkan Deskripsi Materi..."
                    />
                    {errors.desc && (
                        <span className="text-red-500">{errors.desc}</span>
                    )}
                </div>
                <div className="flex flex-col gap-3">
                    <Label>File Materi</Label>
                    {data.files.map((file: File, index: number) => (
                        <ul
                            key={index}
                            className="flex gap-2 rounded-lg bg-gray-50  p-2 border items-center"
                        >
                            <span>
                                {index + 1}. {file.name}
                            </span>
                            <button
                                type="button"
                                className="text-red-500 hover:text-red-700"
                                onClick={() => handleDeleteFile(index)}
                            >
                                <CircleX className="size-5" />
                            </button>
                        </ul>
                    ))}
                    <input
                        multiple
                        type="file"
                        name="files[]"
                        onChange={handleFileChange}
                    />
                </div>
                {errors.files && (
                    <span className="text-red-500">{errors.files}</span>
                )}
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
