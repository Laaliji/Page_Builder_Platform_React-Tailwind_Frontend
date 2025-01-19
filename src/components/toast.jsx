import { useToast } from "@/hooks/use-toast";
import { AlertCircle, AlertTriangle, CheckCircle } from "lucide-react";

const useSuccessToast = () => {
  const { toast } = useToast();

  return (message) => {
    toast({
      variant: "custom",
      className:
        "bg-[#23861e] border-none text-white text-md py-4 pl-2 font-[Poppins]",
      action: (
        <div className="w-full flex items-center -p-1">
          <CheckCircle className="mr-3" />
          {message}
        </div>
      ),
    });
  };
};

const useAlertToast = () => {
  const { toast } = useToast();

  return (message) => {
    toast({
      variant: "custom",
      className:
        "bg-[#ff6d00] border-none text-white text-md py-4 pl-2 font-[Poppins]",
      action: (
        <div className="w-full flex items-center -p-1">
          <AlertCircle className="mr-3" />
          {message}
        </div>
      ),
    });
  };
};

const useErrorToast = () => {
  const { toast } = useToast();

  return (message) => {
    toast({
      variant: "destructive",
      className: "text-white text-md py-5 pl-2 font-[Poppins]",
      action: (
        <div className="w-full flex items-center -p-1">
          <div>
            <div className="text-lg flex items-center">
              <AlertTriangle className="mr-3" size="20" />
              Oups ! Une erreur s'est produite.
            </div>
            <span className="text-sm opacity-80">
              {message || "Veuillez réessayer."}
            </span>
          </div>
        </div>
      ),
    });
  };
};

export { useSuccessToast, useErrorToast, useAlertToast };
