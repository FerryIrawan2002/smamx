import React, { ChangeEventHandler } from "react";
import { Label } from "./ui/label";

interface GenderSelectorProps {
    selectedGender: string;
    onChange: ChangeEventHandler<HTMLInputElement>;
    className?: string;
    variant?: keyof typeof variant;
}
const variant = {
    wajib: "wajib",
    opsional: "opsional",
};
const GenderSelector = ({
    selectedGender,
    onChange,
    className,
    variant: variantProp = "wajib",
}: GenderSelectorProps) => {
    return (
        <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
                {" "}
                <Label>Gender</Label>
                <span className="text-sm bg-blue-200 px-3 py-1 rounded-xl text-blue-600 font-semibold">
                    {variant[variantProp]}
                </span>
            </div>

            <div className={`flex items-center gap-2 ${className}`}>
                <label
                    htmlFor="perempuan"
                    className={`flex items-center gap-2 border bg-background rounded-lg px-4 py-2 cursor-pointer ${
                        selectedGender === "perempuan"
                            ? "border-primary"
                            : "border-gray-700"
                    }`}
                >
                    <input
                        type="radio"
                        id="perempuan"
                        name="gender"
                        className="focus:ring-0 focus:ring-purple-500 focus:ring-offset-0 text-primary"
                        value="perempuan"
                        checked={selectedGender === "perempuan"}
                        onChange={onChange}
                    />
                    <span className="text-sm cursor-pointer">perempuan</span>
                </label>
                <label
                    htmlFor="laki-laki"
                    className={`flex items-center gap-2 border bg-background rounded-lg px-4 py-2 cursor-pointer ${
                        selectedGender === "laki-laki"
                            ? "border-primary"
                            : "border-gray-700"
                    }`}
                >
                    <input
                        type="radio"
                        id="laki-laki"
                        name="gender"
                        className="focus:ring-0 focus:ring-purple-500 focus:ring-offset-0 text-primary"
                        value="laki-laki"
                        checked={selectedGender === "laki-laki"}
                        onChange={onChange}
                    />
                    <span className="text-sm cursor-pointer">laki-laki</span>
                </label>
            </div>
        </div>
    );
};

export default GenderSelector;
