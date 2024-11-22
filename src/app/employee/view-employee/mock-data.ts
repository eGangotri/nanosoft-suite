import { Employee } from "@/components/employee/types";
import { EmployeeData } from "@/components/employee/types";

const mockEmployeeData: EmployeeData = {
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
  } as Employee,

  hrDetails: {
    id: 1,
    employeeId: 1,
    dateOfJoining: new Date("2020-01-15"),
    bonus: 5000.00,
    passportNumber: "A1234567",
    passportIssueDate: new Date("2018-06-01"),
    passportExpiryDate: new Date("2028-05-31"),
    passType: "EP",
    passExpiryDate: new Date("2025-12-31"),
    renewalApplyDate: null,
    newApplyDate: null,
    passCancelledDate: null,
    clientId: 2,
    remarks: "Excellent performer"
  },
  emergencyContacts: [
    {
      id: 1,
      employeeId: 1,
      personName: "Jane Doe",
      relationship: "spouse",
      mobile: "+6592345678",
      address: "123 Main Street, Singapore 123456"
    }
  ],
  bankDetails: {
    id: 1,
    employeeId: 1,
    bankName: "DBS Bank",
    employeeBankingName: "John Michael Doe",
    accountNumber: "1234567890",
    accountType: "Savings"
  },
  leaveBalances: [
    {
      id: 1,
      employeeId: 1,
      leaveTypeId: 1,
      balance: 14
    },
    {
      id: 2,
      employeeId: 1,
      leaveTypeId: 2,
      balance: 7
    }
  ],
  workHistory: [
    {
      id: 1,
      employeeId: 1,
      jobTitle: "Software Engineer",
      startDate: new Date("2020-01-15"),
      endDate: new Date("2022-06-30"),
      department: "Engineering",
      responsibilities: "Developed and maintained web applications",
      technologiesUsed: "React, Node.js, PostgreSQL"
    },
    {
      id: 2,
      employeeId: 1,
      jobTitle: "Senior Software Engineer",
      startDate: new Date("2022-07-01"),
      endDate: null,
      department: "Engineering",
      responsibilities: "Lead development team, architect solutions",
      technologiesUsed: "React, Next.js, TypeScript, AWS"
    }
  ]
};

