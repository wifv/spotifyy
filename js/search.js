const otherBlocks = document.getElementsByClassName('other-block');


for (const block of otherBlocks) {
    let bgColor = `rgb(${Math.floor(240 * Math.random())}, ${Math.floor(240 * Math.random())}, ${Math.floor(240 * Math.random())})`
    block.style.backgroundColor = bgColor;
}