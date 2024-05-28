import StudentLayout from "@/Layouts/StudentLayout";
import { StudentClass, Exam } from "@/types";
import { Head } from "@inertiajs/react";
import { Notebook } from "lucide-react";
import { useState } from "react";
import moment from "moment";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import noData from "../../../../../public/assets/img/nodata.png";
interface Props {
    classTeacher: StudentClass;
}

const Card = ({ classTeacher }: Props) => {
    moment.locale("id");

    const [kodeUjian, setKodeUjian] = useState<{ [key: number]: string }>({});

    const formatDate = (dateString: string) => {
        const date = moment(dateString).locale("id");
        const formattedDate = date.format("DD MMMM YYYY");
        return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
    };

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        examId: number
    ) => {
        const { value } = e.target;
        setKodeUjian((prevState) => ({
            ...prevState,
            [examId]: value,
        }));
    };

    const isKodeUjianValid = (exam: Exam) => {
        const kodeUjianInput = kodeUjian[exam.id] || "";
        const urlLastPart = exam.url.substring(exam.url.lastIndexOf("/") + -10);
        const last5CharsOfUrl = urlLastPart.slice(5, 10);
        return kodeUjianInput === last5CharsOfUrl;
    };

    return (
        <>
            <div className="grid grid-cols-1 mt-8 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10 md:mt-8 lg:mt-10">
                {classTeacher.exams && classTeacher.exams.length > 0 ? (
                    classTeacher.exams.map((exam: Exam) => (
                        <div
                            key={exam.id}
                            className="flex flex-col p-4 border rounded-lg bg-white"
                        >
                            <div className="flex items-center gap-2">
                                <span className="bg-gray-100 p-2 w-10 rounded-full">
                                    <Notebook size={24} />
                                </span>
                                <span className="text-xl font-semibold">
                                    {exam.name_exam}
                                </span>
                            </div>
                            <div className="flex flex-col gap-2 mt-2">
                                <span>
                                    Tanggal Ujian :
                                    <span className="bg-red-200 font-medium ml-2 text-sm  rounded-full px-4 py-1">
                                        {formatDate(exam.exam_date)}
                                    </span>
                                </span>
                            </div>
                            <div>
                                {exam.url &&
                                exam.url !== "" &&
                                exam.status === 1 ? (
                                    <>
                                        <hr className="my-4" />
                                        <div className="flex items-center gap-2">
                                            <Input
                                                className=" placeholder:text-sm"
                                                maxLength={5}
                                                placeholder="Masukkan 5 Kode Ujian"
                                                value={kodeUjian[exam.id] || ""}
                                                onChange={(e) =>
                                                    handleInputChange(
                                                        e,
                                                        exam.id
                                                    )
                                                }
                                            />
                                            <Button
                                                disabled={
                                                    !isKodeUjianValid(exam)
                                                }
                                            >
                                                <a
                                                    href={`${exam.url}`}
                                                    target="_blank"
                                                >
                                                    Mulai Ujian
                                                </a>
                                            </Button>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <hr className="my-4" />
                                        <div className="flex justify-center w-full rounded-lg bg-green-200 text-green-600">
                                            <span className="py-2  font-semibold">
                                                Ujian telah selesai !
                                            </span>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="flex items-center md:col-span-2 lg:col-span-4 justify-center p-4 rounded-xl border bg-white py-12 flex-col gap-1 w-full">
                        <img src={noData} className="size-40" alt="" />
                        <div className="flex flex-col gap-2 text-center">
                            <span className="font-medium text-lg">
                                Maaf, tidak ada Ujian
                            </span>
                            <span className="text-sm text-gray-500">
                                Belum ada Ujian hari ini
                            </span>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default Card;
