import DataTableCustom from "@/Components/DataTableCustom";
import { GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
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

import moment from "moment";
import { Trash2Icon } from "lucide-react";
import Edit from "../TeacherClassManagement/Edit";

moment.locale("id");
const RenderProfileImage = ({ value }: any) => {
    return (
        <img
            className="w-8 h-8 rounded-full object-cover border"
            src={window.location.origin + "/storage/" + value}
        />
    );
};

const formatDate = (dateString: string) => {
    const date = moment(dateString).locale("id");
    const formattedDate = date.format("DD MMMM YYYY");
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
        field: "day",
        headerName: "Hari",
        width: 150,
        editable: true,
        valueGetter(params) {
            return params.row.day ? params.row.day : "Tidak ada";
        },
    },
    {
        field: "time_start",
        headerName: "Jam pelajaran",
        width: 200,
        editable: true,
        renderCell: (params: any) => (
            <div className="flex items-center gap-1">
                <span>
                    {params?.row?.time_start} - {params?.row?.time_end}
                </span>
            </div>
        ),
    },
    {
        field: "kelas",
        headerName: "Kelas",
        width: 200,
        editable: true,
        valueGetter(params) {
            return params?.row?.class_teacher?.class_room?.class_name;
        },
    },
    {
        field: "guru",
        headerName: "Guru",
        width: 200,
        editable: true,
        renderCell: (params: any) => (
            <div className="flex items-center gap-3">
                <RenderProfileImage
                    value={params?.row?.class_teacher?.teacher?.photo}
                />
                <span>{params?.row?.class_teacher?.teacher?.user?.name}</span>
            </div>
        ),
    },
    {
        field: "mapel",
        headerName: "Mata Pelajaran",
        width: 250,
        editable: true,
        renderCell: (params: any) => (
            <div className="flex items-center gap-3">
                <RenderProfileImage
                    value={params?.row?.class_teacher?.course?.photo}
                />
                <span>{params?.row?.class_teacher?.course?.course_name}</span>
            </div>
        ),
    },
    {
        field: "created_at",
        headerName: "Dibuat Pada",
        width: 200,
        editable: false,
        valueFormatter: (params: any) => formatDate(params?.value as string),
    },
    {
        field: "action",
        headerName: "Action",
        width: 250,
        editable: false,
        renderCell: (params: any) => {
            return (
                <div className="flex items-center gap-2">
                    <Link
                        preserveState
                        className="text-xs bg-green-400 px-4 py-2 rounded-md text-white border-gray-400 hover:bg-green-500 hover:text-gray-white hover:border-gray-400"
                        type="button"
                        method="get"
                        href={route(
                            "admin.schedule-backup.restore",
                            params.row.id
                        )}
                    >
                        Restore
                    </Link>
                    <AlertDialog>
                        <AlertDialogTrigger>
                            <span className="text-xs bg-red-400 px-4 py-2 rounded-md text-white border-gray-400 hover:bg-red-500 hover:text-gray-white hover:border-gray-400">
                                Hapus Permanen
                            </span>
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
                                <Link
                                    preserveState
                                    className=" bg-blue-500 px-4 py-2 rounded-md text-white border-gray-400 hover:bg-blue-600 hover:text-gray-white hover:border-gray-400"
                                    type="button"
                                    method="get"
                                    href={route(
                                        "admin.schedule-delete.delete",
                                        params.row.id
                                    )}
                                >
                                    Hapus Permanen
                                </Link>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            );
        },
    },
];

const DataTableRestoreSchedule = ({ rows }: any) => {
    return <DataTableCustom rows={rows} column={columns} />;
};

export default DataTableRestoreSchedule;
