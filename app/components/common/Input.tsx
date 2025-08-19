import React from 'react';

interface InputProps{
    placeholder?: string;
    disabled?: boolean;
    type?: "password" | "email" | "text"
}

const Input = ({
    placeholder,
    disabled = false,
    type = "text",
}: InputProps) => {
    return (
        <input 
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder={placeholder}
            disabled={disabled}
            type={type}
        />
    );
};

export default Input;