import { NANOSOFT_ADMIN_ROLES, NANOSOFT_ADMIN_ROLES_VALUES, NANOSOFT_MANAGERIAL_ROLES_VALUES, NANOSOFT_ROLES } from "@/globalConstants";

const emptyResult = {
    blkNo: "",
    roadName: "",
    building: "",
    success: false
};

export const lookupPostalCodeSG = async (postalCode: string) => {

    const response = await fetch(`https://www.onemap.gov.sg/api/common/elastic/search?searchVal=${postalCode}&returnGeom=Y&getAddrDetails=Y&pageNum=1`);
    if (!response.ok) {
        return emptyResult;
    }
    const data = await response.json();
    const results = data.results;
    console.log(`results: ${JSON.stringify(results)}`);
    if (results.length === 0) {
        return emptyResult
    }
    else {
        const lastIndex = results.length - 1;
        const result = {
            blkNo: results[lastIndex]["BLK_NO"],
            roadName: results[lastIndex]["ROAD_NAME"],
            building: results[lastIndex]["BUILDING"],
            success: true
        }
        return result;
    }
}

export const isSuperAdmin = (role: string) => {
    return (role === NANOSOFT_ROLES.SUPERADMIN);
}

export const isAdmin = (role: string) => {
    return (role === NANOSOFT_ROLES.ADMIN);
}
export const isAdminOrSuperAdmin = (role: string) => {
    return (isAdmin(role) || isSuperAdmin(role));
}

export const isAnyAdminRole = (role: string) => {
    return NANOSOFT_ADMIN_ROLES_VALUES.includes(role);
}

export const isAnyManagerialRole = (role: string) => {
    return NANOSOFT_MANAGERIAL_ROLES_VALUES.includes(role);
}

export const isEmployee = (role: string) => {
    return (role === NANOSOFT_ROLES.EMPLOYEE);
}