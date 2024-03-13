export function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function capitalizeWords(string) {
    return string.replaceAll(/(^|\s+)([a-z])/g, (match) => {
        return match.toUpperCase();
    });
}

export function removeTag(html) {
    const div = document.createElement("div");
    div.innerHTML = html;
    const text = div.textContent || div.innerText || "";
    return text;
}

export function lowerCaseFirst(text: string): string {
    return text.charAt(0).toLowerCase() + text.slice(1);
}

export function padNumber(number: number, length: number = 2) {
    return (number + "").padStart(length, "0");
}

export function randomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export function getFromObject(obj: object, path: string, defaultValue: any = null) {
    try {
        return path.split(".").reduce((o, i) => o[i], obj);
    } catch (e) {
        return defaultValue;
    }
}

export function setFromObject(obj: object, path: string, value: any) {
    const keys = path.split(".");
    const lastKey = keys.pop();
    if (lastKey === undefined) throw new Error("Path not exists in object");
    const lastObj = keys.reduce((o, i) => o[i], obj);
    lastObj[lastKey] = value;
}
