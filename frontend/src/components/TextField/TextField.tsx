import React from 'react';

interface TextFieldProps {
    label: string;
    placeholder: string;
    value: string;
    onChange: (value: string) => void;
}

export const TextField: React.FC<TextFieldProps> = ({ label, placeholder, value, onChange }) => {
    return (
        <div className="text_field">
            <label htmlFor={label}>{label}</label>
            <input
                type="text"
                placeholder={placeholder}
                value={value} onChange={(e) => onChange(e.target.value)}
            />
        </div>
    );
};