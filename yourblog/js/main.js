// top-stories slider

let slider = document.body.querySelector('.slider');
let sliderWidth = slider.clientWidth;
let sliderList = slider.querySelector('.slider__list');
let btnPrev = slider.querySelector('.slider__btn-prev');
let btnNext = slider.querySelector('.slider__btn-next');
// options for slider:
let position = 0;
const widthItem = sliderList.firstElementChild.clientWidth;
let count = Math.floor(sliderWidth / widthItem);
count = Math.max(1, Math.min(2, count))

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

function calculateSlider() {
	sliderWidth = slider.clientWidth;
	count =  Math.floor(sliderWidth / widthItem);
	count = Math.max(1, Math.min(2, count));
	if (position < -(sliderList.scrollWidth - sliderWidth - 5)){
		position = - (sliderList.scrollWidth - sliderWidth + 30);
		btnNext.hidden = true;
	} else btnNext.hidden = false;
	sliderList.style.transform = `translateX(${position}px)`;
}

calculateSlider = throttle(calculateSlider, 200);

window.addEventListener("resize", () => {
	calculateSlider();
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
		
		let currentImg = galleryList[i].parentElement.querySelector('.gallery__current-img');
		
		galleryList[i].onclick = function() {
			let smallImg = event.target;
			if (smallImg.tagName == 'IMG') {
				let newSrc = smallImg.dataset.bigsize;
				currentImg.setAttribute('src', newSrc);
			}
		}
	}

	function calculateGeometryImgGalleries() {
		for (let i = 0; i < galleryList.length; i++) {
			calculateGeometryImgGallery(galleryList[i]);
		}
	}

	calculateGeometryImgGalleries = throttle(calculateGeometryImgGalleries, 1000);

	window.addEventListener('resize', () => {
		calculateGeometryImgGalleries();
	})
	//===============================================

	// background lines resizing
	let bgLines = document.body.querySelector('.lines');

	function transformLines() {
		bgLines.style.transform = `rotate(30deg) scaleX(${
			1 + (document.documentElement.scrollTop 
			/ document.documentElement.clientHeight) * 2
		})`;
	}

	transformLines = throttle(transformLines, 100);

	window.addEventListener('scroll', () => {
		transformLines();
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

	// last-stories change category
	let lastStories = document.body.querySelector('.last-stories');

	lastStories.onclick = function(e) {
		let target = e.target;

		let topic = target.dataset.topic;
		
		if (!topic || target.classList.contains('active-category')) return;
		
		let activeCategory = lastStories.querySelector('.active-category');
		let activeTopic = activeCategory.dataset.topic;

		activeCategory.classList.remove('active-category');
		lastStories.querySelector('.topic__' + activeTopic).style.display = 'none';
		
		target.classList.add('active-category');
		lastStories.querySelector('.topic__' + topic).style.display = 'block';
	}
	// ================================================

	let btnToUp = document.body.querySelector('.button-to-up');
	btnToUp.onclick = function () {
		let timerID = setInterval(() => {
			let coords = window.pageYOffset;
			if (coords > 0) {
				coords -= 150;
				window.scrollTo(0, coords);
			} else clearInterval(timerID);
		}, 10);
	}
	if (document.documentElement.scrollTop < 150) btnToUp.style.transform = 'scaleY(0)';

	window.addEventListener('scroll', () => {
		if (document.documentElement.scrollTop < 150) btnToUp.style.transform = 'scaleY(0)';
		else btnToUp.style.transform = '';
	})

	let btnSidebarShow = document.body.querySelector('.button-sidebar');
	let sidebar = document.body.querySelector('.sidebar');
	function sidebarShow() {
		btnSidebarShow.classList.toggle('back-arrow');
		sidebar.classList.toggle('sidebar-hidden');
		if (sidebar.firstElementChild.style.display == 'block') 
			sidebar.firstElementChild.style.display = 'none'; 
		else sidebar.firstElementChild.style.display = 'block';
	}
	btnSidebarShow.onclick = sidebarShow;

	function resetSidebar()  {
		if (document.body.offsetWidth > 1000) {
			sidebar.firstElementChild.style = 'block';
			sidebar.classList.remove('sidebar-hidden');
			btnSidebarShow.classList.remove('back-arrow');
		} 
	}

	resetSidebar = throttle(resetSidebar, 1000);

	window.addEventListener("resize", () => {
		resetSidebar();
	})

});

function throttle(f, ms) {
	var delay = true;
	var saveArgs = null;

	return function wrap() {
		if (delay) {
			f.apply(this, arguments);
			saveArgs = null;
			delay = false;
			setTimeout(function() {
				delay = true;
				if (saveArgs) {
					wrap(...saveArgs);
				}
			}, ms);
		} else {
			saveArgs = arguments;
		}
	}
}

// let oldScroll = document.documentElement.scrollTop;
// window.addEventListener('scroll', function(){
// 	let newScroll = document.documentElement.scrollTop;
// 	if(oldScroll > newScroll)
// 		console.log('up');
// 	else 
// 		console.log('down');
// 	oldScroll = document.documentElement.scrollTop;
// })