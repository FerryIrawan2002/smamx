import { Button } from "@/Components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog";
import { Label } from "@/Components/ui/label";
import { router, useForm } from "@inertiajs/react";
import { Upload } from "lucide-react";
import { SyntheticEvent, useState } from "react";

interface EditProps {
    task_group: any;
}

const Edit = ({ task_group }: EditProps) => {
    const [showModal, setShowModal] = useState(false); // State for controlling the modal
    const [fileName, setFileName] = useState(""); // State for storing the selected file name
    const { data, setData, errors, processing, reset } = useForm({
        file: null,
    });

    const submit = (e: SyntheticEvent) => {
        e.preventDefault();
        router.post(route("student.tugas.update", task_group.id), {
            ...data,
            _method: "put",
            forceFormData: true,
        });
    };

    const handleFileChange = (e: any) => {
        const target = e.target as HTMLInputElement;
        const file = target.files?.[0];
        setData("file", file);
        setFileName(file ? file.name : "");
    };

    const handleModalClose = (open: boolean) => {
        if (!open) {
            reset();
            setFileName("");
        }
        setShowModal(open);
    };

    return (
        <>
            <Dialog open={showModal} onOpenChange={handleModalClose}>
                <DialogTrigger asChild>
                    <button
                        type="button"
                        className="flex justify-center text-sm items-center gap-2 bg-blue-500 hover:bg-blue-600 transform duration-300 text-white rounded-lg px-4 py-2"
                        onClick={() => setShowModal(true)}
                    >
                        <Upload />
                        <span>Kumpulkan Tugas</span>
                    </button>
                </DialogTrigger>
                <DialogContent className="max-w-[340px] sm:max-w-[600px] h-auto rounded-lg overflow-auto bg-white">
                    <DialogHeader>
                        <DialogTitle>Upload File Tugas</DialogTitle>
                    </DialogHeader>
                    <div className="bg-white mt-4">
                        <form name="createForm" onSubmit={submit}>
                            <div className="flex flex-col gap-3">
                                <Label
                                    htmlFor="file"
                                    className="flex justify-center items-center gap-2 border-dashed border border-black py-2 cursor-pointer hover:bg-gray-100 transform duration-150 rounded-lg"
                                >
                                    <Upload />
                                    <span>Upload File Tugas</span>
                                </Label>
                                <input
                                    type="file"
                                    name="file"
                                    id="file"
                                    className="hidden"
                                    onChange={handleFileChange}
                                />
                                {fileName && (
                                    <span className="text-sm text-gray-700 mt-2">
                                        Selected file: {fileName}
                                    </span>
                                )}
                                {errors.file && (
                                    <span className="text-sm text-red-500">
                                        {errors.file}
                                    </span>
                                )}
                            </div>

                            <div className="mt-8 w-full flex gap-4 items-center justify-between">
                                <Button
                                    type="reset"
                                    variant={"outline"}
                                    className="w-1/2"
                                    onClick={() => {
                                        reset();
                                        setFileName("");
                                    }}
                                >
                                    Reset
                                </Button>
                                <Button
                                    className="w-1/2"
                                    disabled={processing}
                                    type="submit"
                                    variant={"default"}
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
