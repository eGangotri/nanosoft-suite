'use client';

import MainLayout from "@/components/_layout/main-layout";
import LoanApplicationForm from "@/components/loan-applications/LoanApplicationForm";

export default function ApplyForLoanPage() {
  return (
    <MainLayout>
      <h1 className="text-2xl font-bold mb-4">Apply for a Loan</h1>
      <LoanApplicationForm />
    </MainLayout>
  )
}

