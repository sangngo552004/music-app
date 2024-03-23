//play audio

const elementAplayer = document.getElementById('aplayer');

if(elementAplayer) {
    let dataSong = elementAplayer.getAttribute("data-song");
    dataSong = JSON.parse(dataSong);
    let dataSinger = elementAplayer.getAttribute("data-singer");
    dataSinger = JSON.parse(dataSinger);
    
    const ap = new APlayer({
        container : elementAplayer,
        audio:[{
            name : dataSong.title,
            artist : dataSinger.fullName,
            url : dataSong.audio,
            cover: dataSong.avatar
        }],
        autoplay: true
    });

    const avatar = document.querySelector(".singer-detail .inner-avatar");

    ap.on('play', function () {
        avatar.style.animationPlayState = "running";
    });

    ap.on('pause', function () {
        avatar.style.animationPlayState = "paused";
    });
}
//end play audio

//button like
const buttonLike = document.querySelector("[button-like]");
if (buttonLike) {
    buttonLike.addEventListener("click", () => {
        const isActive = buttonLike.classList.contains("active");
        
        const type = isActive ? "no" : "yes";

        const idSong = buttonLike.getAttribute("button-like");
        const link = `/songs/like/${type}/${idSong}`;
        fetch(link, {
            method : "PATCH"
        })
            .then(res => res.json())
            .then(data => {
                const dataLike = buttonLike.querySelector("[data-like]");
                dataLike.innerHTML = data.like;

                buttonLike.classList.toggle("active");
            })
    })
}
//end button like
//button favorite
const listButtonsFavorite = document.querySelectorAll("[button-favorite]");
if (listButtonsFavorite.length > 0) {

    listButtonsFavorite.forEach(buttonFavorite => {
        buttonFavorite.addEventListener("click", () => {
            const isActive = buttonFavorite.classList.contains("active");
            
            const type = isActive ? "no" : "yes";
    
            const idSong = buttonFavorite.getAttribute("button-favorite");
            const link = `/songs/favorite/${type}/${idSong}`;
            fetch(link, {
                method : "PATCH"
            })
                .then(res => res.json())
                .then(data => {
                    buttonFavorite.classList.toggle("active");
                })
        })
    })
}
//end button favorite