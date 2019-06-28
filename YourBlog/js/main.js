// top-stories slider

let slider = document.body.querySelector('.slider');
let sliderWidth = slider.clientWidth;
let sliderList = slider.querySelector('.slider__list');
let btnPrev = slider.querySelector('.slider__btn-prev');
let btnNext = slider.querySelector('.slider__btn-next');
// options for slider:
let position = 0;
const widthItem = 325;
let count = Math.min(2, Math.floor(sliderWidth / widthItem));

btnPrev.hidden = true;

btnPrev.onclick = function() {
	position += widthItem * count;
	if (position > -5) {
		position = 0;
		btnPrev.hidden = true;
	}
	sliderList.style.transform = `translateX(${position}px)`;
	btnNext.hidden = false;
}

btnNext.onclick = function() {
	position -= widthItem * count;
	if (position < -(sliderList.scrollWidth - sliderWidth - 5)){
		position = - (sliderList.scrollWidth - sliderWidth + 30);
		btnNext.hidden = true;
	}
	sliderList.style.transform = `translateX(${position}px)`;
	btnPrev.hidden = false;
}

window.addEventListener("resize", () => {
	sliderWidth = slider.clientWidth;
	count = Math.floor(sliderWidth / widthItem);
	count = Math.min(2, count);
	if (position < -(sliderList.scrollWidth - sliderWidth - 5)){
		position = - (sliderList.scrollWidth - sliderWidth + 30);
		btnNext.hidden = true;
	} else btnNext.hidden = false;
	sliderList.style.transform = `translateX(${position}px)`;
})

// set color for slider topic
let sliderTopics = sliderList.querySelectorAll('.slider__topic');
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

// disable tab for slider items
for (let item of sliderList.children) { 
	item.firstElementChild.setAttribute('tabindex', '-1');
}

// =================================================
// =================================================

document.addEventListener("DOMContentLoaded", function() {
	// gallery for posts
	function calculateGeometryImgGallery(listImg) {
		let items = listImg.children;
		let countImg = items.length < 5 ? 4 : 5;
		let width = listImg.clientWidth / countImg -4 + 'px';
	
		for (let i = 0; i < items.length; i++) {
			items[i].style.height = width;
			items[i].style.width = width;
	
			if (i && !((i + 1) % countImg)) {
				items[i].style.marginRight = 0;
			}	
		}
	}
	let galleryList = document.body.querySelectorAll('.gallery__list');
	for (let i = 0; i < galleryList.length; i++) {
		calculateGeometryImgGallery(galleryList[i]);

		let smallImg = galleryList[i].querySelectorAll('.gallery__small-img');
		let currentImg = galleryList[i].parentElement.querySelector('.gallery__current-img');
		for (let i = 0; i < smallImg.length; i++) {
			smallImg[i].onclick = function() {
				let newSrc = this.getAttribute('data-bigSize');
				currentImg.setAttribute('src', newSrc);
			}
		}
	}
	window.addEventListener('resize', () => {
		for (let i = 0; i < galleryList.length; i++) {
			calculateGeometryImgGallery(galleryList[i]);
		}
	})
	//===============================================

	// background lines resizing
	let bgLines = document.body.querySelector('.lines');

	window.addEventListener('scroll', () => {
		bgLines.style.transform = `rotate(30deg) scaleX(${
			1 + (document.documentElement.scrollTop 
			/ document.documentElement.clientHeight) * 2
		})`	
	})
	// ==============================================

	// create tag cloud 
	function randomProperty(tag) {
		// min + Math.random() * (max + 1 - min) => [13...28]
		tag.style.fontSize = Math.floor(13 + Math.random() * 17) + 'px';
		tag.style.fontWeight = Math.random() < 0.3 ? 'bold' : '';
		tag.style.color = Math.random() < 0.15 ? '#f78f1d' : '';
	}
	let listTag = document.body.querySelectorAll('.tag-cloud__item');
	listTag.forEach(item => randomProperty(item));
	// ==============================================
});