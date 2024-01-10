const form = document.getElementById('form');

form.addEventListener('submit', async event => {
    event.preventDefault();

    const data = new FormData(form);


    fetch("https://test.imowww.uz/api/music/track/", {
        method: 'POST',
        body: data
    }).then(response => {
        if (response.ok) {
            console.log('nigga')
        }
    })
});
