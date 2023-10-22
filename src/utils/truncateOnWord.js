export function truncateOnWord(str, limit) {
    if (str.length <= limit) {
        return str;
    }

    // Find the last space within the limit
    let end = str.lastIndexOf(' ', limit);
    // If no space was found, we'll break at the exact limit
    if (end === -1) {
        end = limit;
    }

    return str.substring(0, end) + '...';
}


