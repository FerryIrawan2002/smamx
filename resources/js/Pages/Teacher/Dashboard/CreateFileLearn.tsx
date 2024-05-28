import { Button } from "@/Components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog";
import { Label } from "@/Components/ui/label";
import { useForm } from "@inertiajs/react";
import {
    CircleX,
    Plus
} from "lucide-react";
import { useEffect, useState } from "react";

const CreateFileLearn = ({ id }: any) => {
    const [showModal, setShowModal] = useState(false); // State untuk mengontrol modal
    const { data, setData, errors, processing, reset, post } = useForm({
        learn_id: id,
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
        post(route("teacher.file.store"), {
            forceFormData: true,
            onSuccess: () => reset("files"),
            preserveScroll: true,
        });
    }

    return (
        <>
            <Dialog open={showModal} onOpenChange={setShowModal}>
                <DialogTrigger asChild>
                    <button
                        onClick={() => setShowModal(true)}
                        className="text-white flex items-center gap-2 bg-green-500 hover:bg-green-600 transform duration-300 px-3 py-1 text-xs rounded-lg"
                    >
                        <Plus />
                        <span className=" font-semibold">Tambah File</span>
                    </button>
                </DialogTrigger>
                <DialogContent className=" max-w-[340px] sm:max-w-[425px] h-auto  rounded-lg overflow-auto bg-white">
                    <DialogHeader>
                        <DialogTitle>Tambah File</DialogTitle>
                    </DialogHeader>
                    <div className="bg-white mt-2">
                        <form name="createForm" onSubmit={handleSubmit}>
                            <div className="flex flex-col gap-3">
                                <Label>
                                    File Materi{" "}
                                    <span className="text-gray-500">
                                        (File bisa banyak diunggah)
                                    </span>
                                </Label>
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
                                            onClick={() =>
                                                handleDeleteFile(index)
                                            }
                                        >
                                            <CircleX className="size-5" />
                                        </button>
                                    </ul>
                                ))}
                                <input
                                    className="border border-gray-500 mt-2 cursor-pointer file:cursor-pointer bg-gray-200 rounded-lg"
                                    multiple
                                    type="file"
                                    name="files[]"
                                    onChange={handleFileChange}
                                />
                            </div>
                            {errors.files && (
                                <span className="text-red-500">
                                    {errors.files}
                                </span>
                            )}
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

export default CreateFileLearn;
