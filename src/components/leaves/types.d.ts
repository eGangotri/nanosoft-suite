export interface LeaveType {
    id: number;
    name: string;
    color?: string; // Optional, as it can be null
    defaultDays: number;
    leaveCode?: string; // Optional, as it can be null
  }
  export interface Leave {
    id: number;
    employeeId: number;
    startDate: Date;
    endDate: Date;
    status: string;
    leaveTypeId: number;
    leaveType: LeaveType;
  }
  
  