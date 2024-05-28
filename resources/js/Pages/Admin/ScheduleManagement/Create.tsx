import InputTextLabel from "@/Components/InputTextLabel";
import SelectOption from "@/Components/SelectOption";
import { Button } from "@/Components/ui/button";
import { PageProps } from "@/types";
import { useForm, usePage } from "@inertiajs/react";
import { Calendar, Info, Mail, Phone, TimerIcon, User } from "lucide-react";

const Create: React.FC = () => {
    const day = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat"];
    const { classTeacherCourses } = usePage<PageProps>().props;

    const { data, setData, errors, post, processing, reset } = useForm({
        class_teacher_id: "",
        day: "",
        time_start: "",
        time_end: "",
    });

    function handleSubmit(e: any) {
        e.preventDefault();
        post(route("admin.schedule.store"), { preserveScroll: true });
    }

    return (
        <>
            <form
                className="flex flex-col gap-4 mt-8 lg:w-3/4"
                onSubmit={handleSubmit}
            >
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <div className="">
                        <SelectOption
                            optionName="Hari"
                            htmlFor="day"
                            labelName="Hari"
                            optionMap={day.map((item, index) => {
                                return (
                                    <option value={item.valueOf()} key={index}>
                                        {item.valueOf()}
                                    </option>
                                );
                            })}
                            errors={errors.day}
                            selectOptionProps={{
                                name: "day",
                                value: data.day,
                                onChange: (e: any) => {
                                    setData({
                                        ...data,
                                        day: e.target.value,
                                    });
                                },
                            }}
                        />
                    </div>

                    <InputTextLabel
                        labelFor="jam_mulai"
                        labelText="Jam Mulai"
                        inputId="jam_mulai"
                        error={`${
                            errors && errors.time_start === undefined
                                ? ""
                                : errors.time_start
                        }`}
                        maxLength={10}
                        inputProps={{
                            name: "time_start",
                            value: data.time_start,
                            type: "text",
                            placeholder: "Masukkan jam mulai",
                            onChange: (e) => {
                                setData({
                                    ...data,
                                    time_start: e.target.value,
                                });
                            },
                        }}
                    >
                        <TimerIcon className=" size-5 text-gray-600 absolute z-10 top-2.5  left-2.5" />
                    </InputTextLabel>
                    <InputTextLabel
                        labelFor="time_end"
                        labelText="Jam Selesai"
                        inputId="time_end"
                        error={`${
                            errors && errors.time_end === undefined
                                ? ""
                                : errors.time_end
                        }`}
                        maxLength={10}
                        inputProps={{
                            name: "time_end",
                            value: data.time_end,
                            type: "text",
                            placeholder: "Masukkan jam selesai",
                            onChange: (e) => {
                                setData({
                                    ...data,
                                    time_end: e.target.value,
                                });
                            },
                        }}
                    >
                        <TimerIcon className=" size-5 text-gray-600 absolute z-10 top-2.5  left-2.5" />
                    </InputTextLabel>
                </div>

                <div className="mb-4 flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                        {" "}
                        <label
                            htmlFor="class_teacher_id"
                            className="font-medium text-sm "
                        >
                            Kelas - Guru - Mata Pelajaran
                        </label>{" "}
                        <span className="text-sm bg-blue-200 px-3 py-1 rounded-xl text-blue-600 font-semibold">
                            wajib
                        </span>
                    </div>

                    <div className="flex items-center gap-4">
                        <select
                            className="w-full border-gray-400 rounded-lg disabled:bg-gray-200 disabled:cursor-not-allowed"
                            name="class_teacher_id"
                            id="class_teacher_id"
                            value={data.class_teacher_id}
                            onChange={(e) => {
                                setData({
                                    ...data,
                                    class_teacher_id: e.target.value,
                                });
                            }}
                            disabled={
                                !classTeacherCourses.every(
                                    (item) =>
                                        item?.class_room?.class_name &&
                                        item?.teacher?.user?.name &&
                                        item?.course?.course_name
                                )
                            }
                        >
                            <option value="">- Pilih -</option>
                            {classTeacherCourses.map((item, index) => (
                                <option value={item.id} key={index}>
                                    {item?.class_room?.class_name} -{" "}
                                    {item?.teacher?.user?.name} -{" "}
                                    {item?.course?.course_name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {errors && errors.class_teacher_id && (
                        <p className="text-red-500">
                            {errors.class_teacher_id}
                        </p>
                    )}
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
            <hr className="my-4 w-full lg:w-3/4" />
        </>
    );
};

export default Create;
