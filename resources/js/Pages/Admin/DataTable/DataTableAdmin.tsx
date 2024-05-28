import DataTableCustom from "@/Components/DataTableCustom";
import { router } from "@inertiajs/react";
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
import moment from "moment";
import { Trash2Icon } from "lucide-react";

moment.locale("id");

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
        field: "nama",
        headerName: "Nama",
        width: 200,
        editable: true,
        valueGetter: (params: GridValueGetterParams) => {
            return params?.row?.name;
        },
    },
    {
        field: "email",
        headerName: "Email",
        width: 200,
        editable: true,
        valueGetter: (params: GridValueGetterParams) => {
            return params?.row?.email;
        },
    },
    {
        field: "copy_password",
        headerName: "Password",
        width: 200,
        editable: true,
        valueGetter: (params: GridValueGetterParams) => {
            return params?.row?.copy_password;
        },
    },
    {
        field: "status",
        headerName: "Status",
        width: 150,
        editable: true,
        renderCell(params) {
            return (
                <span
                    className={`px-4 py-1 text-xs text-white rounded-full ${
                        params?.row?.status ? "bg-green-600 " : "bg-red-500"
                    }`}
                >
                    {params?.row?.status ? "Aktif" : "Tidak aktif"}
                </span>
            );
        },
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
                                            `/admin/admin/${params?.row?.id}`
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
            ``;
        },
    },
];

const DataTableAdmin = ({ rows }: any) => {
    return <DataTableCustom rows={rows} column={columns} />;
};

export default DataTableAdmin;
