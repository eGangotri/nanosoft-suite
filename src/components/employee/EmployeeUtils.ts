export const extractEmployeePortion = (json: EmployeeData): Employee => {
    return {
        id: json.id,
        firstName: json.firstName,
        lastName: json.lastName,
        designation: json.designation,
        dateOfBirth: new Date(json.dateOfBirth),
        nationality: json.nationality,
        email: json.email,
        mobile: json.mobile,
        citizenshipStatus: json.citizenshipStatus,
        nricOrFinNo: json.nricOrFinNo,
        expiryDate: json.expiryDate ? new Date(json.expiryDate) : null,
        maritalStatus: json.maritalStatus,
        addressLine1: json.addressLine1,
        addressLine2: json.addressLine2 || null,
        city: json.city,
        country: json.country,
        postalCode: json.postalCode,
        active: json.active,
        deleted: json.deleted,
        middleName: json.middleName || null
    } as Employee;
}

export const initCaps = (str: string) => {
    return str ? str?.charAt(0)?.toUpperCase() + str?.slice(1).toLowerCase() : "";
}

export const divideNames = (employee: { firstName: string, middleName?: string|null, lastName: string }) => {
    return {
        firstName: initCaps(employee.firstName),
        middleName: initCaps(employee.middleName || ""),
        lastName: initCaps(employee.lastName)
    }
}

export const formatedEmployeeName = (employee: { firstName: string, 
    middleName?: string|null, lastName: string }) => {
    const { firstName, middleName, lastName } = divideNames(employee);
    const fullName = `${firstName} ${middleName} ${lastName}`.trim();
    return fullName
}

export const formatedEmployeeNameWithMidInitials = (employee:
     { firstName: string, middleName?: string|null, lastName: string }) => {
    const { firstName, middleName, lastName } = divideNames(employee);
    const midInitial = middleName.length > 0 ? middleName.charAt(0) + ". " : "";
    const withMidInitial = `${firstName} ${midInitial}${lastName}`.trim();
    return withMidInitial
}