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

//upload audio
const uploadAudio = document.querySelector("[upload-audio]");
if (uploadAudio) {
    const uploadAudioInput = uploadAudio.querySelector("[upload-audio-input]");
    const uploadAudioPlay = uploadAudio.querySelector("[upload-audio-play]");
    const source = uploadAudioPlay.querySelector("source");

    uploadAudioInput.addEventListener("change", (e) => {
        if (e.target.files.length > 0) {
            const audio = URL.createObjectURL(e.target.files[0]);

            source.src = audio;
            uploadAudioPlay.load();
        }
    })
}
//end upload audio