import { BankDetailsFormData } from "@/components/employee/details/bank-details/schema";
import { EmployeeHrDetailsFormData } from "@/components/employee/details/hr/constants";

export const getEmployeeData = async (employeeId: number):
    Promise<EmployeeData | null> => {
    const response = await fetch(`/api/employee/${employeeId}/?id=${employeeId}`)
    if (!response.ok) {
        return null;
    } else {
        const data: EmployeeData = await response.json()
        return data
    }
}

export const fetchClients = async ():
    Promise<Client[]> => {
    const response = await fetch(`/api/clients/`)
    if (!response.ok) {
        return [];
    } else {
        const data: Client[] = await response.json()
        return data
    }
}

export const fetchBankDetails = async (employeeId: number) => {
    console.log('Fetching data for ID:', employeeId)
    try {
        const response = await fetch(`/api/employee/details/bank-details/${employeeId}/?id=${employeeId}`)
        const data: BankDetailsFormData = await response.json()

        console.log('fetchBankDetails:Employee Bank Details: data:', JSON.stringify(data), data.employeeId === employeeId)
        if (data && data.employeeId === employeeId) {
            console.log(`data found for ID: ${employeeId}`);
            return data
        }
        return null
    }
    catch (error) {
        console.error('Error fetching bank details:', error)
        throw new Error('Failed to fetch bank details')
    }
}


export const fetchHrDetails = async (employeeId: number) => {
    console.log('getEmployeeHrDetails:', employeeId)
    try {
        const response = await fetch(`/api/employee/details/hr-details/${employeeId}/?id=${employeeId}`)
        const data = await response.json()

        console.log('fetchHrDetails:data:', JSON.stringify(data), data.employeeId === employeeId)
        if (data && data.employeeId === employeeId) {
            console.log(`data found for ID: ${employeeId}`);
            return data
        }
        return null
    }
    catch (error) {
        console.error('Error fetching hr details:', error)
        throw new Error('Failed to fetch hr details')
    }
}

export const addHrDetails = async (employeeId: number, data: EmployeeHrDetails) => {
    console.log('addHrDetails:', employeeId, JSON.stringify(data));
    const response = await fetch(`/api/employee/details/hr-details`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    if (!response.ok) {
        throw new Error('Failed to add hr details')
    }
    return true;

}
export const editHrDetails = async (employeeId: number, data: EmployeeHrDetailsFormData) => {
    const response = await fetch(`/api/employee/details/hr-details/${data.employeeId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    if (!response.ok) {
        throw new Error('Failed to add bank details')
    }
    return true
}