/**
 * Find the item in a list that compares in a given way to other members of the list
 * @param list the elements to search
 * @param compare compares two elements and returns `true` if the first element should be selected over the second
 */
export function unorderedSearch<T>(
    list: T[],
    compare: (a: T, b: T) => boolean,
): T {
    let result: T = list[0];
    for (let i = 1; i < list.length; i++) {
        result = compare(result, list[i]) ? result : list[i];
    }
    return result;
}
