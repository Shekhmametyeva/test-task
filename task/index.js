'use strict'

const accordion = document.querySelector('.accordion');
const popup = document.querySelector('.popup');
const body = document.querySelector('.body');
let size = getSize(document.documentElement.clientWidth);
let isPopup = false;



window.addEventListener('load', () => {
    drawElements(accordion);

    accordion.addEventListener('click', (event) => {
        if (event.target.closest('.accordion__header')) {
            const item = event.target.closest('.accordion__item');
            toggleSpoiler(item, item.classList.contains('accordion__item_open'));
        }
        //popup
        if (event.target.closest('.spoiler__img') && !isPopup || isPopup) {
            togglePopup (event.target.closest('.spoiler__img'))
        }
    });  
    
    popup.addEventListener('click', togglePopup)
});

window.addEventListener('resize', () => {
    const windowSize = getSize(document.documentElement.clientWidth);
    if (size !== windowSize) {
        console.log('draw')
        accordion.innerHTML = ''; 
        drawElements(accordion)
    };
    size = windowSize;
}) 

// draw accordion elements

function drawElements (accordion) {
    countries.forEach(el => {
        const item = 
        `<div class="accordion__item">
            <div class="accordion__header">
                <h2 class="accordion__title">${el.title}</h2>
                <img class="accordion__button" src="assets/icon/button.png" alt="button">
            </div>
            <div class="spoiler">
                <img class="spoiler__img" src="assets/images/${el.src}.jpg" alt="${el.title}">
                <h4 class="spoiler__title">${el.size}</h4> 
                <p class="spoiler__text">${el.text1}</p>
                <p class="spoiler__text">${el.text2}</p>
            </div>
        </div>`;
        accordion.innerHTML += item;
    })     
}

// open accordion

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


// redraw elements when changing the screen width, for correct display

function getSize (el) {
    const SmallSizePx = 375;
    const MediumSizePx = 768;
    const LargeSizePx = 1280;
    const ExtraLargeSizePx = 1440;
    const ExtraExtraLargeSizePx = 1920;

    if (el <= SmallSizePx) {
        return SmallSizePx
    } else if (el > SmallSizePx && el <= MediumSizePx) {
        return MediumSizePx
    } else if (el > MediumSizePx && el <= LargeSizePx) {
        return LargeSizePx
    } else if (el > LargeSizePx && el <= ExtraLargeSizePx) {
        return ExtraLargeSizePx
    } else if (el > ExtraLargeSizePx) {
        return ExtraExtraLargeSizePx
    }
}

// popup

function togglePopup (img) {
    if (!isPopup) {
        popup.children[0].children[0].src = img.src;
    } 
    popup.classList.toggle('popup_open');
    body.classList.toggle('body_hidden');
    isPopup = !isPopup;    
}