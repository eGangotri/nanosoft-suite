import { mockEmployeeData } from "@/app/employee/view-employee/mock-data";
import { BankDetailsFormData } from "@/components/employee/bank-details/constants"
import { EmployeeData } from "@/components/employee/types";

export const getEmployeeData = async (employeeId: string): Promise<EmployeeData> => {
    const response = await fetch(`/api/employee/${employeeId}/?id=${employeeId}`)
    if (!response.ok) {
        return mockEmployeeData;
    } else {
        const data: EmployeeData = await response.json()
        return data
    }
}

export const fetchBankDetails = async (employeeId: number) => {
    console.log('Fetching data for ID:', employeeId)
    try {
        const response = await fetch(`/api/employee/details/bank-details/${employeeId}/?id=${employeeId}`)
        const data: BankDetailsFormData = await response.json()

        console.log('fetchBankDetails:Employee Bank Details: data:', JSON.stringify(data), data.employee_id === employeeId)
        if (data && data.employee_id === employeeId) {
            console.log(`data found for ID: ${employeeId}`);
            return data
        }
        return null
    }
    catch (error) {
        console.log(error);
    }
    finally {
        console.log('Fetching data for ID:', employeeId)
    }
}
