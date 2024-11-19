export interface Employee {
    id: number;
    first_name: string;
    last_name: string;
    designation: string;
    date_of_birth: string;
    nationality: string;
    email: string;
    mobile: string;
    citizenship_status: string;
    nric_or_fin_no: string;
    expiry_date: string | null;
    marital_status: string;
    address_line1: string;
    address_line2: string | null;
    city: string;
    country: string;
    postal_code: string;
    active: boolean;
    deleted: boolean;
    middle_name: string | null;
  }
  
  export interface EmployeeHRDetails {
    id: number;
    employee_id: number;
    date_of_joining: string;
    bonus: number;
    passport_number: string;
    passport_issue_date: string;
    passport_expiry_date: string;
    pass_type: 'EP' | 'PEP' | 'WP' | 'SPass';
    pass_expiry_date: string | null;
    renewal_apply_date: string | null;
    new_apply_date: string | null;
    pass_cancelled_date: string | null;
    client_id: number | null;
    remarks: string | null;
  }
  
  export interface EmployeeEmergencyContact {
    id: number;
    employee_id: number;
    person_name: string;
    relationship: 'spouse' | 'friend' | 'parent' | 'sibling' | 'landlord' | 'other';
    mobile: string;
    address: string;
  }
  
  export interface EmployeeBankDetails {
    id: number;
    employee_id: number;
    bank_name: string;
    employee_banking_name: string;
    account_number: string;
    account_type: 'Current' | 'Savings';
  }
  
  export interface EmployeeLeaveBalance {
    id: number;
    employee_id: number;
    leave_type_id: number;
    balance: number;
  }
  
  export interface EmployeeWorkHistory {
    id: number;
    employee_id: number;
    job_title: string;
    start_date: string;
    end_date: string | null;
    department: string | null;
    responsibilities: string | null;
    technologies_used: string | null;
  }
  
  export interface EmployeeData {
    employee: Employee;
    hrDetails: EmployeeHRDetails;
    emergencyContact: EmployeeEmergencyContact;
    bankDetails: EmployeeBankDetails;
    leaveBalances: EmployeeLeaveBalance[];
    workHistory: EmployeeWorkHistory[];
  }