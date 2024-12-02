"use client";

import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

interface FormContainerProps {
  action: (formData: FormData) => Promise<{ message: string } | void>;
  children: React.ReactNode;
}

const FormContainer = ({ action, children }: FormContainerProps) => {
  const [state, setState] = useState<{ message: string } | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget); // Serialize form data
    try {
      const result = await action(formData); // Call the action function
      if (result?.message) {
        setState(result); // Update state with the action's result
      }
    } catch (error) {
      console.error("Error during form submission:", error);
      toast({ description: "Something went wrong. Please try again." });
    }
  };

  useEffect(() => {
    if (state?.message) {
      toast({ description: state.message });
    }
  }, [state, toast]);

  return <form onSubmit={handleSubmit}>{children}</form>;
};

export default FormContainer;
