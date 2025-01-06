export const GLOBAL_CONSTS = {
    title: 'Nanosoft Suite',
    description: 'Description of your application',
    getTitle: (_prefix: string = "") => {
        return _prefix.length > 0 ? `${_prefix} - ${GLOBAL_CONSTS.title}` : GLOBAL_CONSTS.title;
    }
}

export const NANOSOFT_ADMIN_ROLES = {
    ADMIN: 'ADMIN',
    SUPERADMIN: 'SUPERADMIN',
    SUPERVISOR: 'SUPERVISOR',
    MGR_TIER_ONE: 'MGR_TIER_ONE',
    MGR_TIER_TWO: 'MGR_TIER_TWO',

}

export const NANOSOFT_NON_ADMIN_ROLES = {
    EMPLOYEE: 'EMPLOYEE',
}

export const NANOSOFT_ROLES = {
    ...NANOSOFT_ADMIN_ROLES,
    ...NANOSOFT_NON_ADMIN_ROLES
}