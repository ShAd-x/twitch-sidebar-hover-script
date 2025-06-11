// ==UserScript==
// @name        Twitch Sidebar Hover Script
// @namespace   Twitch Sidebar Hover Script
// @match       https://www.twitch.tv/*
// @author      ShAd
// @grant       none
// @version     1.0
// @license MIT
// @description 11/06/2025 16:41:07
// @updateURL   https://github.com/ShAd-x/twitch-sidebar-hover-script/blob/main/script.js
// @downloadURL https://github.com/ShAd-x/twitch-sidebar-hover-script/blob/main/script.js
// ==/UserScript==

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

    // Wait until sidebar and toggle button are loaded
    const observer = new MutationObserver(() => {
        const sideNav = document.querySelector('.side-nav');
        const toggleBtn = document.querySelector("button[data-a-target='side-nav-arrow']");
        if (!sideNav || !toggleBtn) return;

        observer.disconnect(); // Stop observing once elements are found

        // Expand on hover
        sideNav.addEventListener('mouseenter', () => {
            if (sideNav.classList.contains('side-nav--collapsed')) {
                toggleBtn.click();
            }
        });

        // Collapse on mouse leave
        sideNav.addEventListener('mouseleave', () => {
            if (sideNav.classList.contains('side-nav--expanded')) {
                toggleBtn.click();
            }
        });
    });

    observer.observe(document.body, { childList: true, subtree: true });
})();
