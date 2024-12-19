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

        active: json.active,
        deleted: json.deleted,
        middleName: json.middleName || null,

        localAddressLine1: json?.localAddressLine1 || "",
        localAddressLine2: json?.localAddressLine2 || "",
        localPostalCode: json?.localPostalCode || "",

        foreignAddressLine1: json?.foreignAddressLine1 || "",
        foreignAddressLine2: json?.foreignAddressLine2 || "",
        foreignAddressCity: json?.foreignAddressCity || "",
        foreignAddressState: json?.foreignAddressState || "",
        foreignAddressCountry: json?.foreignAddressCountry || "",
        foreignAddressPostalCode: json?.foreignAddressPostalCode || ""

    } as Employee;
}

export const initCaps = (str: string) => {
    return str ? str?.charAt(0)?.toUpperCase() + str?.slice(1).toLowerCase() : "";
}

export const divideNames = (employee: { firstName: string, middleName?: string | null, lastName: string }) => {
    return {
        firstName: initCaps(employee?.firstName),
        middleName: initCaps(employee?.middleName || ""),
        lastName: initCaps(employee?.lastName)
    }
}

export const formatedEmployeeName = (employee: {
    firstName: string,
    middleName?: string | null, lastName: string
}) => {
    const { firstName, middleName, lastName } = divideNames(employee);
    const fullName = `${firstName} ${middleName} ${lastName}`.trim();
    return fullName
}

export const formatedEmployeeNameWithMidInitials = (employee:
    { firstName: string, middleName?: string | null, lastName: string }) => {
    const { firstName, middleName, lastName } = divideNames(employee);
    const midInitial = middleName.length > 0 ? middleName.charAt(0) + ". " : "";
    const withMidInitial = `${firstName} ${midInitial}${lastName}`.trim();
    return withMidInitial
}

export const employeeInitials = (employee:
    { firstName: string, middleName?: string | null, lastName: string }) => {
    const initial1 = employee?.firstName?.charAt(0) ? `${employee?.firstName?.charAt(0)}.` : "";
    const initial2 = employee?.lastName?.charAt(0) ? `${employee?.lastName?.charAt(0)}.` : "";

    return `${initial1} ${initial2}`.toUpperCase();
}