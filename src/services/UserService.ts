export const getEmployeeByUserId = async (employeeId: number):
    Promise<EmployeeData | null> => {
    const response = await fetch(`/api/employee/${employeeId}`)
    if (!response.ok) {
        return null;
    } else {
        const data: EmployeeData = await response.json()
        return data
    }
}

export const getUserByEmployeeId = async (employeeId: number):
    Promise<EmployeeData | null> => {
    const response = await fetch(`/api/employee/${employeeId}`)
    if (!response.ok) {
        return null;
    } else {
        const data: EmployeeData = await response.json()
        return data
    }
}
