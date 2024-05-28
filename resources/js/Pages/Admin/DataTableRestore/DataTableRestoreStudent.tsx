import DataTableCustom from "@/Components/DataTableCustom";
import { Link, router } from "@inertiajs/react";
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
import Edit from "../StudentManagement/Edit";

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
        field: "nisn",
        headerName: "NISN",
        width: 200,
        editable: true,
        valueGetter: (params: GridValueGetterParams) => {
            return params?.row?.student?.nisn;
        },
    },
    {
        field: "name",
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
        field: "tahun_masuk",
        headerName: "Tahun Masuk",
        width: 200,
        editable: true,
        valueGetter: (params: GridValueGetterParams) => {
            return params?.row?.student?.entry_year;
        },
    },
    {
        field: "kelas",
        headerName: "Kelas",
        width: 200,
        editable: true,
        valueGetter: (params: GridValueGetterParams) => {
            return params?.row?.student?.classroom?.class_name;
        },
    },
    {
        field: "gender",
        headerName: "Jenis Kelamin",
        width: 200,
        editable: true,
        valueGetter: (params: GridValueGetterParams) => {
            return params?.row?.student?.gender;
        },
    },
    {
        field: "no_hp",
        headerName: "No HP",
        width: 200,
        editable: true,
        valueGetter: (params: GridValueGetterParams) => {
            return params?.row?.student?.phone_number;
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
        field: "action",
        headerName: "Action",
        width: 250,
        editable: false,
        renderCell: (params: any) => {
            return (
                <div className="flex items-center gap-2">
                    <Link
                        preserveState
                        className="text-xs bg-green-500 px-4 py-2 rounded-md text-white border-gray-400 hover:bg-green-500 hover:text-gray-white hover:border-gray-400"
                        type="button"
                        method="get"
                        href={route(
                            "admin.siswa-backup.restore",
                            params.row.id
                        )}
                    >
                        Restore
                    </Link>
                    <AlertDialog>
                        <AlertDialogTrigger>
                            <span className="text-xs bg-red-500 px-4 py-2 rounded-md text-white border-gray-400 hover:bg-red-500 hover:text-gray-white hover:border-gray-400">
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
                                        "admin.siswa-delete.delete",
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

const DataTableRestoreStudent = ({ rows }: any) => {
    return <DataTableCustom rows={rows} column={columns} />;
};

export default DataTableRestoreStudent;
