import React from "react";

interface Props {
    labelName: string;
    optionMap: any[];
    errors: any;
    selectOptionProps: any;
    htmlFor: string;
    optionName: string;
    variant?: "wajib" | "opsional";
}

const variantLabels = {
    wajib: "wajib",
    opsional: "opsional",
};

const SelectOption = ({
    labelName,
    optionMap,
    errors,
    selectOptionProps,
    htmlFor,
    optionName,
    variant = "wajib", // Default to 'wajib' if no variant is provided
}: Props) => {
    return (
        <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
                <label htmlFor={htmlFor} className="font-medium text-sm">
                    {labelName}
                </label>
                <span className="text-sm bg-blue-200 px-3 py-1 rounded-xl text-blue-600 font-semibold">
                    {variantLabels[variant]}
                </span>
            </div>
            <div className="flex items-center gap-4">
                <select
                    className="w-full border-gray-400 rounded-lg"
                    id={htmlFor}
                    {...selectOptionProps}
                >
                    <option value="">- {optionName} -</option>
                    {optionMap}
                </select>
            </div>
            <div className="mt-2">
                {errors && (
                    <span className="text-red-500 mt-2 text-sm font-normal bg-red-50 py-2 px-6 border-red-300">
                        {errors}
                    </span>
                )}
            </div>
        </div>
    );
};

export default SelectOption;
