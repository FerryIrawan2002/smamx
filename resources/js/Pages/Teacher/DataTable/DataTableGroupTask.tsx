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
import EditPoint from "../Task/EditPoint";

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
        width: 150,
        editable: true,
        valueGetter: (params: GridValueGetterParams) => {
            return params?.row?.student?.user?.name;
        },
    },
    {
        field: "file",
        headerName: "File",
        width: 150,
        editable: true,
        renderCell: (params: any) => {
            return params?.row?.file ? (
                <a
                    className="flex justify-center items-center gap-2 bg-blue-500 hover:bg-blue-600 transform duration-300 text-white rounded-lg px-2 py-1"
                    href={
                        window.location.origin + "/storage/" + params?.row?.file
                    }
                >
                    {" "}
                    <Download size={16} />
                    <span className="text-xs">Download</span>
                </a>
            ) : (
                <span>- Tidak Ada File -</span>
            );
        },
    },
    {
        field: "point",
        headerName: "Nilai",
        width: 160,
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
        field: "dikumpulkan",
        headerName: "Tanggal Pengumpulan",
        width: 200,
        editable: true,
        valueGetter: (params: GridValueGetterParams) => {
            return formatDate(params?.row?.created_at);
        },
    },
    {
        field: "status",
        headerName: "Status",
        width: 200,
        editable: true,
        valueGetter: (params: GridValueGetterParams) => {
            return params?.row?.status;
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

const DataTableGropTask = ({ rows }: any) => {
    return <DataTableCustom rows={rows} column={columns} />;
};

export default DataTableGropTask;
