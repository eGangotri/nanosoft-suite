export const capitalizeFirstLetter = (_name: string) => {
    return _name?.charAt(0).toUpperCase() + _name?.slice(1);
};

export const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    };
    return date?.toLocaleDateString('en-GB', options).replace(/ /g, '-');
};

export const formatStringAsDate = (date: Date | string) => {
    if (typeof date === 'string') {
        return formatDate(new Date(date));
    }
    else {
        return formatDate(date);
    }
};