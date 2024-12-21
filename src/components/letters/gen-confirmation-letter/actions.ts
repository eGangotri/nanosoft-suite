'use server'

import { ConfirmLetterData, confirmLetterSchema } from './confirmLetterSchema'

export async function submitConfirmLetterForm(data: ConfirmLetterData) {
    const result = confirmLetterSchema.safeParse(data)

    if (!result.success) {
        return { success: false, errors: result.error.flatten().fieldErrors }
    }

    // Here you would typically save the data to your database
    // For demonstration, we'll just log the data
    console.log('Form data:', {
        ...result.data,
        fullName: `${result.data.salutation} ${result.data.firstName} ${result.data.lastName}`
    })

    return { success: true, data: result.data }
}

