import React from "react";
import { Button } from "@/components/ui/button";
import { FaGithub } from "react-icons/fa";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * GitHub styled button component for authentication and linking
 * 
 * @param {Object} props - Component props
 * @param {string} props.children - Button text content
 * @param {function} props.onClick - Click handler function
 * @param {boolean} props.loading - Whether the button is in loading state
 * @param {boolean} props.disabled - Whether the button is disabled
 * @param {string} props.className - Additional CSS classes
 * @param {string} props.variant - Button variant ('auth' or 'link')
 * @param {Object} props.rest - Any additional props to pass to the Button component
 */
export const GitHubButton = ({
  children,
  onClick,
  loading = false,
  disabled = false,
  className = "",
  variant = "auth", // 'auth' or 'link'
  ...rest
}) => {
  // Determine button style based on variant
  const buttonStyle = variant === "auth" 
    ? "w-full bg-gray-800 hover:bg-gray-900 text-white" 
    : "bg-black hover:bg-gray-900 text-white";

  return (
    <Button
      className={cn(buttonStyle, "flex items-center justify-center gap-2", className)}
      onClick={onClick}
      disabled={disabled || loading}
      {...rest}
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <FaGithub className={variant === "auth" ? "h-5 w-5" : "h-4 w-4"} />
      )}
      <span>{children}</span>
    </Button>
  );
}; 