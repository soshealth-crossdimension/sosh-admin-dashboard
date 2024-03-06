export const dateFormat = (date) => {
    return date.toLocaleString();
}

export const newDateFormat = (date) => {
    return date.toISOString().substr(0, 19).replace('T', ' ');
 }