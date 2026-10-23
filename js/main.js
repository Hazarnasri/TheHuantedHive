const menuButton = document.getElementById('mbtog');
const mobileMenu = document.getElementById('mbmenu');
const barIcon = document.getElementById('barIcon');
const closeIcon = document.getElementById('xIcon');

function closeMobileMenu() {
    if (!menuButton || !mobileMenu) return;
    mobileMenu.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open navigation');
    if (barIcon) barIcon.style.display = 'inline';
    if (closeIcon) closeIcon.style.display = 'none';
}

if (menuButton && mobileMenu) {
    menuButton.addEventListener('click', () => {
        const isOpen = mobileMenu.classList.toggle('open');
        menuButton.setAttribute('aria-expanded', String(isOpen));
        menuButton.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
        if (barIcon) barIcon.style.display = isOpen ? 'none' : 'inline';
        if (closeIcon) closeIcon.style.display = isOpen ? 'inline' : 'none';
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    document.addEventListener('keydown', event => {
        if (event.key === 'Escape') closeMobileMenu();
    });
}

const authDialog = document.getElementById('authDialog');
const authStatus = document.getElementById('authStatus');
const authForms = {
    login: document.getElementById('loginForm'),
    register: document.getElementById('registerForm')
};

function selectAuthTab(tab) {
    Object.entries(authForms).forEach(([name, form]) => {
        const selected = name === tab;
        form.hidden = !selected;
        document.getElementById(`${name}Tab`).classList.toggle('active', selected);
        document.getElementById(`${name}Tab`).setAttribute('aria-selected', String(selected));
    });
    if (authStatus) authStatus.textContent = '';
}

document.querySelectorAll('[data-auth-open]').forEach(button => {
    button.addEventListener('click', () => {
        closeMobileMenu();
        selectAuthTab(button.dataset.authOpen);
        if (authDialog && !authDialog.open) authDialog.showModal();
    });
});

document.querySelectorAll('[data-auth-tab]').forEach(button => {
    button.addEventListener('click', () => selectAuthTab(button.dataset.authTab));
});

const authClose = document.getElementById('authClose');
if (authClose && authDialog) {
    authClose.addEventListener('click', () => authDialog.close());
    authDialog.addEventListener('click', event => {
        if (event.target === authDialog) authDialog.close();
    });
}

Object.values(authForms).forEach(form => {
    form.addEventListener('submit', event => {
        event.preventDefault();
        const password = form.querySelector('input[type="password"]');
        if (password) password.value = '';
        authStatus.textContent = 'This is a sample form only. Connect your authentication provider to enable account access.';
    });
});

const navBar = document.getElementById('nbar');
if (navBar) {
    const updateNav = () => navBar.classList.toggle('scr', window.scrollY > 40);
    window.addEventListener('scroll', updateNav, { passive: true });
    updateNav();
}

const revealElements = document.querySelectorAll('.rv');
if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
    revealElements.forEach(element => revealObserver.observe(element));
} else {
    revealElements.forEach(element => element.classList.add('in'));
}
