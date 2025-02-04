import React, { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { BookUser, CircleX, Delete, DeleteIcon } from "lucide-react";

interface FileInputProps {
    onDrop: (acceptedFiles: File[]) => void;
    accept: any;
}

const FileInput: React.FC<FileInputProps> = ({ onDrop, accept }) => {
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [file, setFile] = useState<File | null>(null);

    const onDropAccepted = useCallback(
        (acceptedFiles: File[]) => {
            onDrop(acceptedFiles);
            setFile(acceptedFiles[0]);
            setPreviewImage(URL.createObjectURL(acceptedFiles[0]));
        },
        [onDrop]
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDropAccepted,
        accept,
    });

    useEffect(() => {
        return () => {
            if (file) {
                URL.revokeObjectURL(previewImage!);
            }
        };
    }, [file, previewImage]);

    const handleDeleteImage = () => {
        setPreviewImage(null);
        setFile(null);
    };

    return (
        <div className="flex flex-col items-center justify-center w-full">
            <div
                {...getRootProps()}
                className="flex flex-col items-center justify-center w-full h-44 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
                <input {...getInputProps()} />
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <BookUser className=" size-5 text-gray-600 absolute z-10 top-2.5  left-2.5" />
                    {isDragActive ? (
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                            Release to drop the files here
                        </p>
                    ) : (
                        <>
                            {previewImage ? (
                                <>
                                    <div className="mt-4 mb-2 size-36 relative overflow-hidden rounded-lg">
                                        <img
                                            src={previewImage}
                                            alt="Preview"
                                            className="w-full h-full rounded-full object-cover"
                                        />
                                        <button
                                            className="mb-2 z-20 absolute top-2.5  right-10 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                                            onClick={handleDeleteImage}
                                        >
                                            <CircleX className=" size-10 text-red-800  bg-red-400 rounded-full  absolute  " />
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                        <span className="font-semibold">
                                            Click to upload
                                        </span>{" "}
                                        or drag and drop
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        SVG, PNG, JPG or GIF (MAX. 10MB)
                                    </p>
                                </>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FileInput;
