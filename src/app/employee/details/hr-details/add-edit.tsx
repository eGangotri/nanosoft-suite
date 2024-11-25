import React from 'react';
import { notFound } from 'next/navigation';
import HrDetailsForm from '@/components/employee/details/hr/hrDetailsForm';
import { HrDetailsFormData } from '@/components/employee/details/hr/constants';
import nanosoftPrisma from '@/lib/prisma';
import { fetchHrDetails } from '@/services/employeeService';

async function getEmployees() {
  const employees = await nanosoftPrisma.employee.findMany({
    select: { id: true, firstName: true, lastName: true },
  });
  return employees.map(e => ({ id: e.id, name: `${e.firstName} ${e.lastName}` }));
}

async function getClients() {
  const clients = await nanosoftPrisma.client.findMany({
    select: { id: true, companyName: true },
  });
  return clients;
}

export default async function EmployeeHrDetailsPage({ params }: { params: { employeeId: string } }) {
  const id = parseInt(params.employeeId);
  const employeeHrDetails = id !== 0 ? await fetchHrDetails(id) : null;
  const employees = await getEmployees();
  const clients = await getClients();

  if (id !== 0 && !employeeHrDetails) {
    notFound();
  }

  const initialData: HrDetailsFormData | undefined = employeeHrDetails
    ? {
        ...employeeHrDetails,
        dateOfJoining: employeeHrDetails.dateOfJoining.toISOString().split('T')[0],
        passportIssueDate: employeeHrDetails.passportIssueDate.toISOString().split('T')[0],
        passportExpiryDate: employeeHrDetails.passportExpiryDate.toISOString().split('T')[0],
        passExpiryDate: employeeHrDetails.passExpiryDate?.toISOString().split('T')[0] || null,
        renewalApplyDate: employeeHrDetails.renewalApplyDate?.toISOString().split('T')[0] || null,
        newApplyDate: employeeHrDetails.newApplyDate?.toISOString().split('T')[0] || null,
        passCancelledDate: employeeHrDetails.passCancelledDate?.toISOString().split('T')[0] || null,
      }
    : undefined;

  return (
    <HrDetailsForm
      initialData={initialData}
      onSubmit={async (data) => {
        'use server'
        if (id === 0) {
          await nanosoftPrisma.employeeHrDetails.create({ data });
        } else {
          await nanosoftPrisma.employeeHrDetails.update({
            where: { id },
            data,
          });
        }
      }}
      employees={employees}
      clients={clients}
    />
  );
}

