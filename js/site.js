(function () {
	'use strict';

	var root = document.documentElement;

	// ---------- Footer year ----------
	document.getElementById('year').textContent = new Date().getFullYear();

	// ---------- Theme toggle (light / dark, remembered per visitor) ----------
	function currentTheme() {
		if (root.dataset.theme) return root.dataset.theme;
		return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
	}
	document.querySelector('.theme-toggle').addEventListener('click', function () {
		var next = currentTheme() === 'dark' ? 'light' : 'dark';
		root.dataset.theme = next;
		try { localStorage.setItem('theme', next); } catch (e) {}
	});

	// ---------- Mobile menu ----------
	var menuBtn = document.querySelector('.menu-toggle');
	var links = document.getElementById('nav-links');
	function setMenu(open) {
		menuBtn.setAttribute('aria-expanded', String(open));
		menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
		links.classList.toggle('is-open', open);
	}
	menuBtn.addEventListener('click', function () {
		setMenu(menuBtn.getAttribute('aria-expanded') !== 'true');
	});
	links.addEventListener('click', function (e) {
		if (e.target.closest('a')) setMenu(false);
	});
	document.addEventListener('keydown', function (e) {
		if (e.key === 'Escape') setMenu(false);
	});
	document.addEventListener('click', function (e) {
		if (!e.target.closest('.nav')) setMenu(false);
	});

	// ---------- Active nav link ----------
	var navLinks = links.querySelectorAll('a[href^="#"]');
	var sectionObserver = new IntersectionObserver(function (entries) {
		entries.forEach(function (entry) {
			if (!entry.isIntersecting) return;
			navLinks.forEach(function (a) {
				a.classList.toggle('is-active', a.getAttribute('href') === '#' + entry.target.id);
			});
		});
	}, { rootMargin: '-45% 0px -50% 0px' });
	navLinks.forEach(function (a) {
		var section = document.querySelector(a.getAttribute('href'));
		if (section) sectionObserver.observe(section);
	});

	// ---------- Live clock (India Standard Time) ----------
	var clock = document.getElementById('clock');
	var timeFormat = new Intl.DateTimeFormat('en-IN', {
		hour: '2-digit', minute: '2-digit', hour12: true, timeZone: 'Asia/Kolkata'
	});
	function tick() {
		clock.textContent = timeFormat.format(new Date()).toUpperCase();
	}
	tick();
	setInterval(tick, 15000);

	// ---------- Scroll reveal ----------
	var revealObserver = new IntersectionObserver(function (entries) {
		entries.forEach(function (entry) {
			if (entry.isIntersecting) {
				entry.target.classList.add('visible');
				revealObserver.unobserve(entry.target);
			}
		});
	}, { threshold: 0.12 });
	document.querySelectorAll('.reveal').forEach(function (el) {
		revealObserver.observe(el);
	});

	// ---------- Copy email ----------
	var copyBtn = document.getElementById('copy-email');
	if (navigator.clipboard) {
		copyBtn.addEventListener('click', function () {
			navigator.clipboard.writeText(copyBtn.dataset.email).then(function () {
				copyBtn.textContent = 'Copied ✓';
				copyBtn.classList.add('is-done');
				setTimeout(function () {
					copyBtn.textContent = 'Copy';
					copyBtn.classList.remove('is-done');
				}, 2000);
			});
		});
	} else {
		copyBtn.hidden = true;
	}

	// ---------- Contact form: compose an email in the visitor's mail app ----------
	var form = document.getElementById('contact-form');
	var status = document.getElementById('form-status');
	var TO = 'chandrasekar1996@gmail.com';

	form.addEventListener('submit', function (e) {
		e.preventDefault();
		var invalid = null;
		['name', 'email', 'message'].forEach(function (name) {
			var input = form.elements[name];
			var ok = input.checkValidity() && input.value.trim() !== '';
			input.parentNode.classList.toggle('has-error', !ok);
			if (!ok && !invalid) invalid = input;
		});
		if (invalid) {
			status.textContent = 'Please fill in your name, a valid email and a message.';
			status.classList.add('is-error');
			invalid.focus();
			return;
		}

		var data = new FormData(form);
		var subject = data.get('topic') + ' — from ' + data.get('name').trim();
		var body = data.get('message').trim() + '\n\n— ' + data.get('name').trim() + ' (' + data.get('email').trim() + ')';
		window.location.href = 'mailto:' + TO +
			'?subject=' + encodeURIComponent(subject) +
			'&body=' + encodeURIComponent(body);

		status.classList.remove('is-error');
		status.textContent = 'Opening your email app… if nothing happens, write to ' + TO + '.';
	});

	form.addEventListener('input', function (e) {
		e.target.parentNode.classList.remove('has-error');
	});
})();
