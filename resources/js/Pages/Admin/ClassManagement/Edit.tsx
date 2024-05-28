import InputTextLabelEdit from "@/Components/InputTextLabelEdit";
import SelectOption from "@/Components/SelectOption";
import { Button } from "@/Components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog";
import { Input } from "@/Components/ui/input";
import { router, useForm } from "@inertiajs/react";
import {
    Book,
    DoorOpen,
    Mail,
    NotebookPen,
    Pen,
    Phone,
    User,
} from "lucide-react";
import { useEffect, useState } from "react";

interface EditProps {
    kelas: any;
}

const Edit = ({ kelas }: EditProps) => {
    const major = ["MIA", "IIS", "Bahasa", "Tidak ada Jurusan"];
    const classNumber = [10, 11, 12];
    const [showModal, setShowModal] = useState(false); // State untuk mengontrol modal
    const { data, setData, errors, processing, reset } = useForm({
        class_name: kelas.nip,
        major: kelas.major,
        class_number: kelas.class_number,
    });

    useEffect(() => {
        setData({
            ...data,
            class_name: kelas.class_name,
            major: kelas.major,
            class_number: kelas.class_number,
        });
    }, [kelas]);

    const submit = (e: any) => {
        e.preventDefault();
        router.post(route("admin.kelas.update", kelas.id), {
            ...data,
            _method: "put",
            forceFormData: true,
        });
    };

    return (
        <>
            <Dialog open={showModal} onOpenChange={setShowModal}>
                <DialogTrigger asChild>
                    <button type="button" onClick={() => setShowModal(true)}>
                        <Pen className="text-blue-500 hover:text-blue-600" />
                    </button>
                </DialogTrigger>
                <DialogContent className=" max-w-[340px] sm:max-w-[425px] h-auto  rounded-lg overflow-auto bg-white">
                    <DialogHeader>
                        <DialogTitle>Update Kelas</DialogTitle>
                    </DialogHeader>
                    <div className="bg-white mt-2">
                        <form name="createForm" onSubmit={submit}>
                            <div className="flex flex-col gap-4 ">
                                <InputTextLabelEdit
                                    labelFor="class_name"
                                    labelText="Nama Kelas"
                                    inputId="class_name"
                                    error={`${
                                        errors &&
                                        errors.class_name === undefined
                                            ? ""
                                            : errors.class_name
                                    }`}
                                    inputProps={{
                                        name: "class_name",
                                        value: data.class_name,
                                        type: "text",
                                        placeholder: "Masukkan Kelas",
                                        onChange: (e) => {
                                            setData({
                                                ...data,
                                                class_name: e.target.value,
                                            });
                                        },
                                    }}
                                >
                                    <DoorOpen className=" size-5 text-gray-600 absolute z-10 top-2.5  left-2.5" />
                                </InputTextLabelEdit>{" "}
                                <SelectOption
                                    optionName="Pilih Kelas"
                                    htmlFor="kelas"
                                    variant="wajib"
                                    labelName="Kelas"
                                    optionMap={classNumber.map(
                                        (item, index) => {
                                            return (
                                                <option
                                                    value={item.valueOf()}
                                                    key={index}
                                                >
                                                    {item.valueOf()}
                                                </option>
                                            );
                                        }
                                    )}
                                    errors={errors.class_number}
                                    selectOptionProps={{
                                        name: "class_number",
                                        value: data.class_number,
                                        onChange: (e: any) => {
                                            setData({
                                                ...data,
                                                class_number: e.target.value,
                                            });
                                        },
                                    }}
                                />
                                <SelectOption
                                    optionName="Pilih Jurusan"
                                    htmlFor="jurusan"
                                    variant="wajib"
                                    labelName="Jurusan"
                                    optionMap={major.map((item, index) => {
                                        return (
                                            <option
                                                value={item.valueOf()}
                                                key={index}
                                            >
                                                {item.valueOf()}
                                            </option>
                                        );
                                    })}
                                    errors={errors.major}
                                    selectOptionProps={{
                                        name: "major",
                                        value: data.major,
                                        onChange: (e: any) => {
                                            setData({
                                                ...data,
                                                major: e.target.value,
                                            });
                                        },
                                    }}
                                />
                            </div>

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
                                    variant={"blue"}
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

export default Edit;
