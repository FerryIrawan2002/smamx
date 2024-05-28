import React, { useState, useRef } from "react";
import { Input, InputProps } from "./ui/input";
import { Label } from "./ui/label";

interface InputLabelAdminProps {
    children?: React.ReactNode;
    labelFor: string;
    inputId: string;
    labelText: string;
    inputProps?: InputProps;
    maxLength?: number;
    error: string;
    variant?: keyof typeof variant;
}

const variant = {
    wajib: "wajib",
    opsional: "opsional",
};

const InputTextLabel: React.FC<InputLabelAdminProps> = ({
    children,
    labelFor,
    inputId,
    labelText,
    inputProps,
    maxLength,
    error,
    variant: variantProp = "wajib",
}) => {
    const [charCount, setCharCount] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleInput = (event: React.FormEvent<HTMLInputElement>) => {
        if (inputRef.current) {
            setCharCount(inputRef.current.value.length);
        }
    };

    return (
        <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                    <Label className="cursor-pointer" htmlFor={labelFor}>
                        {labelText}
                    </Label>
                    <span className="text-sm bg-blue-200 px-3 py-1 rounded-xl text-blue-600 font-semibold">
                        {variant[variantProp]}
                    </span>
                </div>

                <div className="flex items-center gap-4">
                    <div className="relative w-full">
                        {children}
                        <Input
                            ref={inputRef}
                            className="pl-9"
                            id={inputId}
                            {...inputProps}
                            maxLength={maxLength}
                            onInput={handleInput}
                            autoComplete="off"
                        />
                    </div>
                </div>
            </div>
            <div
                className={`flex text-sm items-center mt-1  ${
                    error ? "justify-between" : "text-gray-500 justify-end"
                }`}
            >
                {error && (
                    <p className="text-red-500 font-normal bg-red-50 py-2 px-6 border-red-300">
                        {error}
                    </p>
                )}
                {charCount} / {maxLength}{" "}
            </div>
        </div>
    );
};

export default InputTextLabel;
