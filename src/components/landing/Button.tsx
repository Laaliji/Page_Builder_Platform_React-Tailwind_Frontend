import React from 'react';

const Button = ({ 
  href, 
  variant = 'primary', 
  className = '', 
  children 
}) => {
  const baseStyles = "w-full flex items-center justify-center px-8 py-3 text-base font-medium rounded-md md:py-4 md:text-lg md:px-10";
  
  const variants = {
    primary: "text-white bg-primary hover:bg-border hover:text-white border border-transparent",
    secondary: "text-secondary bg-background hover:bg-border hover:text-primary border border-primary"
  };

  return (
    <a
      href={href}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </a>
  );
};

export default Button;