import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSelector } from "react-redux";
import { CreditCard, CheckCircle, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const PaymentForm = ({ isOpen, onClose, selectedPlan, planDetails, projectId }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  });
  const lang = useSelector((state) => state.values.selectedLang || "en");

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Format card number with spaces
    if (name === "cardNumber") {
      const formatted = value.replace(/\s/g, "").replace(/(\d{4})/g, "$1 ").trim();
      setFormData({ ...formData, [name]: formatted.substring(0, 19) });
      return;
    }
    
    // Format expiry date with slash
    if (name === "expiryDate") {
      const cleaned = value.replace(/\//g, "");
      if (cleaned.length > 2) {
        const formatted = `${cleaned.substring(0, 2)}/${cleaned.substring(2, 4)}`;
        setFormData({ ...formData, [name]: formatted });
      } else {
        setFormData({ ...formData, [name]: cleaned });
      }
      return;
    }
    
    // Limit CVV to 3-4 digits
    if (name === "cvv") {
      const digits = value.replace(/\D/g, "");
      setFormData({ ...formData, [name]: digits.substring(0, 4) });
      return;
    }
    
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setLoading(false);
      
      // Store upgrade status for this specific project
      const upgradedProjects = JSON.parse(localStorage.getItem('upgradedProjects') || '{}');
      upgradedProjects[projectId] = {
        plan: selectedPlan,
        purchaseDate: new Date().toISOString(),
        active: true
      };
      localStorage.setItem('upgradedProjects', JSON.stringify(upgradedProjects));
      
      setStep(2); // Move to success state
    }, 2000);
  };

  const isFormValid = () => {
    return (
      formData.cardNumber.replace(/\s/g, "").length >= 16 &&
      formData.cardName.length > 3 &&
      formData.expiryDate.length === 5 &&
      formData.cvv.length >= 3
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <AnimatePresence mode="wait">
          {step === 1 ? (
            <motion.div
              key="payment-form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              <DialogHeader>
                <DialogTitle className="text-xl font-bold">
                  Payment Details
                </DialogTitle>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-full bg-blue-100">
                    <CreditCard className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-blue-900 text-sm">
                      {selectedPlan === "yearly" ? "Yearly Plan" : "Monthly Plan"}
                    </p>
                    <p className="text-blue-700 text-xs">
                      {planDetails?.price}{planDetails?.period}
                    </p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input
                    id="cardNumber"
                    name="cardNumber"
                    placeholder="4242 4242 4242 4242"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    className="font-mono"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="cardName">Cardholder Name</Label>
                  <Input
                    id="cardName"
                    name="cardName"
                    placeholder="John Doe"
                    value={formData.cardName}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiryDate">Expiry Date</Label>
                    <Input
                      id="expiryDate"
                      name="expiryDate"
                      placeholder="MM/YY"
                      value={formData.expiryDate}
                      onChange={handleChange}
                      className="font-mono"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="cvv">CVV</Label>
                    <Input
                      id="cvv"
                      name="cvv"
                      placeholder="123"
                      value={formData.cvv}
                      onChange={handleChange}
                      className="font-mono"
                      required
                    />
                  </div>
                </div>

                <DialogFooter className="mt-6 flex-col space-y-2 sm:space-y-0">
                  <div className="flex flex-col sm:flex-row gap-2 w-full">
                    <Button 
                      type="button" 
                      variant="outline" 
                      className="w-full" 
                      onClick={() => onClose()}
                    >
                      <ArrowLeft className="h-4 w-4 mr-2" /> Back
                    </Button>
                    <Button 
                      type="submit" 
                      className="w-full bg-primary hover:bg-secondary"
                      disabled={!isFormValid() || loading}
                    >
                      {loading ? (
                        <>
                          <span className="animate-pulse">Processing...</span>
                        </>
                      ) : (
                        <span>Complete Payment</span>
                      )}
                    </Button>
                  </div>
                  <p className="text-center text-xs text-gray-500 mt-4">
                    Your payment information is encrypted and secure. We never store your full card details.
                  </p>
                </DialogFooter>
              </form>
            </motion.div>
          ) : (
            <motion.div 
              key="success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, type: "spring", damping: 15 }}
              className="flex flex-col items-center text-center py-6"
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-xl font-bold mb-2">Payment Successful!</h2>
              <p className="text-gray-600 mb-6">
                This project has been upgraded to the {selectedPlan === "yearly" ? "yearly" : "monthly"} plan. 
                You can now publish this project directly to GitHub.
              </p>
              <Button 
                className="w-full bg-primary hover:bg-secondary"
                onClick={onClose}
              >
                Continue to Editor
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentForm; 