const blockElement = '' +
    '<div class="music-block pointer">\n' +
    '    <img src="../images/error.svg" alt="" class="music-image">\n' +
    '    <audio src="" controls="controls"></audio>'
    '    <p>ambatukam</p>\n' +
    '</div>'

const blocks = document.getElementsByClassName('music-block');
const blocksContainer = document.getElementById('block-container');

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
        blocksContainer.children[i].children[1].src = data[i].music_file;
    }
})