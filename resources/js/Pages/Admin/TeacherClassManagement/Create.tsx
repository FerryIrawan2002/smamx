import InputTextLabel from "@/Components/InputTextLabel";
import SelectOption from "@/Components/SelectOption";
import { Button } from "@/Components/ui/button";
import { PageProps } from "@/types";
import { useForm, usePage } from "@inertiajs/react";
import { Calendar, Info, Mail, Phone, TimerIcon, User } from "lucide-react";

const Create: React.FC = () => {
    const { classes, courses, teachers } = usePage<PageProps>().props;
    const { data, setData, errors, post, processing, reset } = useForm({
        teacher_id: "",
        course_id: "",
        class_room_id: "",
    });
    function handleSubmit(e: any) {
        e.preventDefault();
        post(route("admin.jadwal.store"), { preserveScroll: true });
    }

    return (
        <>
            <form
                className="flex flex-col mt-8 lg:w-3/4"
                onSubmit={handleSubmit}
            >
                <SelectOption
                    optionName="Pilih Kelas"
                    htmlFor="class_room_id"
                    labelName="Kelas"
                    optionMap={classes.map((item, index) => {
                        return (
                            <option value={item.id} key={index}>
                                {item.class_name}
                            </option>
                        );
                    })}
                    errors={errors.class_room_id}
                    selectOptionProps={{
                        name: "class_room_id",
                        value: data.class_room_id,
                        onChange: (e: any) => {
                            setData({
                                ...data,
                                class_room_id: e.target.value,
                            });
                        },
                    }}
                />

                <SelectOption
                    optionName="Pilih Guru"
                    htmlFor="teacher_id"
                    labelName="Guru"
                    optionMap={teachers.map((item, index) => {
                        return (
                            <option value={item.id} key={index}>
                                {item.user.name}
                            </option>
                        );
                    })}
                    errors={errors.teacher_id}
                    selectOptionProps={{
                        name: "teacher_id",
                        value: data.teacher_id,
                        onChange: (e: any) => {
                            setData({
                                ...data,
                                teacher_id: e.target.value,
                            });
                        },
                    }}
                />
                <SelectOption
                    optionName="Pilih Mata Pelajaran"
                    htmlFor="course_id"
                    labelName="Mata Pelajaran"
                    optionMap={courses.map((item, index) => {
                        return (
                            <option value={item.id} key={index}>
                                {item.course_name}
                            </option>
                        );
                    })}
                    errors={errors.course_id}
                    selectOptionProps={{
                        name: "course_id",
                        value: data.course_id,
                        onChange: (e: any) => {
                            setData({
                                ...data,
                                course_id: e.target.value,
                            });
                        },
                    }}
                />
                <div className="flex justify-end gap-2 mt-4 items-center">
                    <Button variant="outline" className="w-32">
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
        </>
    );
};

export default Create;
