export interface Leave {
    id: number;
    employeeId: number;
    startDate: string; // Using string to represent the timestamp
    endDate: string; // Using string to represent the timestamp
    leaveTypeId: number;
    status: string;
    createdAt?: string; // Optional, as it has a default value
}