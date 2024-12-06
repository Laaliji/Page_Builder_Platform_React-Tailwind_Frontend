import React from 'react';

interface ButtonProps {
  href?: string;
  variant?: 'primary' | 'secondary';  // Narrowed type to specific variants
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;  // Added disabled prop
}

const Button: React.FC<ButtonProps> = ({
  href,
  variant = 'primary',
  className = '',
  children,
  onClick,
  disabled = false  // Added with default value
}) => {
  const baseStyles = "w-full flex items-center justify-center px-8 py-3 text-base font-medium rounded-md md:py-4 md:text-lg md:px-10";
 
  const variants = {
    primary: "text-white bg-primary hover:bg-border hover:text-white border border-transparent disabled:opacity-50 disabled:cursor-not-allowed",
    secondary: "text-secondary bg-background hover:bg-border hover:text-primary border border-primary disabled:opacity-50 disabled:cursor-not-allowed"
  };

  const buttonClass = `${baseStyles} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <a href={href} className={buttonClass}>
        {children}
      </a>
    );
  }

  return (
    <button
      onClick={onClick}
      className={buttonClass}
      type="button"
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;