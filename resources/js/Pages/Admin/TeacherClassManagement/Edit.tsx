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

interface EditProps {
    jadwal: any;
}

const Edit = ({ jadwal }: EditProps) => {
    const { classes, teachers, courses } = usePage<PageProps>().props;
    const [showModal, setShowModal] = useState(false); // State untuk mengontrol modal

    const { data, setData, errors, put, processing, reset } = useForm({
        class_room_id: jadwal.class_room_id,
        teacher_id: jadwal.teacher_id,
        course_id: jadwal.course_id,
    });

    useEffect(() => {
        setData({
            ...data,
            class_room_id: jadwal.class_room_id,
            teacher_id: jadwal.teacher_id,

            course_id: jadwal.course_id,
        });
    }, [jadwal]);

    function handleSubmit(e: any) {
        e.preventDefault();
        put(route("admin.jadwal.update", jadwal.id), {
            onSuccess: () => {
                reset();
                setShowModal(false);
            },
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
                <DialogContent className="max-w-[340px] sm:max-w-[425px] h-auto  rounded-lg overflow-auto bg-white ">
                    <DialogHeader>
                        <DialogTitle>Update Data Ajaran</DialogTitle>
                    </DialogHeader>
                    <div className=" bg-white rounded-lg">
                        <form
                            className="flex flex-col gap-4"
                            onSubmit={handleSubmit}
                        >
                            <div className="mb-4 flex flex-col gap-2">
                                <label
                                    htmlFor="class_room_id"
                                    className="font-medium text-sm "
                                >
                                    kelas
                                </label>
                                <div className="flex items-center gap-4">
                                    <select
                                        className="w-full border-gray-400 rounded-lg"
                                        name="class_room_id"
                                        id="class_room_id"
                                        value={data.class_room_id}
                                        onChange={(e) => {
                                            setData({
                                                ...data,
                                                class_room_id: e.target.value,
                                            });
                                        }}
                                    >
                                        {classes.map((item, index) => {
                                            return (
                                                <option
                                                    value={item.id}
                                                    key={index}
                                                >
                                                    {item.class_name}
                                                </option>
                                            );
                                        })}
                                    </select>
                                </div>
                            </div>
                            <div className="mb-4 flex flex-col gap-2">
                                <label
                                    htmlFor="teacher_id"
                                    className="font-medium text-sm "
                                >
                                    Guru
                                </label>
                                <div className="flex items-center gap-4">
                                    <select
                                        className="w-full border-gray-400 rounded-lg"
                                        name="teacher_id"
                                        id="teacher_id"
                                        value={data.teacher_id}
                                        onChange={(e) => {
                                            setData({
                                                ...data,
                                                teacher_id: e.target.value,
                                            });
                                        }}
                                    >
                                        {teachers.map((item, index) => {
                                            return (
                                                <option
                                                    value={item.id}
                                                    key={index}
                                                >
                                                    {item.user.name}
                                                </option>
                                            );
                                        })}
                                    </select>
                                </div>
                            </div>
                            <div className="mb-4 flex flex-col gap-2">
                                <label
                                    htmlFor="course_id"
                                    className="font-medium text-sm "
                                >
                                    Mata Pelajaran
                                </label>
                                <div className="flex items-center gap-4">
                                    <select
                                        className="w-full border-gray-400 rounded-lg"
                                        name="course_id"
                                        id="course_id"
                                        value={data.course_id}
                                        onChange={(e) => {
                                            setData({
                                                ...data,
                                                course_id: e.target.value,
                                            });
                                        }}
                                    >
                                        {courses.map((item, index) => {
                                            return (
                                                <option
                                                    value={item.id}
                                                    key={index}
                                                >
                                                    {item.course_name}
                                                </option>
                                            );
                                        })}
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
                                    variant={"blue"}
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
