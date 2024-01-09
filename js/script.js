const blockElement = '' +
    '<div class="music-block pointer">\n' +
    '    <img src="../images/error.svg" alt="" class="music-image">\n' +
    '    <p>ambatukam</p>\n' +
    '    <img class="play" src="./images/play.svg"></img>' +
    '    <audio class="hidden" preload="metadata"></audio>' +
    '</div>';

const blocksContainer = document.getElementById('block-container');
const musicTrack = document.getElementById("music-track");
const lol = document.getElementById("lol");
const volume = document.getElementById("volume");
const slider = document.getElementById("slider");
const durationElement = document.getElementById("duration-wrapper");
const musicName = document.getElementById("music-name");
const musicImage = document.getElementById("music-image");
const play = document.getElementById("play");
const cTime = document.getElementById("cTime");
let duration;

volume.volume = 1;

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
            blocksContainer.children[i].children[0].src = data[i].image;
        }
        blocksContainer.children[i].children[1].innerText = data[i].name;
        blocksContainer.children[i].children[3].src = data[i].music_file;

        let blocks = document.getElementsByClassName('music-block');


        for (let i = 0; i < blocks.length; i++) {
            blocks[i].children[2].addEventListener('click', () => {
                if(musicTrack.src != blocks[i].children[3].src) {
                    musicTrack.src = blocks[i].children[3].src;
                }
                setTimeout(() => {
                    slider.max = Math.round(musicTrack.duration);
                    durationElement.innerText = time(Math.round(musicTrack.duration));
                }, 1000);
                musicImage.src = blocks[i].children[0].src;
                console.log(musicImage.src)
                musicName.innerText = blocks[i].children[1].innerText;
                playPause(musicTrack);
            })
        }
    }
    return data;
})


volume.addEventListener('change', () => {
    musicTrack.volume = volume.value / 100;
})

slider.addEventListener('change', () => {
    musicTrack.currentTime = slider.value;
    cTime.innerText = time(slider.value);
})

musicTrack.addEventListener("timeupdate", () => {
    slider.value = musicTrack.currentTime;
    cTime.innerText = time(slider.value);
})

let vv = 100;

document.body.addEventListener('keyup', key => {
    if (key.key == " ") {
        playPause(musicTrack)
        durationElement.innerText = time(Math.round(musicTrack.duration));
    }
    if (key.key == "ArrowUp") {
        if (vv < 100) {
            vv += 5;
            volume.value = vv;
            musicTrack.volume = vv / 100;
        }
    }
    if (key.key == "ArrowDown") {
        if (vv > 0) {
            vv -= 5;
            volume.value = vv;
            musicTrack.volume = vv / 100;
        }
    }
})

function playPause(musicTrack) {
    if (musicTrack.paused == true) {
        musicTrack.play();
        musicTrack.paused = true;
    } else if (musicTrack.paused == false) {
        musicTrack.pause();
    }
}

play.addEventListener('click', () => {
    playPause(musicTrack);
})

function time(seconds) {
    let rTime = new Date(seconds * 1000).toISOString().substr(11, 8);

    if(rTime.substring(0, 2) == '00') {
        return rTime.substring(3)
    }
}
