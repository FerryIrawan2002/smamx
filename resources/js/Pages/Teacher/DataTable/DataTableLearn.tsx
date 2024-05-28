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
import { router } from "@inertiajs/react";
import { CircleX, Download, Trash2Icon } from "lucide-react";
import CreateFileLearn from "../Dashboard/CreateFileLearn";
import Edit from "../Dashboard/Edit";
import sanitizeAndValidateHTML from "@/lib/SanitizeHTML";

moment.locale("id");

const formatDate = (dateString: string) => {
    const date = moment(dateString).locale("id");
    const formattedDate = date.format("DD MMMM YYYY");
    return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
};

const LearnComponent = ({ learn }: any) => {
    const sanitizedHTML = sanitizeAndValidateHTML(learn.desc);

    return (
        <div className="flex ml-5 flex-col gap-1 mt-2">
            <span>Deskripsi : </span>
            <div
                dangerouslySetInnerHTML={{
                    __html: sanitizedHTML,
                }}
            ></div>
        </div>
    );
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
        field: "week",
        headerName: "Minggu",
        width: 120,
        editable: true,
    },

    {
        field: "desc",
        headerName: "Deskripsi",
        width: 500,
        editable: true,
        renderCell: (params: any) => {
            return <LearnComponent learn={params.row} />;
        },
    },
    {
        field: "file.length",
        headerName: "Jumlah File",
        width: 150,
        editable: true,
        valueGetter: (params: GridValueGetterParams) => {
            return params.row.learnfile
                ? params.row.learnfile.length + " File"
                : 0 + " File";
        },
    },
    {
        field: "file",
        headerName: "File",
        width: 400,
        editable: true,
        renderCell: (params: any) => {
            return (
                <div className="flex flex-col gap-2   ">
                    {params.row.learnfile && params.row.learnfile.length > 0 ? (
                        params.row.learnfile.map((file: any) => (
                            <>
                                <div className=" w-[360px] flex items-center justify-between">
                                    <a
                                        href={
                                            window.location.origin +
                                            "/storage/" +
                                            file.file
                                        }
                                        className="flex mr-2 items-center gap-2 bg-blue-500 text-blue-50 px-3 py-1.5 rounded-lg  "
                                    >
                                        <div>
                                            <Download className="size-5" />
                                        </div>
                                        <span className=" text-xs font-semibold">
                                            {file.name}
                                        </span>
                                    </a>
                                    <AlertDialog>
                                        <AlertDialogTrigger>
                                            <CircleX className=" text-red-500 bg-red-200 rounded-full" />
                                        </AlertDialogTrigger>
                                        <AlertDialogContent className="bg-white">
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>
                                                    Apakah anda yakin ingin
                                                    menghapus?
                                                </AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    Tindakan ini tidak bisa
                                                    dibatalkan. Ini akan hapus
                                                    akun Anda secara permanen
                                                    dan hapus akun Anda data
                                                    dari server kami.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>
                                                    Cancel
                                                </AlertDialogCancel>
                                                <AlertDialogAction
                                                    type="button"
                                                    className="bg-blue-500 hover:bg-blue-700 text-white"
                                                    onClick={() => {
                                                        router.delete(
                                                            `/guru/file/${file.id}`,
                                                            {
                                                                preserveScroll:
                                                                    true,
                                                            }
                                                        );
                                                    }}
                                                >
                                                    Continue
                                                </AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </div>{" "}
                            </>
                        ))
                    ) : (
                        <div className="flex items-center gap-2">
                            <CreateFileLearn id={params.row.id} />
                        </div>
                    )}{" "}
                    <div className="flex items-center gap-2">
                        <CreateFileLearn id={params.row.id} />
                    </div>
                </div>
            );
        },
    },

    {
        field: "created_at",
        headerName: "Dibuat Pada",
        width: 150,
        editable: false,
        valueFormatter: (params: any) => formatDate(params.value as string),
    },
    {
        field: "action",
        headerName: "Action",
        width: 100,
        renderCell: (params: any) => {
            return (
                <div className="flex items-center gap-2">
                    <Edit learn={params.row} />
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
                                <button
                                    type="button"
                                    className="bg-blue-500 hover:bg-blue-700 text-white"
                                    onSubmit={() => {
                                        router.delete(
                                            `/guru/dashboard/${params.row.id}`,
                                            {
                                                preserveScroll: true,
                                            }
                                        );
                                    }}
                                >
                                    Continue
                                </button>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            );
        },
    },
];

const DataTableLearn = ({ rows }: any) => {
    return <DataTableCustom rows={rows} column={columns} />;
};

export default DataTableLearn;
