
export const getTenants = async ():
    Promise<Tenant[] | []> => {
    const response = await fetch("/api/tenant")
    if (!response.ok) {
        return [];
    } else {
        const data: Tenant[] = await response.json()
        return data
    }
}
