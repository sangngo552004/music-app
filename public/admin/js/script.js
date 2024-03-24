//upload image
//preview image
const uploadImage = document.querySelector("[upload-image]");
if (uploadImage) {
    const uploadImageInput = uploadImage.querySelector("[upload-image-input]");
    const uploadImagePreview = uploadImage.querySelector("[upload-image-preview]");

    uploadImageInput.addEventListener("change", (e) => {
        if (e.target.files.length > 0) {
            const image = URL.createObjectURL(e.target.files[0]);

            uploadImagePreview.src = image;
        }
    })
}
//end preview image
//end upload image