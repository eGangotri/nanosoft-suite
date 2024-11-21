import { EmployeeData } from "@/components/employee/types";

export const mockEmployeeData: EmployeeData = {
  employee: {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    middleName: "Michael",
    designation: "Senior Software Engineer",
    dateOfBirth: new Date("1985-05-15"),
    nationality: "Singaporean",
    email: "john.doe@example.com",
    mobile: "+6591234567",
    citizenshipStatus: "Citizen",
    nricOrFinNo: "S1234567A",
    expiryDate: null,
    maritalStatus: "Married",
    addressLine1: "123 Main Street",
    addressLine2: "#04-05",
    city: "Singapore",
    country: "Singapore",
    postalCode: "123456",
    active: true,
    deleted: false
  },
  
  hrDetails: {
    id: 1,
    employee_id: 1,
    date_of_joining: "2020-01-15",
    bonus: 5000.00,
    passport_number: "A1234567",
    passport_issue_date: "2018-06-01",
    passport_expiry_date: "2028-05-31",
    pass_type: "EP",
    pass_expiry_date: "2025-12-31",
    renewal_apply_date: null,
    new_apply_date: null,
    pass_cancelled_date: null,
    client_id: 2,
    remarks: "Excellent performer"
  },
  emergencyContact: {
    id: 1,
    employee_id: 1,
    person_name: "Jane Doe",
    relationship: "spouse",
    mobile: "+6592345678",
    address: "123 Main Street, Singapore 123456"
  },
  bankDetails: {
    id: 1,
    employee_id: 1,
    bank_name: "DBS Bank",
    employee_banking_name: "John Michael Doe",
    account_number: "1234567890",
    account_type: "Savings"
  },
  leaveBalances: [
    {
      id: 1,
      employee_id: 1,
      leave_type_id: 1,
      balance: 14
    },
    {
      id: 2,
      employee_id: 1,
      leave_type_id: 2,
      balance: 7
    }
  ],
  workHistory: [
    {
      id: 1,
      employee_id: 1,
      job_title: "Software Engineer",
      start_date: "2020-01-15",
      end_date: "2022-06-30",
      department: "Engineering",
      responsibilities: "Developed and maintained web applications",
      technologies_used: "React, Node.js, PostgreSQL"
    },
    {
      id: 2,
      employee_id: 1,
      job_title: "Senior Software Engineer",
      start_date: "2022-07-01",
      end_date: null,
      department: "Engineering",
      responsibilities: "Lead development team, architect solutions",
      technologies_used: "React, Next.js, TypeScript, AWS"
    }
  ]
};