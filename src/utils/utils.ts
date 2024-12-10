import { NANOSOFT_ROLES } from "@/globalConstants";

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


export const isAdminOrSuperAdmin = (role: string) => {
    return (role === NANOSOFT_ROLES.ADMIN || role === NANOSOFT_ROLES.SUPERADMIN);
}

export const isEmployee = (role: string) => {
    return (role === NANOSOFT_ROLES.EMPLOYEE);
}