// top-stories slider

// set color for slider topic
let sliderTopics = document.body.querySelectorAll('.slider__topic');
let colors = {
	Cinema: 		'#5261ac', // purple
	Travel: 		'#8cc63f', // green
	Television: '#ec098d', //pink
	Music: 		'#f78f1d', // orange
	"TV Show": 	'#00aedb', // blue
}
for (let topic of sliderTopics) {
	if (colors[topic.innerHTML.trim()])
		topic.style.backgroundColor = colors[topic.innerHTML.trim()];
}

let slider = document.body.querySelector('.slider');
let sliderWidth = slider.clientWidth;
let sliderList = document.body.querySelector('.slider__list');
let btnPrev = document.body.querySelector('.slider__btn-prev');
let btnNext = document.body.querySelector('.slider__btn-next');
// options for slider:
let position = 0;
const width = 325;
let count = Math.floor(sliderWidth / width);
count = Math.min(2, count);

btnPrev.hidden = true;

btnPrev.onclick = function() {
	position += width * count;
	if (position > -5) {
		position = 0;
		btnPrev.hidden = true;
	}
	sliderList.style.transform = `translateX(${position}px)`;
	btnNext.hidden = false;
}

btnNext.onclick = function() {
	position -= width * count;
	if (position < -(sliderList.scrollWidth - sliderWidth - 5)){
		position = - (sliderList.scrollWidth - sliderWidth + 30);
		btnNext.hidden = true;
	}
	sliderList.style.transform = `translateX(${position}px)`;
	btnPrev.hidden = false;
}

// disable tab for slider items
for (let item of sliderList.children) { 
	item.firstElementChild.setAttribute('tabindex', '-1');
}

window.addEventListener("resize", () => {
	sliderWidth = slider.clientWidth;
	count = Math.floor(sliderWidth / width);
	count = Math.min(2, count);
	if (position < -(sliderList.scrollWidth - sliderWidth - 5)){
		position = - (sliderList.scrollWidth - sliderWidth + 30);
		btnNext.hidden = true;
	} else btnNext.hidden = false;
	sliderList.style.transform = `translateX(${position}px)`;
})

//==================================================
// =================================================

document.addEventListener("DOMContentLoaded", function() {
	
	// background lines resizing
	let bgLines = document.body.querySelector('.lines');
	window.onscroll = function() {
		// bgLines.style.width = 650 + document.documentElement.scrollTop + 'px';
		bgLines.style.transform = `rotate(30deg) scaleX(${
			1 + (document.documentElement.scrollTop 
			/ document.documentElement.clientHeight) * 2
		})`		
	}
	// ===========================
	
	// resizing imgs from main gallery
	let galleryList = document.body.querySelectorAll('.gallery__list');

	function calculateGeometryImg(galleryList, start) {
		// if several sliders on the page
		for (let i = 0; i < galleryList.length; i++) {
			let currentGallery = galleryList[i];
			let countImg = currentGallery.children.length < 5 ? 4 : 5;
			let calcWidth = (currentGallery.clientWidth / countImg - 4) + 'px';
			// resize small imgs
			for (let i = 0; i < currentGallery.children.length; i++) {
				currentGallery.children[i].style.height = calcWidth;
				currentGallery.children[i].style.width = calcWidth;

				if (start && i && !((i + 1) % countImg)) {
					currentGallery.children[i].style.marginRight = 0;
				}			
			}
		}
	}
	calculateGeometryImg(galleryList, true);

	window.addEventListener("resize", () => {
		calculateGeometryImg(galleryList, false);
	})
	// =================================


	// create tag cloud 
	let listTag = document.body.querySelectorAll('.tag-cloud__item');
	listTag.forEach(item => randomProperty(item));

	function randomProperty(tag) {
		// min + Math.random() * (max + 1 - min) => [13...28]
		tag.style.fontSize = Math.floor(13 + Math.random() * 17) + 'px';
		tag.style.fontWeight = Math.random() < 0.3 ? 'bold' : '';
		tag.style.color = Math.random() < 0.15 ? '#f78f1d' : '';
	}
});