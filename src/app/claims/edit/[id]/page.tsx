'use client';
import MainLayout from "@/components/_layout/main-layout";
import EditClaimPage from "@/components/claims/edit/[id]/page";
import LoanApplicationManager from "@/components/loan-applications/LoanApplicationManager";

export default function EdidClaim({ params }: { params: { id: string } }) {
  return (
    <MainLayout>
      <EditClaimPage />
    </MainLayout>
  )
}

