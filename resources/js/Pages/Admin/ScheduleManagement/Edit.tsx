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
    schedule: any;
}

const Edit = ({ schedule }: EditProps) => {
    const [showModal, setShowModal] = useState(false);
    const day = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat"];
    const { classTeacherCourses } = usePage<PageProps>().props;
    const { data, setData, errors, put, processing, reset } = useForm({
        class_teacher_id: schedule.class_teacher_id,
        day: schedule.day,
        time_start: schedule.time_start,
        time_end: schedule.time_end,
    });

    useEffect(() => {
        setData({
            ...data,
            class_teacher_id: schedule.class_teacher_id,
            day: schedule.day,
            time_start: schedule.time_start,
            time_end: schedule.time_end,
        });
    }, [schedule]);

    function handleSubmit(e: any) {
        e.preventDefault();
        put(route("admin.schedule.update", schedule.id), {
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
                        <DialogTitle>Update Data Jadwal</DialogTitle>
                    </DialogHeader>
                    <div className=" bg-white rounded-lg">
                        <form
                            className="flex flex-col gap-4"
                            onSubmit={handleSubmit}
                        >
                            <InputTextLabelEdit
                                labelFor="hari"
                                labelText="Hari"
                                inputId="day"
                                error={`${
                                    errors && errors.day === undefined
                                        ? ""
                                        : errors.day
                                }`}
                                inputProps={{
                                    name: "day",
                                    value: data.day,
                                    type: "text",
                                    placeholder: "Masukkan hari jadwal",
                                    onChange: (e) => {
                                        setData({
                                            ...data,
                                            day: e.target.value,
                                        });
                                    },
                                }}
                            >
                                <Calendar className=" size-5 text-gray-600 absolute z-10 top-2.5  left-2.5" />
                            </InputTextLabelEdit>
                            <InputTextLabelEdit
                                labelFor="time_start"
                                labelText="Waktu Mulai"
                                inputId="time_start"
                                error={`${
                                    errors && errors.time_start === undefined
                                        ? ""
                                        : errors.time_start
                                }`}
                                inputProps={{
                                    name: "time_start",
                                    value: data.time_start,
                                    type: "text",
                                    placeholder: "Masukkan Jam Mulai",
                                    onChange: (e) => {
                                        setData({
                                            ...data,
                                            time_start: e.target.value,
                                        });
                                    },
                                }}
                            >
                                <TimerIcon className=" size-5 text-gray-600 absolute z-10 top-2.5  left-2.5" />
                            </InputTextLabelEdit>
                            <InputTextLabelEdit
                                labelFor="time_end"
                                labelText="Waktu Akhir"
                                inputId="time_end"
                                error={`${
                                    errors && errors.time_end === undefined
                                        ? ""
                                        : errors.time_end
                                }`}
                                inputProps={{
                                    name: "time_end",
                                    value: data.time_end,
                                    type: "text",
                                    placeholder: "Masukkan Jam Akhir",
                                    onChange: (e) => {
                                        setData({
                                            ...data,
                                            time_end: e.target.value,
                                        });
                                    },
                                }}
                            >
                                <TimerIcon className=" size-5 text-gray-600 absolute z-10 top-2.5  left-2.5" />
                            </InputTextLabelEdit>
                            <div className="mb-4 flex flex-col gap-2">
                                <label
                                    htmlFor="class_teacher_id"
                                    className="font-medium text-sm "
                                >
                                    Kelas - Guru - Mata Pelajaran
                                </label>
                                <div className="flex items-center gap-4">
                                    <select
                                        className="w-full border-gray-400 rounded-lg"
                                        name="class_teacher_id"
                                        id="class_teacher_id"
                                        value={data.class_teacher_id}
                                        onChange={(e) => {
                                            setData({
                                                ...data,
                                                class_teacher_id:
                                                    e.target.value,
                                            });
                                        }}
                                    >
                                        <option value="">- Pilih -</option>
                                        {classTeacherCourses.map(
                                            (item, index) => {
                                                return (
                                                    <option
                                                        value={item.id}
                                                        key={index}
                                                    >
                                                        {
                                                            item.class_room
                                                                .class_name
                                                        }{" "}
                                                        -{" "}
                                                        {item.teacher.user.name}{" "}
                                                        -{" "}
                                                        {
                                                            item.course
                                                                .course_name
                                                        }
                                                    </option>
                                                );
                                            }
                                        )}
                                    </select>
                                </div>
                                {errors && errors.class_teacher_id && (
                                    <p className="text-red-500">
                                        {errors.class_teacher_id}
                                    </p>
                                )}
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
                                    variant={"blue"}
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
