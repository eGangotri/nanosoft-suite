import { LeaveBalance, LeaveRequest } from "@prisma/client";

declare global {
  interface Employee {
    id: number;
    firstName: string;
    lastName: string;
    designation: string;
    dateOfBirth: Date;
    nationality: string;
    email: string;
    mobile: string;
    citizenshipStatus: CitizenCategory;
    gender: string;
    race: string;
    nricOrFinNo: string;
    expiryDate: Date | null;
    maritalStatus: string;
    addressLine1: string;
    addressLine2: string | null;
    city: string;
    country: string;
    postalCode: string;
    active: boolean;
    deleted: boolean;
    middleName: string | null;
    EmployeeBankDetails: EmployeeBankDetails | null;
    EmployeeEmergencyContact: EmployeeEmergencyContact[];
    EmployeeHrDetails: EmployeeHrDetails;
    EmployeeLeaveBalance: EmployeeLeaveBalance[];
    EmployeeWorkHistory: EmployeeWorkHistory[];
  }

  interface EmployeeHrDetails {
    id: number;
    employeeId: number;
    dateOfJoining: Date;
    bonus: number;
    salary: number;
    passportNumber: string;
    passportIssueDate: Date;
    passportExpiryDate: Date;
    passType: string| null;
    passExpiryDate: Date | null;
    renewalApplyDate: Date | null;
    newApplyDate: Date | null;
    passCancelledDate: Date | null;
    clientId: number | null;
    remarks: string | null;
    employee: Employee;
    client: Client | null;
    workpermitNumber: string | null;
    malaysiaIC: string | null;
  }

  interface EmployeeEmergencyContact {
    id: number;
    employeeId: number;
    personName: string;
    relationship: string;
    mobile: string;
    address: string;
    employee: Employee;
  }

  interface EmployeeBankDetails {
    id: number;
    employeeId: number;
    bankName: string;
    employeeBankingName: string;
    accountNumber: string;
    accountType: string;
    employee: Employee;
  }

  interface EmployeeLeaveBalance {
    id: number;
    employeeId: number;
    leaveTypeId: number;
    balance: number;
    employee: Employee;
    leaveType: LeaveType;
  }

  interface EmployeeWorkHistory {
    id: number;
    employeeId: number;
    jobTitle: string;
    startDate: Date;
    endDate: Date | null;
    department: string | null;
    responsibilities: string | null;
    technologiesUsed: string | null;
    employee: Employee;
  }

  interface Client {
    id: number;
    companyName: string;
    industry: string | null;
    primaryContact: string | null;
    contactEmail: string | null;
    contactPhone: string | null;
    currentOpenings: number | null;
    lastContactDate: Date | null;
    nextFollowUp: Date | null;
    status: string | null;
    notes: string | null;
    employeeHrDetails: EmployeeHrDetails[];
  }

  interface LeaveType {
    id: number;
    name: string;
    description: string | null;
    defaultDays: number;
    leaveCode: string | null;
    leaveBalances: LeaveBalance[];
    leaveRequests: LeaveRequest[];
    employeeLeaveBalances: EmployeeLeaveBalance[];
  }

  interface EmployeeData extends Employee {
    employee: Employee;
    EmployeeBankDetails: EmployeeBankDetails | null;
    EmployeeEmergencyContact: EmployeeEmergencyContact[];
    EmployeeHrDetails: EmployeeHrDetails;
    EmployeeLeaveBalance: EmployeeLeaveBalance[];
    EmployeeWorkHistory: EmployeeWorkHistory[];
  }
  interface EmployeeError {
    employeeId: number;
    error: string;
    status: number;
  }

}
