import DataTableCustom from "@/Components/DataTableCustom";
import { GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import moment from "moment";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/Components/ui/alert-dialog";
import { Link, router } from "@inertiajs/react";
import { CircleX, Download, Plus, Trash2Icon } from "lucide-react";
import CreateFileLearn from "../Dashboard/CreateFileLearn";
import Edit from "../Dashboard/Edit";
import EditPoint from "../Exam/EditPoint";

moment.locale("id");

const formatDate = (dateString: string) => {
    const date = moment(dateString).locale("id");
    const formattedDate = date.format("DD MMMM YYYY - HH:mm");
    return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
};

const columns: GridColDef[] = [
    {
        field: "No",
        headerName: "No",
        width: 100,
        editable: false,
        renderCell: (r) => {
            const t = r.api.getRowIndexRelativeToVisibleRows(r.id);
            return t + 1;
        },
    },
    {
        field: "nisn",
        headerName: "NISN",
        width: 150,
        editable: true,
        valueGetter: (params: GridValueGetterParams) => {
            return params?.row?.student?.nisn;
        },
    },
    {
        field: "name",
        headerName: "Nama Siswa",
        width: 200,
        editable: true,
        valueGetter: (params: GridValueGetterParams) => {
            return params?.row?.student?.user?.name;
        },
    },
    {
        field: "name_exam",
        headerName: "Ujian",
        width: 150,
        editable: true,
        valueGetter: (params: GridValueGetterParams) => {
            return params?.row?.exam?.name_exam;
        },
    },
    {
        field: "point",
        headerName: "Nilai",
        width: 100,
        editable: true,
        renderCell: (params: any) => {
            return (
                <div className="flex items-center gap-2">
                    <span>{params?.row?.point ? params?.row?.point : "-"}</span>
                </div>
            );
        },
    },
    {
        field: "status",
        headerName: "Status",
        width: 200,
        editable: false,
        renderCell(params) {
            return (
                <span
                    className={`px-4 py-1 text-xs text-white rounded-full ${
                        params?.row?.status ? "bg-green-600 " : "bg-red-500"
                    }`}
                >
                    {params?.row?.status ? "Sudah dinilai" : "Belum dinilai"}
                </span>
            );
        },
    },

    {
        field: "action",
        headerName: "Action",
        width: 100,
        renderCell: (params: any) => {
            return (
                <div className="flex items-center gap-2">
                    <EditPoint point={params?.row} />
                    <AlertDialog>
                        <AlertDialogTrigger>
                            <Trash2Icon className="text-red-500 cursor-pointer" />
                        </AlertDialogTrigger>
                        <AlertDialogContent className="bg-white">
                            <AlertDialogHeader>
                                <AlertDialogTitle>
                                    Apakah anda yakin ingin menghapus?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                    Tindakan ini tidak bisa dibatalkan. Ini akan
                                    hapus akun Anda secara permanen dan hapus
                                    akun Anda data dari server kami.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                    type="button"
                                    className="bg-blue-500 hover:bg-blue-700 text-white"
                                    onClick={() => {
                                        router.delete(
                                            `/guru/tugas/${params.row.id}`
                                        );
                                    }}
                                >
                                    Continue
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            );
        },
    },
];

const DataTableGropExam = ({ rows }: any) => {
    return <DataTableCustom rows={rows} column={columns} />;
};

export default DataTableGropExam;
