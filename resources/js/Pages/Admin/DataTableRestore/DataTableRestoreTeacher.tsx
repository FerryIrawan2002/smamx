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
import { Link } from "@inertiajs/react";

import moment from "moment";

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
        field: "nip",
        headerName: "NIP", // Adjust header name if needed
        width: 180,
        editable: true,
        valueGetter: (params: GridValueGetterParams) => {
            return params?.row?.teacher?.nip;
        },
    },
    {
        field: "photo",
        headerName: "Foto", // Adjust header name if needed
        width: 100,
        editable: true,
        renderCell: (params: any) => (
            <RenderProfileImage value={params?.row?.teacher?.photo} />
        ),
    },
    {
        field: "name",
        headerName: "Nama",
        width: 200,
        editable: true,
    },
    {
        field: "email",
        headerName: "Email",
        width: 200,
        editable: true,
    },
    {
        field: "gender",
        headerName: "Gender", // Adjust header name if needed
        width: 150,
        editable: true,
        valueGetter: (params: GridValueGetterParams) => {
            return params?.row?.teacher?.gender;
        },
    },
    {
        field: "education",
        headerName: "Pendidikan", // Adjust header name if needed
        width: 200,
        editable: true,
        valueGetter: (params: GridValueGetterParams) => {
            return params?.row?.teacher?.education;
        },
    },
    {
        field: "copy_password",
        headerName: "Copy Password",
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
                        href={route("admin.guru-backup.restore", params.row.id)}
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
                                        "admin.guru-delete.delete",
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

const DataTableRestoreTeacher = ({ rows }: any) => {
    return <DataTableCustom rows={rows} column={columns} />;
};

export default DataTableRestoreTeacher;
