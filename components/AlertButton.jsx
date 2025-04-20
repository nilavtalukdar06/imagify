"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import Script from "next/script";
import { useState } from "react";

export function AlertButton() {
  const { user } = useUser();
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async () => {
    setIsProcessing(true);
    try {
      const response = await fetch("/api/create-order", {
        method: "POST",
        body: JSON.stringify({
          email: user?.primaryEmailAddress?.emailAddress,
        }),
      });
      const data = await response.json();

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // This will work if env is set correctly
        amount: 20 * 100,
        currency: "INR",
        name: "Imagify",
        description: "Credit refill",
        order_id: data.orderId,
        handler: function (response) {
          console.log("Payment Successful", response);
          window.location.reload(); // Refresh the page after successful payment
        },
        prefill: {
          name: "Imagify",
          email: user?.primaryEmailAddress?.emailAddress || "Imagify@gmail.com",
        },
        theme: {
          color: "#3399c",
        },
      };
      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error("Payment Failed", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <AlertDialog>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <AlertDialogTrigger asChild>
        <Button variant="outline" className="cursor-pointer">
          Buy Credits 🤑
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            Refill your credits to 50 credits at just rupees 20&#8377;
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white cursor-pointer"
            disabled={isProcessing}
            onClick={handlePayment}
          >
            {isProcessing ? "Processing..." : "Pay Now"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
