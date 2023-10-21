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

export const handleSetImage = (e, setImage, setFileName) => {
    if (e && e.target && e.target.files) {
        // the user selects a file via the file input dialog. This triggers.
        // the onChange event for the file input, and the handleSetImage function is called.
        const file = e.target.files[0];
        const reader = new FileReader(); // this is a JS object that can read data from Blob or File objects.
        if (file) {
            reader.readAsDataURL(file);
        }
        reader.onloadend = () => { // onloadend event handler for the FileReader will update the state to hold the Data URL representation
            // of the file once the read is complete in readAsDataURL.
            setImage(reader.result);
            setFileName(file.name);
        };
    }
};
