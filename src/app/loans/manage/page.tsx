'use client';
import MainLayout from "@/components/_layout/main-layout";
import LoanApplicationList from "@/components/loan-applications/LoanApplicationList";

export default function ManageLoansPage() {
  return (
    <MainLayout>
      <LoanApplicationList />
    </MainLayout>
  )
}

