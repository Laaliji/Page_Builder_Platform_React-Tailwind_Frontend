import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { BadgeCheck, Github, CreditCard, X } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import PaymentForm from "./PaymentForm";

const PricingDialog = ({ isOpen, onClose, projectId }) => {
  const [selectedPlan, setSelectedPlan] = useState("yearly");
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [accountUpgraded, setAccountUpgraded] = useState(false);
  const lang = useSelector((state) => state.values.selectedLang || "en");

  const plans = {
    monthly: {
      price: "$12",
      period: "/month",
      features: [
        "GitHub publishing",
        "Custom domain",
        "Export code",
        "Priority support",
        "Remove watermark",
      ],
      saveText: "",
    },
    yearly: {
      price: "$99",
      period: "/year",
      features: [
        "GitHub publishing",
        "Custom domain",
        "Export code",
        "Priority support",
        "Remove watermark",
        "Advanced analytics",
      ],
      saveText: "Save 30%",
    },
  };

  const handleUpgradeClick = () => {
    setShowPaymentForm(true);
  };

  const handlePaymentClose = () => {
    // Check if this specific project was upgraded
    const upgradedProjects = JSON.parse(localStorage.getItem('upgradedProjects') || '{}');
    if (upgradedProjects[projectId] && upgradedProjects[projectId].active) {
      setAccountUpgraded(true);
    }
    
    setShowPaymentForm(false);
    // When account is upgraded, we can close the pricing dialog too
    setTimeout(() => {
      onClose();
    }, 1000);
  };

  // If account is already upgraded, just close the dialog
  const handleDialogClose = () => {
    if (accountUpgraded) {
      setShowPaymentForm(false);
      onClose();
    } else if (showPaymentForm) {
      setShowPaymentForm(false);
    } else {
      onClose();
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={handleDialogClose}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader className="text-center">
            <DialogTitle className="text-2xl font-bold">
              Upgrade to Publish
            </DialogTitle>
            <DialogDescription className="text-muted-foreground mt-2">
              Connect to GitHub and publish your website directly from the editor.
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {/* Plan toggle */}
            <div className="md:col-span-2 flex justify-center mb-4">
              <div className="bg-slate-100 p-1 rounded-full">
                <div className="flex">
                  <button
                    onClick={() => setSelectedPlan("monthly")}
                    className={`px-4 py-2 rounded-full text-sm font-medium ${
                      selectedPlan === "monthly"
                        ? "bg-white shadow-sm"
                        : "text-slate-500"
                    }`}
                  >
                    Monthly
                  </button>
                  <button
                    onClick={() => setSelectedPlan("yearly")}
                    className={`px-4 py-2 rounded-full text-sm font-medium ${
                      selectedPlan === "yearly"
                        ? "bg-white shadow-sm"
                        : "text-slate-500"
                    } flex items-center gap-2`}
                  >
                    <span>Yearly</span>
                    {selectedPlan === "yearly" && (
                      <span className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-0.5 rounded-full">
                        -30%
                      </span>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Monthly Plan */}
            <div 
              className={`border rounded-xl p-5 ${
                selectedPlan === "monthly" ? "border-blue-500 ring-2 ring-blue-100" : "border-slate-200"
              }`}
              onClick={() => setSelectedPlan("monthly")}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg">Monthly</h3>
                  <p className="text-slate-500 text-sm">Perfect for short-term projects</p>
                </div>
                <div className="flex items-center justify-center w-5 h-5 border rounded-full border-slate-300 text-white">
                  {selectedPlan === "monthly" && <div className="w-3 h-3 rounded-full bg-blue-500" />}
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold">{plans.monthly.price}</span>
                  <span className="text-slate-500 ml-1">{plans.monthly.period}</span>
                </div>
              </div>
              <Separator className="my-4" />
              <ul className="space-y-3">
                {plans.monthly.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm">
                    <BadgeCheck className="h-4 w-4 text-green-500 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Yearly Plan */}
            <div 
              className={`border rounded-xl p-5 ${
                selectedPlan === "yearly" ? "border-blue-500 ring-2 ring-blue-100" : "border-slate-200"
              }`}
              onClick={() => setSelectedPlan("yearly")}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg">Yearly</h3>
                  <p className="text-slate-500 text-sm">Best value for long-term projects</p>
                </div>
                <div className="flex items-center justify-center w-5 h-5 border rounded-full border-slate-300 text-white">
                  {selectedPlan === "yearly" && <div className="w-3 h-3 rounded-full bg-blue-500" />}
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold">{plans.yearly.price}</span>
                  <span className="text-slate-500 ml-1">{plans.yearly.period}</span>
                  {plans.yearly.saveText && (
                    <span className="ml-2 text-xs font-semibold text-green-600 bg-green-100 rounded-full px-2 py-0.5">
                      {plans.yearly.saveText}
                    </span>
                  )}
                </div>
              </div>
              <Separator className="my-4" />
              <ul className="space-y-3">
                {plans.yearly.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm">
                    <BadgeCheck className="h-4 w-4 text-green-500 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <DialogFooter className="flex flex-col sm:flex-row gap-2 mt-6">
            <Button 
              variant="outline" 
              onClick={onClose}
              className="w-full sm:w-auto order-2 sm:order-1"
            >
              Maybe Later
            </Button>
            <Button 
              className="w-full sm:w-auto order-1 sm:order-2 bg-primary hover:bg-secondary flex gap-2 items-center"
              onClick={handleUpgradeClick}
            >
              <CreditCard className="h-4 w-4" />
              <span>Upgrade Now ({selectedPlan === "yearly" ? plans.yearly.price : plans.monthly.price})</span>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Payment Form Dialog */}
      <PaymentForm 
        isOpen={showPaymentForm} 
        onClose={handlePaymentClose}
        selectedPlan={selectedPlan}
        planDetails={plans[selectedPlan]}
        projectId={projectId}
      />
    </>
  );
};

export default PricingDialog; 