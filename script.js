(function () {
    'use strict';

    // Inject smooth width transition on sidebar
    const styleId = 'side-nav-transition-style';
    if (!document.getElementById(styleId)) {
        const style = document.createElement('style');
        style.id = styleId;
        style.textContent = `
            .side-nav {
                transition: width 0.2s ease !important;
            }
        `;
        document.head.appendChild(style);
    }

    // Run once elements are loaded in the DOM
    const observer = new MutationObserver(() => {
        const sideNav = document.querySelector('.side-nav');
        const toggleBtn = document.querySelector("button[data-a-target='side-nav-arrow']");
        if (!sideNav || !toggleBtn) return;

        observer.disconnect(); // Stop observing once elements are found

        let isAnimating = false;

        // Expand on hover
        sideNav.addEventListener('mouseenter', () => {
            if (sideNav.classList.contains('side-nav--collapsed') && !isAnimating) {
                isAnimating = true;
                toggleBtn.click();
                setTimeout(() => isAnimating = false, 200);
            }
        });

        // Collapse on mouse leave
        sideNav.addEventListener('mouseleave', () => {
            if (sideNav.classList.contains('side-nav--expanded') && !isAnimating) {
                isAnimating = true;
                toggleBtn.click();
                setTimeout(() => isAnimating = false, 200);
            }
        });
    });

    // Observe the body for dynamic Twitch DOM load
    observer.observe(document.body, { childList: true, subtree: true });
})();
