import { BankDetailsFormData } from "@/components/employee/details/bank-details/schema";
import { EmployeeHrDetailsFormData } from "@/components/employee/details/hr/constants";

export const getEmployeeData = async (employeeId: number):
    Promise<EmployeeData | null> => {
    const response = await fetch(`/api/employee/${employeeId}`)
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

export const fetchBankDetailsByEmployeeId = async (employeeId: number) => {
    console.log('Fetching data for ID:', employeeId)
    try {
        const response = await fetch(`/api/employee/details/bank-details/${employeeId}`)
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

export const fetchContactInfoByContactId = async (contactId: number) => {
    console.log('Fetching ContactInfo by ID:', contactId)
    try {
        const response = await fetch(`/api/employee/details/contact-info/${contactId}/?id=${contactId}`)
        const data: EmployeeEmergencyContact = await response.json()
        console.log('fetchContactInfoById data:', JSON.stringify(data))
        return data
    }
    catch (error) {
        console.error('Error fetching ContactInfo:', error)
        throw new Error('Failed to fetch ContactInfo')
    }
}

export const fetchHrDetailsByEmployeeId = async (employeeId: number) => {
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


export const fetchWorkHistoriesByEmployeeId = async (employeeId: number) => {
    console.log('fetchWorkHistoriesByEmployeeId:', employeeId)
    try {
        const response = await fetch(`/api/employee/details/work-history/${employeeId}`)
        const data = await response.json()

        console.log('fetchWorkHistoriesByEmployeeId:data:', JSON.stringify(data), data.employeeId === employeeId)
        if (data && data.length > 0) {
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


export const addHrDetails = async (data: EmployeeHrDetails) => {
    if (data?.id !== undefined) {
        delete data?.id;
    }
    console.log('addHrDetails:', data.employeeId, JSON.stringify(data));
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
    return response;

}
export const editHrDetails = async (data: EmployeeHrDetailsFormData) => {
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
    return response
}