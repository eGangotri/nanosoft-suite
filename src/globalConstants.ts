export const GLOBAL_CONSTS = {
    title: 'Nanosoft Suite',
    description: 'Description of your application',
    getTitle: (_prefix: string = "") => {
        return _prefix.length > 0 ? `${_prefix} - ${GLOBAL_CONSTS.title}` : GLOBAL_CONSTS.title;
    }
}
