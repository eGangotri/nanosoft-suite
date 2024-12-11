import { CITIZEN_CATEGORIES, GENDER_TYPE, MARITAL_CATEGORIES, NATIONALITIES, RACE_TYPE } from "@/utils/FormConsts";

export const createEmptyEmployeeWithHrDetails = () => {
    const employeeHrDetails = createEmptyHRDetails();
    const emptyEmployee = createEmptyEmployee();
    emptyEmployee.EmployeeHrDetails = employeeHrDetails;
    return emptyEmployee;
}

export const createEmptyEmployee = () => {
    return {
        id: 0,
        firstName: "",
        lastName: "",
        designation: "",
        dateOfBirth: new Date(),
        nationality: NATIONALITIES.India,
        email: "",
        mobile: "",
        citizenshipStatus: CITIZEN_CATEGORIES.Foreigner,
        gender: GENDER_TYPE.Male,
        race: RACE_TYPE.Indian,
        nricOrFinNo: "",
        expiryDate: null,
        maritalStatus: MARITAL_CATEGORIES.Single,
        active: true,
        deleted: false,
        middleName: "",

        localAddressLine1: "",
        localAddressLine2: "",
        localAddressLine3: "",
        levelOrUnitNo: "",
        localPostalCode: "",

        foreignAddressLine1: "",
        foreignAddressLine2: "",
        foreignAddressCity: "",
        foreignAddressState: "",
        foreignAddressCountry: "",
        foreignAddressPostalCode: "",
        EmployeeBankDetails: null,
        EmployeeLeaveBalance: [],
        EmployeeWorkHistory: [],
        EmployeeEmergencyContact: [],
        EmployeeHrDetails: {} as EmployeeHrDetails
    } as Employee;
}
export const createEmptyHRDetails = () => {
    return {
        id: 0,
        employeeId: 0,
        employee: {} as Employee, // Replace with default/empty Employee object if available
        dateOfJoining: new Date(),
        bonus: 0,
        salary: 0,
        passportNumber: "",
        passportIssueDate: new Date(),
        passportExpiryDate: new Date(),
        passType: null,
        passExpiryDate: null,
        renewalApplyDate: null,
        newApplyDate: null,
        passCancelledDate: null,
        remarks: null,
        workpermitNumber: null,
        malaysiaIC: null,
        clientIds: [], // Optional field, can be an empty array
        EmployeeHrDetailsClients: [] // Initialize as an empty array
    }
}