let LEAVE_TYPE_CACHE: LeaveType[] | null = null;

export const fetchLeaveTypes = async (): Promise<LeaveType[]> => {
    console.log('fetchLeaveTypes',JSON.stringify(LEAVE_TYPE_CACHE));
    if (LEAVE_TYPE_CACHE) {
        return LEAVE_TYPE_CACHE;
    }
    const response = await fetch('/api/leave-types')
    if (!response.ok) {
        return [];
    } else {
        const data = await response.json()
        LEAVE_TYPE_CACHE = data;
        return data;
    }
}

export const getLeaveTypeNameById = async (id: number|string): Promise<string> => {  
    const leaveTypes = await fetchLeaveTypes();
    const leaveType = leaveTypes.find(leaveType => leaveType.id == id);
    console.log(`getLeaveNameById(${id})`,JSON.stringify(leaveType));
    if(leaveType) {
        return `${leaveType?.name} (${leaveType?.leaveCode})`;
    }
    return `Unknown Leave Type(${id})`;
}

export const fetchLeavesForEmployee = async (employeeId: number) => {
    const response = await fetch(`/api/leaves/${employeeId}`)
    if (!response.ok) {
        return [];
    } else {
        const data = await response.json()
        return data
    }
}