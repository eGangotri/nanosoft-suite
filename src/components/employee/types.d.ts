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
    active: boolean;
    deleted: boolean;
    middleName: string | null;
    empId: string | null;

    localAddressLine1: String
    localAddressLine2: String
    localAddressLine3: String,
    levelOrUnitNo: String,
    localPostalCode: String

    foreignAddressLine1?: String;
    foreignAddressLine2?: String;
    foreignAddressCity?: String;
    foreignAddressState?: String;
    foreignAddressCountry?: String;
    foreignAddressPostalCode?: String;

    EmployeeBankDetails: EmployeeBankDetails | null;
    EmployeeEmergencyContact: EmployeeEmergencyContact[];
    EmployeeHrDetails: EmployeeHrDetails;
    EmployeeLeaveBalance: EmployeeLeaveBalance[];
    EmployeeWorkHistory: EmployeeWorkHistory[];
    UserEmployee?:UserEmployee;
  }

  interface UserEmployee {
    id: number;
    userId: string;
    employeeId: number;
    Employee: Employee;
    User: User;
  }

  interface Session {
    id: string;
    sessionToken: string;
    userId: string;
    expires: Date;
    user: User;
  }
  interface VerificationToken {
    identifier: string;
    token: string;
    expires: Date;
  }

  interface UserRole {
    user_id: string;
    role_id: number;
    Role: Role;
    User: User;
  }

  interface Role {
    id: number;
    name: string;
    level: number;
    UserRole: UserRole[];
  }
  
    interface User {
    id: string;
    name?: string;
    email?: string;
    emailVerified?: Date;
    image?: string;
    password?: string;
    resetToken?: string;
    resetTokenExpiry?: Date;
    createdAt: Date;
    updatedAt: Date;
    Account: Account[];
    Session: Session[];
    UserEmployee?: UserEmployee;
    UserRole: UserRole[];
  }

  interface EmployeeHrDetails {
    id: number;
    employeeId: number;
    employee: Employee;
    dateOfJoining: Date;
    bonus: number;
    salary: number;
    passportNumber: string;
    passportIssueDate: Date;
    passportExpiryDate: Date;
    passType: string | null;
    passExpiryDate: Date | null;
    renewalApplyDate: Date | null;
    newApplyDate: Date | null;
    passCancelledDate: Date | null;
    remarks: string | null;
    workpermitNumber: string | null;
    malaysiaIC: string | null;
    clientIds?: number[]; // Transient field for form handling
    EmployeeHrDetailsClients: EmployeeHrDetailsClient[]; // Changed from clients: Client[]
  }

  // New interface to represent the many-to-many relationship
  export interface EmployeeHrDetailsClient {
    id: number;
    employeeHrId: number;
    clientId: number;
    assignedDate: Date;
    employeeHrDetails: EmployeeHrDetails;
    Client: Client;
  }

  interface EmployeeEmergencyContact {
    id: number;
    employeeId: number;
    personName: string;
    relationship: string;
    mobile: string;
    address: string;
    employee?: Employee;
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
    totalEntitlement: number;
    usedDays: number;
    remainingDays: number;
    employeeName?: string;
    employee?: Employee;
    leaveTypeId: number;
    LeaveType: LeaveType;
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
    color?: String;
    defaultDays: number;
    leaveCode?: string;
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
