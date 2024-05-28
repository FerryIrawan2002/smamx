import FileInput from "@/Components/FileInput";
import InputTextLabel from "@/Components/InputTextLabel";
import { Button } from "@/Components/ui/button";
import { Label } from "@/Components/ui/label";
import { useForm } from "@inertiajs/react";
import { BookUser, Info, Mail, Phone, User } from "lucide-react";
import { useCallback } from "react";

const Create: React.FC = () => {
    const { data, setData, errors, post, processing, reset } = useForm({
        course_name: "",
        photo: "",
    });

    function handleSubmit(e: any) {
        e.preventDefault();
        post(route("admin.mapel.store"), {
            forceFormData: true,
            onSuccess: () => reset("course_name", "photo"),
            preserveScroll: true,
        });
    }

    const handleDrop = useCallback(
        (acceptedFiles: any) => {
            setData("photo", acceptedFiles[0]);
        },
        [setData]
    );
    return (
        <form
            className="flex flex-col gap-4 mt-8 lg:w-3/4"
            onSubmit={handleSubmit}
        >
            <InputTextLabel
                labelFor="course_name"
                labelText="Mata Pelajaran"
                inputId="course_name"
                error={`${
                    errors && errors.course_name === undefined
                        ? ""
                        : errors.course_name
                }`}
                maxLength={50}
                inputProps={{
                    name: "nip",
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
                <BookUser className=" size-5 text-gray-600 absolute z-10 top-2.5  left-2.5" />
            </InputTextLabel>

            <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                    {" "}
                    <Label>Upload Gambar</Label>
                    <span className="text-sm bg-blue-200 px-3 py-1 rounded-xl text-blue-600 font-semibold">
                        wajib
                    </span>
                </div>

                <FileInput onDrop={handleDrop} accept="image/*" />
                <div className="mt-2">
                    {errors && errors.photo && (
                        <span className="text-red-500 mt-2 text-sm font-normal bg-red-50 py-2 px-6 border-red-300">
                            {errors.photo}
                        </span>
                    )}
                </div>
            </div>

            <div className="flex justify-end gap-2 mt-4 items-center">
                <Button variant="outline" className="w-32">
                    Reset
                </Button>
                <Button
                    variant={"blue"}
                    disabled={processing}
                    type="submit"
                    className="w-32"
                >
                    Simpan
                </Button>
            </div>
        </form>
    );
};

export default Create;
