var menu = document.querySelector('.menu__group-links');
var burger = document.querySelector('.burger');

burger.addEventListener('click', function() {
if 	(this.classList.contains('burger_opened')) {
	this.classList.remove('burger_opened');
	menu.classList.remove('menu__group-links_burger');
} else {
	this.classList.add('burger_opened');
	menu.classList.add('menu__group-links_burger');
}
})

menu.addEventListener('click', function() {
	burger.classList.remove('burger_opened');
	menu.classList.remove('menu__group-links_burger');
})

