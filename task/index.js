'use strict'

const accordion = document.querySelector('.accordion');

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

