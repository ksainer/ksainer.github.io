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
let topStoriesImgs = document.querySelectorAll('.top-stories__link');

function resizeHeight(arrElems) {
	let minH = 190;
	arrElems.forEach((item) => {
		if (item.firstElementChild.clientHeight < minH) minH = item.firstElementChild.clientHeight;
		console.log(item.firstElementChild.clientHeight);
	})
	arrElems.forEach((item) => {
		item.style.height = minH + 'px';
	})
}

resizeHeight(topStoriesImgs);


// if several sliders on the page
for (let i = 0; i < slider.length; i++) {
	let currentSlider = slider[i];
	let countImg = currentSlider.children.length < 5 ? 4 : 5;
	let sliderWidth = (currentSlider.clientWidth / countImg - 12) + 'px';
	// resize small imgs
	for (let i = 0; i < currentSlider.children.length; i++) {
		currentSlider.children[i].style.height = sliderWidth;
		currentSlider.children[i].style.width = sliderWidth;
		if (i && !(i % (countImg - 1))) {
			currentSlider.children[i].style.marginRight = 0;
		}
	}
}
// small imgs shift to the middle 
listImg.forEach((item) => {
	let diff = (item.clientHeight - item.clientWidth) / 2;
	item.style.left = diff + "px";
})

window.onresize = function () {
	resizeHeight(topStoriesImgs);
	// resize small imgs
	for (let i = 0; i < slider.length; i++) {
		let currentSlider = slider[i];
		let countImg = currentSlider.children.length < 5 ? 4 : 5;
		sliderWidth = (currentSlider.clientWidth / countImg - 12) + 'px';

		for (let i = 0; i < currentSlider.children.length; i++) {
			currentSlider.children[i].style.height = sliderWidth;
			currentSlider.children[i].style.width = sliderWidth;
		}
	}
	// recentralize small imgs
	listImg.forEach((item) => {
		let diff = (item.clientHeight - item.clientWidth) / 2;
		item.style.left = diff + "px";
	})
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