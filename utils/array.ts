export function move(arr, old_index, new_index) {
    if (new_index >= arr.length) {
        let k = new_index - arr.length + 1;
        while (k--) {
            arr.push(undefined);
        }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    return arr;
}

export function moveUp(arr, fromIndex) {
    return move(arr, fromIndex, fromIndex + 1);
}

export function moveDown(arr, fromIndex) {
    return move(arr, fromIndex, fromIndex - 1);
}

/**
 * Helper to produce an array of enum values.
 * @param enumeration Enumeration object.
 */
export function enumToArray<T>(enumeration: T): T[] {
    return Object.keys(enumeration)
        .filter((key) => Number.isInteger(Number(key)))
        .map((key) => enumeration[key])
        .filter((val) => typeof val === "number" || typeof val === "string");
}

/**
 * Helper to produce an array of enum values.
 * @param enumeration Enumeration object.
 */
export function enumToObject(enumeration: any): { [name: string]: number } {
    const object = {};
    Object.keys(enumeration)
        .filter((key) => !Number.isInteger(Number(key)))
        .forEach((key) => (object[key] = enumeration[key]));
    return object;
}

export function isEnum(enumeration: any) {
    if (typeof enumeration !== "object" || Array.isArray(enumeration)) {
        return false;
    }
    const keys = Object.keys(enumeration);
    if (keys.length === 0) {
        return false;
    }
    if (!isNaN(Number(keys[0]))) {
        return enumeration[Number(keys[0])] !== undefined;
    } else if (typeof keys[0] === "string") {
        return enumeration[keys[0]] !== undefined;
    }
    return false;
}

export function deduplicate<T>(array: T[]): T[] {
    return [...new Set(array)];
}

export function uniqueArray<T>(array: T[]): T[] {
    return array.filter((value, index, array) => {
        return array.indexOf(value) === index;
    });
}

export function uniqueArrayFilter<T>(array: T[], filter: any): T[] {
    return array.filter((value, index, array) => {
        return array.findIndex(filter(value)) === index;
    });
}

/**
 * Sort array with async function and return an array sorted
 * @param array Array to sort
 * @param compareFunction Function async to compare
 */
export async function asyncSort<T>(
    arr: T[],
    compareFn: (a: T, b: T) => Promise<number>
): Promise<T[]> {
    const indices = arr.map((_, index) => index);

    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            if ((await compareFn(arr[indices[i]], arr[indices[j]])) > 0) {
                [indices[i], indices[j]] = [indices[j], indices[i]];
            }
        }
    }

    return indices.map((index) => arr[index]);
}

export function shuffleArrayLength<T>(array: T[]): T[] {
    const length = Math.round(Math.random() * array.length);
    const newArray = [];
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * length);
        newArray.push(array[randomIndex]);
    }
    return newArray;
}

export function shuffle(array: string[]) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
