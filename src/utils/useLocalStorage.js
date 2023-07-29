export const setItemInStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
}

export const getItemFromStorage = (key) => {
    return JSON.parse(localStorage.getItem(key));
}

export const removeItemFromStorage = (key) => {
    localStorage.removeItem(key);
}