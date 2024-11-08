export interface Employee {
    id: number;
    firstName: string;
    middleName: string;
    lastName: string;
    designation: string;
    dateOfBirth: Date;
    nationality: string;
    email: string;
    mobile: string;
    citizenshipStatus: string;
    nricOrFinNo: string;
    expiryDate: Date | null;
    maritalStatus: string;
    addressLine1: string;
    addressLine2: string | null;
    city: string;
    country: string;
    postalCode: string;
    deleted: boolean;
    active: boolean;
  }