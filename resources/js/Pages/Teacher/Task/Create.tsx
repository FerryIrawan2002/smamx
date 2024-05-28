import InputTextLabel from "@/Components/InputTextLabel";
import TextEditor from "@/Components/TextEditor";
import { Button } from "@/Components/ui/button";
import { Label } from "@/Components/ui/label";
import { useForm } from "@inertiajs/react";
import { Notebook, TimerIcon } from "lucide-react";

interface Props {
    class_teacher_id: string;
}

const Create = ({ class_teacher_id }: Props) => {
    const { data, setData, errors, post, processing, reset } = useForm({
        class_teacher_id: class_teacher_id,
        name: "",
        desc: "",
        deadline: "",
    });

    function handleSubmit(e: any) {
        e.preventDefault();
        post(route("teacher.tugas.store"), {
            onSuccess: () => reset("name", "desc", "deadline"),
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
                    labelFor="name"
                    labelText="Nama Tugas"
                    inputId="name"
                    error={`${
                        errors && errors.name === undefined ? "" : errors.name
                    }`}
                    maxLength={100}
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
                    <Notebook className="size-5 text-gray-600 absolute z-10 top-2.5 left-2.5" />
                </InputTextLabel>
                <div className="flex flex-col gap-3 mt-2">
                    <div className="flex items-center gap-2">
                        <Label htmlFor="desc">Deskripsi Tugas</Label>
                        <span className="text-sm bg-blue-200 px-3 py-1 rounded-xl text-blue-600 font-semibold">
                            wajib
                        </span>
                    </div>

                    <TextEditor
                        id="desc"
                        value={data.desc}
                        onChange={(value) => {
                            setData({
                                ...data,
                                desc: value,
                            });
                        }}
                        placeholder="Masukkan Deskripsi Tugas..."
                    />
                    {errors.desc && (
                        <span className="text-red-500 text-sm">
                            {errors.desc}
                        </span>
                    )}
                </div>
                <InputTextLabel
                    labelFor="deadline"
                    labelText="Deadline Tugas"
                    inputId="deadline"
                    error={`${
                        errors && errors.deadline === undefined
                            ? ""
                            : errors.deadline
                    }`}
                    maxLength={100}
                    inputProps={{
                        name: "deadline",
                        value: data.deadline,
                        type: "datetime-local",
                        placeholder: "Masukkan Deadline Tugas",
                        onChange: (e) => {
                            setData({
                                ...data,
                                deadline: e.target.value,
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
