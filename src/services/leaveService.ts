export const fetchLeavesForEmployee = async (employeeId: number) => {
    const response = await fetch(`/api/leaves/${employeeId}`)
    if (!response.ok) {
        return [];
    } else {
        const data = await response.json()
        return data
    }
}