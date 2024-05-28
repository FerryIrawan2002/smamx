import FileInput from "@/Components/FileInput";
import InputTextLabel from "@/Components/InputTextLabel";
import SelectOption from "@/Components/SelectOption";
import { Button } from "@/Components/ui/button";
import { Label } from "@/Components/ui/label";
import { useForm } from "@inertiajs/react";
import { BookUser, PenBox } from "lucide-react";
import { useCallback } from "react";

const Create: React.FC = () => {
    const major = ["MIA", "IIS", "Bahasa", "Tidak ada Jurusan"];
    const classNumber = [10, 11, 12];
    const { data, setData, errors, post, processing, reset } = useForm({
        class_name: "",
        class_number: "",
        major: "",
    });

    function handleSubmit(e: any) {
        e.preventDefault();
        post(route("admin.kelas.store"), {
            forceFormData: true,
            onSuccess: () => reset("class_name"),
            preserveScroll: true,
        });
    }

    return (
        <form
            className="flex flex-col gap-4 mt-7 lg:w-3/4"
            onSubmit={handleSubmit}
        >
            <InputTextLabel
                labelFor="class_name"
                labelText="Nama Kelas"
                inputId="class_name"
                variant="wajib"
                error={`${
                    errors && errors.class_name === undefined
                        ? ""
                        : errors.class_name
                }`}
                maxLength={50}
                inputProps={{
                    name: "nip",
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
                <BookUser className=" size-5 text-gray-600 absolute z-10 top-2.5  left-2.5" />
            </InputTextLabel>{" "}
            <SelectOption
                optionName="Pilih Kelas"
                htmlFor="kelas"
                variant="wajib"
                labelName="Kelas"
                optionMap={classNumber.map((item, index) => {
                    return (
                        <option value={item.valueOf()} key={index}>
                            {item.valueOf()}
                        </option>
                    );
                })}
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
                htmlFor="day"
                variant="wajib"
                labelName="Jurusan"
                optionMap={major.map((item, index) => {
                    return (
                        <option value={item.valueOf()} key={index}>
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
