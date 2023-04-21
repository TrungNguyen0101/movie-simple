import React from 'react';

const Button = ({ onClick, className, type = "button", children }) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`py-3 px-6 w-full bg-primary text-white font-medium rounded-lg
             mt-auto ${className}`}>{children}
        </button>
    );
};

export default Button;