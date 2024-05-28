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
import { router } from "@inertiajs/react";

import moment from "moment";
import { Trash2Icon } from "lucide-react";
import Edit from "../TeacherClassManagement/Edit";

moment.locale("id");
const RenderProfileImage = ({ value }: any) => {
    return (
        <img
            className="w-8 h-8 ml-2 rounded-full object-cover border"
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
        field: "kelas",
        headerName: "Kelas", // Adjust header name if needed
        width: 100,
        editable: true,
        renderCell: (params: any) => (
            <div className="flex items-center gap-3">
                <span>{params?.row?.class_room?.class_name}</span>
            </div>
        ),
    },
    {
        field: "guru",
        headerName: "Guru", // Adjust header name if needed
        width: 200,
        editable: true,
        renderCell: (params: any) => (
            <div className="flex items-center gap-3">
                <RenderProfileImage value={params?.row?.teacher?.photo} />
                <span>{params?.row?.teacher?.user?.name}</span>
            </div>
        ),
    },
    {
        field: "mapel",
        headerName: "Mata Pelajaran", // Adjust header name if needed
        width: 250,
        editable: true,
        renderCell: (params: any) => (
            <div className="flex items-center gap-3">
                <RenderProfileImage value={params?.row?.course?.photo} />
                <span>{params?.row?.course?.course_name}</span>
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
        width: 100,
        renderCell: (params: any) => {
            return (
                <div className="flex items-center gap-2">
                    <Edit jadwal={params?.row} />
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
                                            `/admin/jadwal/${params?.row?.id}`
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

const DataTableTeacherClass = ({ rows }: any) => {
    return <DataTableCustom rows={rows} column={columns} />;
};

export default DataTableTeacherClass;
