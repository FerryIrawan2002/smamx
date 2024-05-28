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
import Edit from "../Exam/Edit";
import { useState } from "react";

moment.locale("id");

const formatDate = (dateString: string) => {
    const date = moment(dateString).locale("id");
    const formattedDate = date.format("DD MMMM YYYY - HH:mm");
    return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
};

function getCodeUrl(url: any) {
    var id = url.match(/\/e\/([^/]+)/)[1];
    var shortenedId = id.substr(id.length - 5);
    return shortenedId;
}
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
        field: "exam_name",
        headerName: "Nama Ujian",
        width: 200,
        editable: true,
        renderCell: (params: any) => {
            return <span>{params.row.name_exam}</span>;
        },
    },
    {
        field: "url",
        headerName: "Link Ujian",
        width: 800,
        editable: true,
        renderCell: (params: any) => {
            return (
                <a
                    className="underline text-blue-500"
                    href={params.row.url}
                    target="_blank"
                >
                    {params.row.url}
                </a>
            );
        },
    },
    {
        field: "kode",
        headerName: "Kode Ujian",
        width: 100,
        editable: false,
        renderCell: (params: any) => {
            return <span>{getCodeUrl(params?.row?.url)}</span>;
        },
    },
    {
        field: "created_at",
        headerName: "Dibuat Pada",
        width: 200,
        editable: true,
        renderCell: (params: any) => {
            return (
                <div
                    style={{}}
                    dangerouslySetInnerHTML={{
                        __html: formatDate(params.row.created_at),
                    }}
                />
            );
        },
    },
    {
        field: "exam_date",
        headerName: "Tanggal Ujian",
        width: 200,
        editable: true,
        renderCell: (params: any) => {
            return (
                <div
                    style={{}}
                    dangerouslySetInnerHTML={{
                        __html: formatDate(params.row.exam_date),
                    }}
                />
            );
        },
    },
    {
        field: "exam_group",
        headerName: "Siswa",
        width: 100,
        editable: true,

        renderCell: (params: any) => {
            return (
                <div className="flex items-center gap-2">
                    <Link
                        href={`/guru/detail-ujian/${params.row.id}`}
                        className="bg-blue-500 hover:bg-blue-700 text-sm px-3 py-1 text-white rounded-lg"
                    >
                        Detail
                    </Link>
                </div>
            );
        },
    },
    {
        field: "status",
        headerName: "Status",
        width: 120,
        editable: false,
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
        width: 100,
        renderCell: (params: any) => {
            return (
                <div className="flex items-center gap-2">
                    <Edit exam={params.row} />
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
                                            `/guru/ujian/${params.row.id}`
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

const DataTableExam = ({ rows }: any) => {
    return <DataTableCustom rows={rows} column={columns} />;
};

export default DataTableExam;
