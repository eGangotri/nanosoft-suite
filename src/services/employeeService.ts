import { BankDetailsFormData } from "@/components/employee/bank-details/constants"

export const fetchBankDetails = async (employeeId: number) => {
    console.log('Fetching data for ID:', employeeId)
    try {
        const response = await fetch(`/api/employee/details/bank-details/${employeeId}/?id=${employeeId}`)
        const data: BankDetailsFormData = await response.json()

        console.log('fetchBankDetails:Employee Bank Details: data:', JSON.stringify(data))
        if (data && data.employee_id === employeeId) {
            return data
        }
        return null
    }
    catch (error) {
        console.log(error);
    }
    finally {
        console.log('Fetching data for ID:', employeeId)
        return null

    }
}
