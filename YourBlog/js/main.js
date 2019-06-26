// top-stories slider
let sliderItems = document.body.querySelectorAll('.top-stories__item');
let correntPos = 0;

function strafeSlider(direction) {
	
	if (direction) {
		sliderItems[correntPos].classList.add('item-hidden');
		sliderItems[correntPos + 3].classList.remove('item-hidden');
		correntPos++;
	} else {
		sliderItems[correntPos + 2].classList.add('item-hidden');
		sliderItems[correntPos - 1].classList.remove('item-hidden');
		correntPos--;
	}
}

// =================================

document.addEventListener("DOMContentLoaded", function() {
	
	// background lines resizing
	let bgLines = document.body.querySelector('.lines');
	window.onscroll = function() {
		bgLines.style.width = 650 + document.documentElement.scrollTop + 'px';
	}
	// ===========================
	
	
	

	// resizing imgs from top-stories
	// let topStoriesLinks = document.querySelectorAll('.top-stories__wrap-img');

	// function resizeHeight(arrElems) {
	// 	let minHeight = 190; // max-height: 190px;
	// 	arrElems.forEach((item) => { // search min height form imgs
	// 		let imgH = item.firstElementChild.clientHeight;
	// 		if (imgH && imgH < minHeight) minHeight = imgH;
	// 	})
	// 	arrElems.forEach((item) => {
	// 		item.style.height = minHeight + 'px';
	// 	})
	// }
	// resizeHeight(topStoriesLinks);
	// ==================================

	




	// resizing imgs from content sliders
	let sliders = document.body.querySelectorAll('.slider__images');
	let listImg = document.querySelectorAll('.slider__small-img');

	function calculateGeometryImg(sliderList, start) {
		// if several sliders on the page
		for (let i = 0; i < sliderList.length; i++) {
			let currentSlider = sliderList[i];
			let countImg 		= currentSlider.children.length < 5 ? 4 : 5;
			let calcWidth 		= (currentSlider.clientWidth / countImg - 4) + 'px';
			// resize small imgs
			for (let i = 0; i < currentSlider.children.length; i++) {
				currentSlider.children[i].style.height = calcWidth;
				currentSlider.children[i].style.width 	= calcWidth;

				if (start && i && !((i + 1) % countImg)) {
					currentSlider.children[i].style.marginRight = 0;
				}			
			}
		}
		// small imgs shift to the middle 
		listImg.forEach((item) => {
			let diff = (item.clientHeight - item.clientWidth) / 2;
			item.style.left = diff + "px";
		})
	}
	calculateGeometryImg(sliders, true);
	// =================================








	window.onresize = function () {
		resizeHeight(topStoriesLinks);
		calculateGeometryImg(sliders, false);
	}

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