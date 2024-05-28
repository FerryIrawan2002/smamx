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
import Edit from "../Task/Edit";

moment.locale("id");
function calculateDuration(startDate: any, endDate: any) {
    // Mengubah tanggal menjadi objek Date
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Menghitung selisih waktu dalam milidetik
    const difference = end.getTime() - start.getTime();

    // Jika hasilnya negatif, artinya deadline sudah lewat
    if (difference < 0) {
        return "Deadline sudah lewat";
    }

    // Mengonversi selisih waktu menjadi jumlah hari, jam, menit, dan detik
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    return `${days} hari`;
}

const formatDate = (dateString: string) => {
    const date = moment(dateString).locale("id");
    const formattedDate = date.format("DD MMMM YYYY - HH:mm");
    return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
};

function sanitizeAndValidateHTML(html: string) {
    const cleanHTML = html.replace(/<\/?script\b[^>]*>/g, "");

    return cleanHTML;
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
        field: "name",
        headerName: "Deskripsi",
        width: 150,
        editable: true,
        renderCell: (params: any) => {
            return (
                <div
                    style={{}}
                    dangerouslySetInnerHTML={{
                        __html: sanitizeAndValidateHTML(params.row.name),
                    }}
                />
            );
        },
    },
    {
        field: "desc",
        headerName: "Deskripsi",
        width: 600,
        editable: true,
        renderCell: (params: any) => {
            return (
                <div
                    style={{}}
                    dangerouslySetInnerHTML={{
                        __html: sanitizeAndValidateHTML(params.row.desc),
                    }}
                />
            );
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
        field: "jangka_waktu",
        headerName: "Jangka Waktu",
        width: 200,
        editable: true,
        renderCell: (params: any) => {
            const duration = calculateDuration(
                params.row.created_at,
                params.row.deadline
            );

            return (
                <div
                    style={{}}
                    dangerouslySetInnerHTML={{
                        __html: `${duration}`,
                    }}
                />
            );
        },
    },

    {
        field: "deadline",
        headerName: "Deadline",
        width: 200,
        editable: true,
        renderCell: (params: any) => {
            return (
                <div
                    style={{}}
                    dangerouslySetInnerHTML={{
                        __html: formatDate(params.row.deadline),
                    }}
                />
            );
        },
    },

    {
        field: "task_group",
        headerName: "Siswa",
        width: 100,
        editable: true,

        renderCell: (params: any) => {
            return (
                <div className="flex items-center gap-2">
                    <Link
                        href={`/guru/detail-tugas/${params.row.id}`}
                        className="bg-blue-500 hover:bg-blue-700 text-sm px-3 py-1 text-white rounded-lg"
                    >
                        Detail
                    </Link>
                </div>
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
                    <Edit task={params.row} />
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

const DataTableTask = ({ rows }: any) => {
    return <DataTableCustom rows={rows} column={columns} />;
};

export default DataTableTask;
