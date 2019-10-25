let banner = document.body.querySelector('.banner');
let start = 0.5;

for (let i = 0; i < 30; ++i) {
	let delay = (Math.random() * 3).toFixed(1);
	let opacity = start;
	if (!(i%6)) {
		start += 0.1;
		console.log(start.toFixed(1));
	}

	let confetti = document.createElement('div');
	confetti.className = 'banner__confetti';
	confetti.style.cssText = `left: ${Math.round(Math.random() * 325)}px;
	opacity: ${1.5 - opacity};
	animation-duration: ${opacity * 4}s;
	animation-delay: ${delay}s;`;

	setTimeout(()=> {
		setInterval(()=> {confetti.style.left = Math.round(Math.random() * 325) + 'px';}, opacity * 4000);
	}, delay * 1000);

	banner.prepend(confetti);
}