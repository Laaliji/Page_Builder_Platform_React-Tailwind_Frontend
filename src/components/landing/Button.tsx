import React from 'react';

interface ButtonProps {
  href?: string;
  variant?: string;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;  
}

const Button:  React.FC<ButtonProps> = ({ 
  href, 
  variant = 'primary', 
  className = '', 
  children,
  onClick
}) => {
  const baseStyles = "w-full flex items-center justify-center px-8 py-3 text-base font-medium rounded-md md:py-4 md:text-lg md:px-10";
  
  const variants = {
    primary: "text-white bg-primary hover:bg-border hover:text-white border border-transparent",
    secondary: "text-secondary bg-background hover:bg-border hover:text-primary border border-primary"
  };

  const buttonClass = `${baseStyles} ${variants[variant as keyof typeof variants]} ${className}`;

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
    >
      {children}
    </button>
  );
};

export default Button;