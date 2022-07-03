'use strict'

const accordion = document.querySelector('.accordion');
let size = getSize(document.documentElement.clientWidth);
const popup = document.querySelector('.popup');
const body = document.querySelector('.body');
let isPopup = false;

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
    //popup
    if (event.target.closest('.spoiler__img') && !isPopup || isPopup) {
        togglePopup (event.target.closest('.spoiler__img'))
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


// redraw elements when changing the screen width, for correct display

window.addEventListener('resize', () => {
    const windowSize = getSize(document.documentElement.clientWidth);
    if (size !== windowSize) {
        console.log('draw')
        accordion.innerHTML = ''; 
        drawElements()
    };
    size = windowSize;
}) 

function getSize (el) {
  if (el <= 375) {
    return 375
  } else if (el > 375 && el <= 768) {
    return 768
  } else if (el > 768 && el <= 1280) {
    return 1280
  } else if (el > 1280 && el <= 1440) {
    return 1440
  } else if (el > 1440) {
    return 1920
  }
}

// popup

popup.addEventListener('click', togglePopup)

function togglePopup (img) {
    if (!isPopup) {
        popup.children[0].children[0].src = img.src;
    } 
    popup.classList.toggle('popup_open');
    body.classList.toggle('body_hidden');
    isPopup = !isPopup;    
}