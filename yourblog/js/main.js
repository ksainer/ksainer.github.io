document.addEventListener("DOMContentLoaded", () => {
	// background lines resizing
	const bgLines = document.body.querySelector('.lines');

	function transformLines() {
		let scrollTop = document.documentElement.scrollTop;
		let clientHeight = document.documentElement.clientHeight;
		let clientWidth = document.documentElement.clientWidth;

		if (scrollTop + 200 < clientWidth)
			bgLines.style.transform = `rotate(30deg) scaleX(${	1 + (scrollTop / clientHeight) * 2 })`;
	}

	transformLines = throttle(transformLines, 100);

	window.addEventListener('scroll', () => transformLines());
	// ==============================================

	// scrim config
	const scrim = document.body.querySelector('.scrim');
	let scrimKey;

	scrim.onclick = function() {
		switch (scrimKey) {
			case "sidebar": hideSidebar(); break;
			case "signIn": hideSignIn(); break;
		}
	}
	// ================================================

	// button scrolls to top
	const btnToUp = document.body.querySelector('.button-to-up');
	btnToUp.onclick = function () {
		let timerID = setInterval(() => {
			let coords = window.pageYOffset;
			if (coords > 0) {
				coords -= 150;
				window.scrollTo(0, coords);
			} else clearInterval(timerID);
		}, 10);
	}

	function showbtnToUp() {
		if (document.documentElement.scrollTop < 150) btnToUp.style.transform = 'scaleY(0)';
		else btnToUp.style.transform = '';
	};
	showbtnToUp();

	showbtnToUp = throttle(showbtnToUp, 500);

	window.addEventListener('scroll', () => showbtnToUp());
	// ================================================

	setColors(document.body.querySelector('.main-menu').children);

	// sign-in__button
	const sectionLogin = document.body.querySelector('.auth');
	if (sectionLogin) {
		const signIn = document.body.querySelector('.sign-in__button');
		const sectionLoginCloseButton = sectionLogin.querySelector('.auth__close-button');
		sectionLoginCloseButton.onclick = hideSignIn;
		signIn.onclick = showSignIn;

		function showSignIn() {
			scrim.style.zIndex = '6';
			scrim.hidden = false;
			sectionLogin.hidden = false;
			scrimKey = 'signIn';
			sectionLogin.querySelector('input').focus();
		}

		function hideSignIn() {
			scrim.style.zIndex = '';
			scrim.hidden = true;
			sectionLogin.hidden = true;
			scrimKey = '';
		}
		
		const sectionLoginSignIn = sectionLogin.querySelector('.auth__sign-in');
		const sectionLoginSignUp = sectionLogin.querySelector('.auth__sign-up');
		const formSignIn = sectionLogin.querySelector('.form-sign-in');
		const formSignUp = sectionLogin.querySelector('.form-sign-up');

		function changeLogin() {
			if (!this.classList.contains('auth__active')) {
				sectionLoginSignIn.classList.toggle('auth__active');
				sectionLoginSignUp.classList.toggle('auth__active');
				// this.classList.add('auth__active');

				formSignIn.classList.toggle('visible');
				formSignUp.classList.toggle('visible');

				// formSignIn.style.display = getComputedStyle(formSignIn).display == 'none' ? 'block' : 'none';
				// formSignUp.style.display = getComputedStyle(formSignUp).display == 'none' ? 'block' : 'none';
			}
		}

		sectionLoginSignIn.onclick = sectionLoginSignUp.onclick = changeLogin;
	}
	// ================================================

	// account
	const account = document.body.querySelector('.account');
	if (account) {
		const accountButton = account.querySelector('.account__button');
		const accountMenu = account.querySelector('.account__menu');

		setColors(accountMenu.children);

		accountButton.onclick = function() {
			accountMenu.classList.toggle('visible');
		}

		document.addEventListener('click', function(e) {
			if (!account.contains(e.target) && accountMenu.classList.contains('visible'))
				accountMenu.classList.remove('visible');
		})
		document.addEventListener('keydown', () => {
			if (event.key == 'Escape' && accountMenu.classList.contains('visible'))
				accountMenu.classList.remove('visible');
		});
	}
	// ================================================

	// top-stories slider
	const slider = document.body.querySelector('.slider');
	if (slider) {
		let sliderWidth = slider.clientWidth;
		const sliderList = slider.querySelector('.slider__list');
		const btnPrev = slider.querySelector('.slider__btn-prev');
		const btnNext = slider.querySelector('.slider__btn-next');
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

		window.addEventListener("resize", () => calculateSlider());

		// set color for slider topic
		const sliderTopics = sliderList.querySelectorAll('.slider__topic');
		setColors(sliderTopics, true);

		// disable tab for slider items
		for (let item of sliderList.children) { 
			item.firstElementChild.setAttribute('tabindex', '-1');
		}
	}
	// =================================================

	// gallery for posts
	const galleryList = document.body.querySelectorAll('.gallery__list');
	if (galleryList) {
		function calculateGeometryImgGallery(listImg) {
			for (let j = 0; j < listImg.length; j++) {
				const items = listImg[j].children;
				const countImg = items.length < 5 ? 4 : 5;
				const width = listImg[j].clientWidth / countImg  + 'px';
			
				for (let i = 0; i < items.length; i++) {
					items[i].style.height = width;
					items[i].style.width = width;
			
					if (i && !((i + 1) % countImg)) {
						items[i].style.marginRight = 0;
					}	
				}
			}
		}

		calculateGeometryImgGallery(galleryList);
		
		calculateGeometryImgGallery = throttle(calculateGeometryImgGallery, 1000);
		
		for (let i = 0; i < galleryList.length; i++) {
			let currentImg = galleryList[i].parentElement.querySelector('.gallery__current-img');
			
			galleryList[i].onclick = function() {
				let smallImg = event.target;
				if (smallImg.tagName == 'IMG') {
					let newSrc = smallImg.dataset.bigsize;
					currentImg.setAttribute('src', newSrc);
				}
			}
		}
		
		window.addEventListener('resize', () => {
			if (window.innerWidth < 1100)	calculateGeometryImgGallery(galleryList);
		})
	}
	//===============================================

	// last-stories change category
	const lastStories = document.body.querySelector('.last-stories');

	lastStories.onclick = function(e) {
		const target = e.target;

		const topic = target.dataset.topic;
		
		if (!topic || target.classList.contains('active-category')) return;
		
		const activeCategory = lastStories.querySelector('.active-category');
		const activeTopic = activeCategory.dataset.topic;

		activeCategory.classList.remove('active-category');
		lastStories.querySelector('.topic__' + activeTopic).style.display = 'none';
		
		target.classList.add('active-category');
		lastStories.querySelector('.topic__' + topic).style.display = 'block';
	}
	// ================================================

	// button show and hide sidebar
	const sidebar = document.body.querySelector('.sidebar');
	const toggleButtonSidebar = sidebar.querySelector('.button-sidebar');
	const sidebarWrap = sidebar.querySelector('.sidebar__wrap');

	setColors(sidebar.querySelector('.last-stories__menu').children, true);
	
	function showSidebar() {
		toggleButtonSidebar.classList.add('back-arrow');
		sidebar.classList.add('sidebar-show');
		sidebarWrap.style.display = 'block';
		scrim.hidden = false;
		scrimKey = 'sidebar';
	}

	function hideSidebar() {
		toggleButtonSidebar.classList.remove('back-arrow');
		sidebar.classList.remove('sidebar-show');
		sidebarWrap.style.display = '';
		scrim.hidden = true;
		scrimKey = '';
	}	

	toggleButtonSidebar.onclick = function sidebarToggle() {
		scrimKey == 'sidebar' ? hideSidebar() : showSidebar();
	};

	function resetSidebar()  {
		if (scrimKey == 'sidebar') hideSidebar();
		setTimeout(() => calculateGeometryImgGallery(galleryList), 400);
	}
	
	resetSidebar = throttle(resetSidebar, 200);

	window.addEventListener("resize", () =>{
		if (window.innerWidth > 1000) resetSidebar();
	});
	// ================================================

	// create tag cloud 
	function randomProperty(tag) {
		// min + Math.random() * (max + 1 - min) => [13...28]
		tag.style.fontSize = Math.floor(13 + Math.random() * 17) + 'px';
		tag.style.fontWeight = Math.random() < 0.3 ? 'bold' : '';
		tag.style.color = Math.random() < 0.15 ? '#f78f1d' : '';
	}
	const listTag = document.body.querySelectorAll('.tag-cloud__item');
	listTag.forEach(item => randomProperty(item));
	// ==============================================

	// hot keys
	document.addEventListener('keydown', (event) => {
		if (event.key == 'Escape' && !scrim.hidden) scrim.click();
	});
	// ==============================================
});

function throttle(f, ms) {
	let delay = true;
	let saveArgs = null;

	return function wrap() {
		if (delay) {
			f.apply(this, arguments);
			saveArgs = null;
			delay = false;
			setTimeout(() => {
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

function setColors(elemList, byName) {
	const colors = [
		'#00aedb', // blue
		'#8cc63f', // green
		'#ec098d', // pink
		'#f78f1d', // orange
		'#FF0000', // red
		// '#FF0000', // red
	];
	const colorTopics = {
		"tv show": 	0, // blue
		cinema: 		0, // blue
		travel: 		1, // green
		fashion: 	2, // pink
		television: 2, // pink
		sport:	 	3, // orange
		music: 		4, // red
	};
	
	if (byName) {

		for (let i = 0; i < elemList.length; ++i) {
			let text = elemList[i].innerHTML.trim().toLowerCase();
			let color = colors[colorTopics[text]]
			if (color) 
				elemList[i].style.backgroundColor = color;
		}

	} else {

		for (let i = 0; i < elemList.length; ++i) {
			let color = colors[i - colors.length * Math.floor( i / colors.length)];
			elemList[i].style.backgroundColor = color;
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