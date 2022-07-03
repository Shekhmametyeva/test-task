'use strict'




const accordion = document.querySelector('.accordion');


// draw accordion elements

window.addEventListener('load', drawElements);

function drawElements () {
    for (let i in obj) {
        const item = 
        `<div class="accordion__item">
            <div class="accordion__header">
                <h2 class="accordion__title">${obj[i].title}</h2>
                <img class="accordion__button" src="assets/icon/button.png" alt="button">
            </div>
            <div class="spoiler">
                <img class="spoiler__img" src="assets/images/${obj[i].src}.jpg" alt="Монако">
                <h4 class="spoiler__title">${obj[i].size}</h4> 
                <p class="spoiler__text">${obj[i].text1}</p>
                <p class="spoiler__text">${obj[i].text2}</p>
            </div>
        </div>`;
        accordion.innerHTML += item;
    }    
}

// open accordion

accordion.addEventListener('click', (event) => {
    if (event.target.closest('.accordion__header')) {
        const item = event.target.closest('.accordion__item');
        toggleSpoiler(item, item.classList.contains('accordion__item_open'));
    }
});

function toggleSpoiler (item , isOpen) {
    item.classList.toggle('accordion__item_open');  
    item.children[1].classList.add('flex');

    let spoilerHeight = item.children[1].offsetHeight;
    let headerHeight =item.children[0].offsetHeight;

    let start = isOpen ? headerHeight + spoilerHeight : headerHeight;
    let finish = isOpen ? headerHeight : headerHeight + spoilerHeight;
    
    item.animate([{height: `${start}px`}, {height: `${finish}px`}], {
        duration: 500,
        fill: 'forwards',
    });    
}

