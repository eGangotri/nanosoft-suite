import { CITIZEN_CATEGORIES } from "@/utils/FormConsts";

export const createEmptyEmployee = () => {
    const employeeHrDetails = createEmptyHRDetails();
    return {
        id: 0,
        firstName: "",
        lastName: "",
        designation: "",
        dateOfBirth: new Date(),
        nationality: "",
        email: "",
        mobile: "",
        citizenshipStatus: CITIZEN_CATEGORIES.Foreigner, // Replace with a valid default value for CitizenCategory
        gender: "",
        race: "",
        nricOrFinNo: "",
        expiryDate: null,
        maritalStatus: "",
        active: true,
        deleted: false,
        middleName: null,

        localAddressLine1: "",
        localAddressLine2: "",
        localPostalCode: "",

        foreignAddressLine1: "",
        foreignAddressLine2: "",
        foreignAddressCity: "",
        foreignAddressCountry: "",
        foreignAddressPostalCode: "",
        EmployeeBankDetails: null,
        EmployeeLeaveBalance: [],
        EmployeeWorkHistory: [],
        EmployeeEmergencyContact: [],
        EmployeeHrDetails:employeeHrDetails
    }
}

export const createEmptyHRDetails = () => {
    return {
        id: 0,
        employeeId: 0,
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
        employee: {} as Employee, // Replace with default/empty Employee object if available
        workpermitNumber: null,
        malaysiaIC: null,
        clientIds: [], // Optional field, can be an empty array
        EmployeeHrDetailsClients: [] // Initialize as an empty array
    }
}