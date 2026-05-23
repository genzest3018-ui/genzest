document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Architecture
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            const isActive = navMenu.classList.toggle('is-active');
            menuToggle.setAttribute('aria-expanded', isActive);
            
            // Interaction Transforms for Mobile Bar Hamburger Icon
            const lines = menuToggle.querySelectorAll('span');
            if (isActive) {
                lines[0].style.transform = 'rotate(45deg) translate(6px, 5px)';
                lines[1].style.opacity = '0';
                lines[2].style.transform = 'rotate(-45deg) translate(6px, -5px)';
            } else {
                lines[0].style.transform = 'none';
                lines[1].style.opacity = '1';
                lines[2].style.transform = 'none';
            }
        });
    }

    // Modern Light/Dark Mode Infrastructure 
    const themeToggle = document.getElementById('themeToggle');
    const currentTheme = localStorage.getItem('theme') || 'dark';

    document.documentElement.setAttribute('data-theme', currentTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const theme = document.documentElement.getAttribute('data-theme');
            const targetTheme = theme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', targetTheme);
            localStorage.setItem('theme', targetTheme);
        });
    }

    // Real-time Scalable Hook Layer for Analytics, Personalization, or Firebase Sync
    console.log('GENZEST Modern UI Core Ready.');
});
