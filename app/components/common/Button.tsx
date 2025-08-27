'use client';

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

    const baseStyle = `rounded-xl px-4 py-2 transition-colors
                        ${disabled ? "bg-gray-200" : ""}
                        ${disabled ? "cursor-auto" : "cursor-pointer"}
                    `;
    
    const variants = {
        primary: "text-white bg-gradient-to-r from-indigo-600 to-violet-600 shadow-md hover:shadow-lg hover:from-indigo-500 hover:to-violet-500 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/70 active:scale-[0.98]",
        outline: "border border-indigo-500/70 text-indigo-700 hover:text-indigo-800 hover:bg-indigo-50 transition shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/70 active:scale-[0.98]",
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

