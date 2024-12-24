import { useLocation } from "react-router-dom";
import Mail from "@/components/admin/dash/mail";

function MailPage() {
  const location = useLocation();
  const data = location.state?.contactDetails; // Récupérer les données passées par navigation

  return (
    <div className="w-full space-y-4">
      <Mail data={data} />
    </div>
  );
}

export default MailPage;
