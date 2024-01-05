const blockElement = '' +
    '<div class="music-block pointer">\n' +
    '    <img src="../images/error.svg" alt="" class="music-image">\n' +
    '    <p>ambatukam</p>\n' +
    '    <div class="play">play</div>' +
    '    <audio class="hidden"></audio>' +
    '</div>';

const blocks = document.getElementsByClassName('music-block');
const blocksContainer = document.getElementById('block-container');
const musicTrack = document.getElementById("music-track");

fetch('https://test.imowww.uz/api/music/track/', {
    method: "GET"
})
.then(response => {
    if(!response.ok) {
        throw new Error("not ok");
    }
    return response = response.json()
})
.then(data => {
    console.log(data);
    for (let i = 0; i < data.length; i++) {
        blocksContainer.innerHTML += blockElement;
        if(data[i].image) {
            blocksContainer.children[i].firstElementChild.src = data[i].image;
        }
        blocksContainer.children[i].children[1].innerText = data[i].name;
        blocksContainer.children[i].children[3].src = data[i].music_file;
        // blocksContainer.children[i].children[3].src = new Audio(data[i].music_file)
        blocksContainer.children[i].children[2].addEventListener("click", () => {
            musicTrack.src = blocksContainer.children[i].children[3].src;
            musicTrack.paused = false
            if(musicTrack.paused == true) {
                console.log(musicTrack.paused)
                musicTrack.play();
                console.log(musicTrack.paused)
            } else if (musicTrack.paused == false) {
                musicTrack.pause();
            }
        })
    }
})

// fetch('https://test.imowww.uz/api/music/track/', {
//     headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json',
//         'X-CSRFTOKEN': 'jqsGTnA31nJtdV2UJtLfnDfRXYWuBznMlEEKZzPQryOiDZRn1Q2jkn4DCsTZEK72'
//     },
//     method: "POST",
//     body: JSON.stringify({
//         name: "gugu-gaga",
//         author_name: "me",
//         image: null,
//         music_file: "http://test.imowww.uz/media/track/2023/12/23/%D0%A5%D0%B0%D0%B1%D0%B8%D0%B1_-_%D0%AF%D0%B3%D0%BE%D0%B4%D0%B0_%D0%9C%D0%B0%D0%BB%D0%B8%D0%BD%D0%BA%D0%B0_eAAnc2I.mp3",
//     })
// })
