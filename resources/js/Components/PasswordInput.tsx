import { EyeIcon, EyeOffIcon } from "lucide-react";
import React, { useState, useRef, useEffect, ChangeEvent } from "react";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";
// Sesuaikan dengan pustaka ikon yang Anda gunakan

interface PasswordInputProps {
    name: string;
    id: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    clearErrors?: (field: string) => void;
    className?: string;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
    name,
    id,
    value,
    onChange,
    clearErrors,
    className,
}) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [showIcon, setShowIcon] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    const handleShowPassword = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (
            inputRef.current &&
            !inputRef.current.contains(event.target as Node) &&
            buttonRef.current &&
            !buttonRef.current.contains(event.target as Node)
        ) {
            setShowIcon(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="relative">
            <Input
                ref={inputRef}
                name={name}
                id={id}
                type={isPasswordVisible ? "text" : "password"}
                value={value}
                onChange={onChange}
                onFocus={() => setShowIcon(true)}
                className={cn(className)}
            />
            {showIcon && (
                <button
                    ref={buttonRef}
                    type="button"
                    onClick={handleShowPassword}
                    className="absolute right-2 top-2"
                >
                    {isPasswordVisible ? (
                        <EyeIcon size={20} />
                    ) : (
                        <EyeOffIcon size={20} />
                    )}
                </button>
            )}
        </div>
    );
};

export default PasswordInput;
