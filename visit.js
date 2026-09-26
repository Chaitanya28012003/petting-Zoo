/* =========================================================
   ZOOPARK — VISIT US JS
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const body = document.body;
    const html = document.documentElement;

    const themeToggle = document.getElementById("themeToggle");
    const rtlToggle = document.getElementById("rtlToggle");

    const mobileMenuBtn = document.getElementById("mobileMenuBtn");
    const nav = document.getElementById("nav");

    const themeIcon = themeToggle
        ? themeToggle.querySelector("i")
        : null;


    /* =====================================================
       DARK MODE
    ===================================================== */

    function getStoredTheme() {
        return (
            localStorage.getItem("farmTheme") ||
            localStorage.getItem("zoopark-theme") ||
            localStorage.getItem("pawnest-theme") ||
            "light"
        );
    }

    function setStoredTheme(theme) {
        localStorage.setItem("farmTheme", theme);
        localStorage.setItem("zoopark-theme", theme);
        localStorage.setItem("pawnest-theme", theme);
    }

    function applyTheme(theme) {
        const isDark = theme === "dark";
        if (isDark) {
            document.documentElement.classList.add("dark-mode");
            body.classList.add("dark-mode");
        } else {
            document.documentElement.classList.remove("dark-mode");
            body.classList.remove("dark-mode");
        }

        if (themeIcon) {
            themeIcon.className = isDark ? "fa-solid fa-sun" : "fa-solid fa-moon";
        }
        if (themeToggle) {
            themeToggle.setAttribute(
                "aria-label",
                isDark ? "Switch to light mode" : "Switch to dark mode"
            );
        }
    }

    // Apply stored theme immediately on init
    applyTheme(getStoredTheme());

    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            const currentTheme = body.classList.contains("dark-mode") ? "dark" : "light";
            const nextTheme = currentTheme === "dark" ? "light" : "dark";
            setStoredTheme(nextTheme);
            applyTheme(nextTheme);
        });
    }


    /* =====================================================
       RTL MODE
    ===================================================== */

    function getStoredDirection() {
        return (
            localStorage.getItem("farmDirection") ||
            localStorage.getItem("zoopark-direction") ||
            "ltr"
        );
    }

    function setStoredDirection(dir) {
        localStorage.setItem("farmDirection", dir);
        localStorage.setItem("zoopark-direction", dir);
    }

    function applyDirection(dir) {
        const isRTL = dir === "rtl";
        html.setAttribute("dir", isRTL ? "rtl" : "ltr");
        html.setAttribute("lang", isRTL ? "ar" : "en");
        if (rtlToggle) {
            rtlToggle.classList.toggle("active", isRTL);
        }
    }

    applyDirection(getStoredDirection());

    if (rtlToggle) {
        rtlToggle.addEventListener("click", () => {
            const currentDirection = html.getAttribute("dir") || "ltr";
            const nextDirection = currentDirection === "ltr" ? "rtl" : "ltr";
            setStoredDirection(nextDirection);
            applyDirection(nextDirection);
        });
    }

    // Listen to changes in other tabs/windows
    window.addEventListener("storage", (e) => {
        if (e.key === "farmTheme" || e.key === "zoopark-theme" || e.key === "pawnest-theme") {
            applyTheme(e.newValue === "dark" ? "dark" : "light");
        }
        if (e.key === "farmDirection" || e.key === "zoopark-direction") {
            applyDirection(e.newValue === "rtl" ? "rtl" : "ltr");
        }
    });


    /* =====================================================
       HEADER SCROLL
    ===================================================== */

    const header = document.getElementById("header");

    function handleHeaderScroll() {

        if (!header) return;

        if (window.scrollY > 30) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

    }

    window.addEventListener(
        "scroll",
        handleHeaderScroll
    );

    handleHeaderScroll();


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    if (mobileMenuBtn && nav) {

        mobileMenuBtn.addEventListener("click", () => {

            nav.classList.toggle("mobile-open");

            const isOpen =
                nav.classList.contains("mobile-open");

            mobileMenuBtn.setAttribute(
                "aria-expanded",
                isOpen
            );

            const menuIcon =
                mobileMenuBtn.querySelector("i");

            if (menuIcon) {

                if (isOpen) {
                    menuIcon.className =
                        "fa-solid fa-xmark";
                } else {
                    menuIcon.className =
                        "fa-solid fa-bars";
                }

            }

        });

    }


    /* =====================================================
       HOME DROPDOWN
    ===================================================== */

    const dropdowns =
        document.querySelectorAll(".nav-item.dropdown");

    dropdowns.forEach((dropdown) => {

        const toggle =
            dropdown.querySelector(".dropdown-toggle");

        if (!toggle) return;

        toggle.addEventListener("click", (event) => {

            event.preventDefault();

            dropdowns.forEach((item) => {

                if (item !== dropdown) {
                    item.classList.remove("open");
                }

            });

            dropdown.classList.toggle("open");

        });

    });


    /* =====================================================
       CLOSE DROPDOWN WHEN CLICK OUTSIDE
    ===================================================== */

    document.addEventListener("click", (event) => {

        if (
            !event.target.closest(".nav-item.dropdown")
        ) {

            dropdowns.forEach((dropdown) => {
                dropdown.classList.remove("open");
            });

        }

    });


    /* =====================================================
       CLOSE MOBILE MENU AFTER LINK CLICK
    ===================================================== */

    if (nav) {

        nav.querySelectorAll("a").forEach((link) => {

            link.addEventListener("click", () => {

                nav.classList.remove("mobile-open");

                if (mobileMenuBtn) {

                    mobileMenuBtn.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                    const icon =
                        mobileMenuBtn.querySelector("i");

                    if (icon) {
                        icon.className =
                            "fa-solid fa-bars";
                    }

                }

            });

        });

    }


    /* =====================================================
       REVEAL ANIMATION
    ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".reveal, .reveal-left, .reveal-right"
        );

    if ("IntersectionObserver" in window) {

        const observer =
            new IntersectionObserver(
                (entries) => {

                    entries.forEach((entry) => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add(
                                "show"
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.12
                }
            );

        revealElements.forEach((element) => {
            observer.observe(element);
        });

    } else {

        revealElements.forEach((element) => {
            element.classList.add("show");
        });

    }


    /* =====================================================
       SMOOTH ANCHOR LINKS
    ===================================================== */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach((link) => {

            link.addEventListener("click", (event) => {

                const targetId =
                    link.getAttribute("href");

                if (
                    !targetId ||
                    targetId === "#"
                ) {
                    return;
                }

                const target =
                    document.querySelector(targetId);

                if (!target) return;

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            });

        });

});