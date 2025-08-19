'use client'

import classNames from "classnames";

interface ButtonProps {
    children?: React.ReactNode;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
    // size?: "sm"
    variant?: "primary" | "outline";
    disabled?: boolean;
    className?: string;
}

const Button = ({
    children,
    onClick,
    type = "button",
    variant = "primary",
    disabled = false,
    className = ""
}: ButtonProps) => {

    const baseStyle = `rounded-lg px-4 py-2 transition-colors
                        ${disabled ? "bg-gray-200" : ""}
                        ${disabled ? "cursor-auto" : "cursor-pointer"}
                    `;
    
    const variants = {
        primary: "bg-indigo-600 text-white hover:bg-indigo-700",
        outline: "border-1",
    }

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={classNames(baseStyle, variants[variant], className)}
        >
            {children}
        </button>
    );
};

export default Button;

