console.log("yes this is working ")
const urlToBlob = async (imageUrl) => {
    const response = await fetch(imageUrl);

    if (!response.ok) {
        throw new Error(`Failed to fetch image from URL: ${response.statusText}`);
    }

    const blob = await response.blob();

    return blob;
};

const blobToBase64 = (blob) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result); // Base64 string
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
};

const main = async () => {
    const blobImage = await urlToBlob(
        "https://avatar.iran.liara.run/public/girl?username=smarth",
    );

    const dataBase = await blobToBase64(blobImage);

    console.log(dataBase);
};

main()