import { Leave_Balance, Leave_Request } from "@prisma/client";

export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  designation: string;
  dateOfBirth: Date;
  nationality: string;
  email: string;
  mobile: string;
  citizenshipStatus: string;
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
  employee_bank_details: EmployeeBankDetails | null;
  employee_emergency_contact: EmployeeEmergencyContact[];
  employee_hr_details: EmployeeHRDetails[];
  employee_leave_balances: EmployeeLeaveBalance[];
  employee_work_history: EmployeeWorkHistory[];
}

export interface EmployeeHRDetails {
  id: number;
  employee_id: number;
  date_of_joining: Date;
  bonus: number;
  passport_number: string;
  passport_issue_date: Date;
  passport_expiry_date: Date;
  pass_type: string;
  pass_expiry_date: Date | null;
  renewal_apply_date: Date | null;
  new_apply_date: Date | null;
  pass_cancelled_date: Date | null;
  client_id: number | null;
  remarks: string | null;
  employee: Employee;
  client: Client | null;
}

export interface EmployeeEmergencyContact {
  id: number;
  employee_id: number;
  person_name: string;
  relationship: string;
  mobile: string;
  address: string;
  employee: Employee;
}

export interface EmployeeBankDetails {
  id: number;
  employee_id: number;
  bank_name: string;
  employee_banking_name: string;
  account_number: string;
  account_type: string;
  employee: Employee;
}

export interface EmployeeLeaveBalance {
  id: number;
  employee_id: number;
  leave_type_id: number;
  balance: number;
  employee: Employee;
  Leave_Type: LeaveType;
}

export interface EmployeeWorkHistory {
  id: number;
  employee_id: number;
  job_title: string;
  start_date: Date;
  end_date: Date | null;
  department: string | null;
  responsibilities: string | null;
  technologies_used: string | null;
  employee: Employee;
}

export interface Client {
  id: number;
  company_name: string;
  industry: string | null;
  primary_contact: string | null;
  contact_email: string | null;
  contact_phone: string | null;
  current_openings: number | null;
  last_contact_date: Date | null;
  next_follow_up: Date | null;
  status: string | null;
  notes: string | null;
  employee_hr_details: EmployeeHRDetails[];
}

export interface LeaveType {
  id: number;
  name: string;
  description: string | null;
  default_days: number;
  leave_code: string | null;
  Leave_Balance: Leave_Balance[];
  Leave_Request: Leave_Request[];
  employee_leave_balances: EmployeeLeaveBalance[];
}

export interface EmployeeData {
  employee: Employee;
  employee_bank_details: EmployeeBankDetails | null;
  employee_emergency_contact: EmployeeEmergencyContact;
  employee_hr_details: EmployeeHRDetails;
  employee_leave_balances: EmployeeLeaveBalance;
  employee_work_history: EmployeeWorkHistory[];
}