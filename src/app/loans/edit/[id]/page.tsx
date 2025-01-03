'use client';
import MainLayout from "@/components/_layout/main-layout";
import LoanApplicationManager from "@/components/loan-applications/LoanApplicationManager";

export default function EditLoanApplicationPage({ params }: { params: { id: string } }) {
  return (
    <MainLayout>
      <LoanApplicationManager id={params.id} />
    </MainLayout>
  )
}

