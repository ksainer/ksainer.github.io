// background lines resizing
$('.lines').width(scroll + 650);
$(window).scroll(function () {
	let scroll = $(this).scrollTop();
	$('.lines').width(scroll + 650);
});
// ===========================
// resizing img from slider
let slider = document.body.querySelectorAll('.slider__images');
let listImg = document.querySelectorAll('.slider__small-img');
let topStoriesLinks = document.querySelectorAll('.top-stories__link');

function resizeHeight(arrElems) {
	let minH = 190; // max-height: 190px;
	arrElems.forEach((item) => {
		let imgH = item.firstElementChild.clientHeight;
		if (imgH < minH) minH = imgH;
	})
	arrElems.forEach((item) => {
		item.style.height = minH + 'px';
	})
}
resizeHeight(topStoriesLinks);

function calculateGeometryImg(listSliders, start) {
	// if several sliders on the page
	for (let i = 0; i < listSliders.length; i++) {
		let currentSlider = listSliders[i];
		let countImg = currentSlider.children.length < 5 ? 4 : 5;
		let margin = +getComputedStyle(currentSlider.children[0]).marginRight.slice(0,-2);
		let calcWidth = (currentSlider.clientWidth / countImg - 4) + 'px';
		// resize small imgs
		for (let i = 0; i < currentSlider.children.length; i++) {
			currentSlider.children[i].style.height = calcWidth;
			currentSlider.children[i].style.width = calcWidth;
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
calculateGeometryImg(slider, true);


window.onresize = function () {
	resizeHeight(topStoriesLinks);
	calculateGeometryImg(slider, false);
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