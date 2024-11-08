import React, { useEffect } from "react";

const Test = () => {
  useEffect(() => {
    const urlToBlob = async (imageUrl: string) => {
      const response = await fetch(imageUrl);

      if (!response.ok) {
        throw new Error(
          `Failed to fetch image from URL: ${response.statusText}`
        );
      }

      const blob = await response.blob();

      return blob;
    };

    const blobToBase64 = (blob: Blob) => {
      return new Promise((resolve, reject) => {
        if (typeof window !== "undefined") {
          // Ensure it runs only in the browser
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result); // Base64 string
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        } else {
          reject(new Error("FileReader is not available in this environment."));
        }
      });
    };

    const main = async () => {
      try {
        const blobImage = await urlToBlob(
          "https://avatar.iran.liara.run/public/girl?username=smarth"
        );

        const dataBase = await blobToBase64(blobImage);

        console.log(dataBase); // This will log the Base64 string
      } catch (error) {
        console.error("Error:", error);
      }
    };

    main(); // Call the function on component mount
  }, []); // Empty dependency array means it runs only once when the component mounts

  return (
    <div>
      <h1>Image Blob to Base64 Conversion</h1>
      <p>Check the console for the Base64 string of the image.</p>
    </div>
  );
};

export default Test;
