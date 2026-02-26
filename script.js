const navLinks = document.querySelectorAll('nav a');
const sections = document.querySelectorAll('section[id]');
const nav = document.querySelector('nav');
const menuToggle = document.querySelector('.menu-toggle');
const menuIcon = document.querySelector('.menu-toggle i');
const hireMeButton = document.querySelector('#hireMeBtn');
const headerHeight = document.querySelector('header').offsetHeight;

function setActiveById(sectionId) {
    navLinks.forEach((link) => {
        const target = link.getAttribute('href');
        if (target === `#${sectionId}`) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            setActiveById(entry.target.id);
        }
    });
}, {
    root: null,
    rootMargin: `-${headerHeight}px 0px -55% 0px`,
    threshold: 0.1
});

sections.forEach((section) => observer.observe(section));

window.addEventListener('load', () => setActiveById('home'));

if (menuToggle && nav) {
    function updateMenuState(isExpanded) {
        menuToggle.setAttribute('aria-expanded', String(isExpanded));
        menuToggle.classList.toggle('is-open', isExpanded);

        if (menuIcon) {
            menuIcon.classList.toggle('fa-bars', !isExpanded);
            menuIcon.classList.toggle('fa-xmark', isExpanded);
        }
    }

    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
        const isExpanded = nav.classList.contains('active');
        updateMenuState(isExpanded);
    });

    navLinks.forEach((link) => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            updateMenuState(false);
        });
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 995) {
            nav.classList.remove('active');
            updateMenuState(false);
        }
    });

    updateMenuState(false);
}

const typingElement = document.querySelector('.typing-text span');

if (typingElement) {
    const roleTitles = [
        'Web Developer',
        'Software Engineer',
        'Developer',
        'DevOps Engineer',
        'Tech Enthusiast'
    ];

    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const typeSpeed = 100;
    const deleteSpeed = 70;
    const pauseAfterType = 1200;

    function runTypingAnimation() {
        const currentTitle = roleTitles[titleIndex];

        if (!isDeleting) {
            charIndex += 1;
            typingElement.textContent = currentTitle.slice(0, charIndex);

            if (charIndex === currentTitle.length) {
                isDeleting = true;
                setTimeout(runTypingAnimation, pauseAfterType);
                return;
            }

            setTimeout(runTypingAnimation, typeSpeed);
            return;
        }

        charIndex -= 1;
        typingElement.textContent = currentTitle.slice(0, charIndex);

        if (charIndex === 0) {
            isDeleting = false;
            titleIndex = (titleIndex + 1) % roleTitles.length;
        }

        setTimeout(runTypingAnimation, deleteSpeed);
    }

    runTypingAnimation();
}

if (hireMeButton) {
    hireMeButton.addEventListener('click', (event) => {
        event.preventDefault();
        window.alert('Call +263787532932');
    });
}
