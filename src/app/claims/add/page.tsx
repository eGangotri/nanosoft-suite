'use client';

import MainLayout from "@/components/_layout/main-layout";
import AddClaimPage from "@/components/claims/add/page";
import LoanApplicationForm from "@/components/loan-applications/LoanApplicationForm";

export default function AddClaim() {
  return (
    <MainLayout>
      <h1 className="text-2xl font-bold mb-4">Add Claim Page</h1>
      <AddClaimPage />
    </MainLayout>
  )
}

