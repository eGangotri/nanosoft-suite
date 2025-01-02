import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import jsPDF from 'jspdf';
import { formatedEmployeeName } from '@/components/employee/EmployeeUtils';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const payslipId = parseInt(params.id);

  try {
    const payslip = await prisma.payslip.findUnique({
      where: { id: payslipId },
      include: { Employee: true },
    });

    if (!payslip) {
      return NextResponse.json({ error: 'Payslip not found' }, { status: 404 });
    }

    const empName = formatedEmployeeName(payslip.Employee);
    const payPeriod = new Date(payslip.payPeriod).toLocaleDateString('en-SG', { year: 'numeric', month: 'long' });

    // Create a new PDF document
    const doc = new jsPDF();

    // Add content to the PDF
    doc.setFontSize(18);
    doc.text('Payslip', 105, 15, { align: 'center' });
    
    doc.setFontSize(12);
    doc.text(`Employee: ${empName}`, 20, 30);
    doc.text(`Pay Period: ${payPeriod}`, 20, 40);
    
    doc.text(`Basic Salary: $${payslip.basicSalary.toFixed(2)}`, 20, 55);
    doc.text(`Overtime: $${payslip.overtime.toFixed(2)}`, 20, 65);
    doc.text(`Allowances: $${Object.values(payslip.allowances as Record<string, number>).reduce((a, b) => a + b, 0).toFixed(2)}`, 20, 75);
    doc.text(`Deductions: $${Object.values(payslip.deductions as Record<string, number>).reduce((a, b) => a + b, 0).toFixed(2)}`, 20, 85);
    doc.text(`CPF (Employee): $${payslip.cpfEmployeeContrib.toFixed(2)}`, 20, 95);
    doc.text(`CPF (Employer): $${payslip.cpfEmployerContrib.toFixed(2)}`, 20, 105);
    
    doc.text(`Gross Salary: $${payslip.grossSalary.toFixed(2)}`, 20, 120);
    doc.text(`Net Salary: $${payslip.netSalary.toFixed(2)}`, 20, 130);

    // Generate the PDF as a Uint8Array
    const pdfData = doc.output('arraybuffer');

    const pdfFileName = `payslip-${empName.trim().replace(/[^a-z0-9\s\.]/gi, '-')}-${payPeriod.trim().replace(/[^a-z0-9\s\.]/gi, '-')}.pdf`;
    // Return the PDF as a downloadable file
    return new NextResponse(pdfData, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename=${pdfFileName}`,
      },
    });

  } catch (error) {
    console.error('Error generating payslip PDF:', error);
    return NextResponse.json({ error: 'Failed to generate payslip PDF' }, { status: 500 });
  }
}

