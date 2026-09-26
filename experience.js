/* =========================================================
   ZOOPARK — EXPERIENCES JS
========================================================= */

document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
       HEADER SCROLL
    ====================================================== */

    const header = document.getElementById("header");

    function handleHeaderScroll() {

        if (window.scrollY > 30) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }
    }

    window.addEventListener("scroll", handleHeaderScroll);

    handleHeaderScroll();



    /* =====================================================
       DARK MODE
    ====================================================== */

    const themeToggle = document.getElementById("themeToggle");
    const themeText = document.getElementById("themeText");

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
            document.body.classList.add("dark-mode");
        } else {
            document.documentElement.classList.remove("dark-mode");
            document.body.classList.remove("dark-mode");
        }

        if (themeToggle) {
            const icon = themeToggle.querySelector("i");
            if (icon) {
                icon.className = isDark ? "fa-solid fa-sun" : "fa-solid fa-moon";
            }
            if (themeText) {
                themeText.textContent = isDark ? "Light" : "Dark";
            }
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
            const currentTheme = document.body.classList.contains("dark-mode") ? "dark" : "light";
            const nextTheme = currentTheme === "dark" ? "light" : "dark";
            setStoredTheme(nextTheme);
            applyTheme(nextTheme);
        });
    }


    /* =====================================================
       RTL
    ====================================================== */

    const rtlToggle = document.getElementById("rtlToggle");

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

    const savedDirection = getStoredDirection();
    document.documentElement.setAttribute("dir", savedDirection === "rtl" ? "rtl" : "ltr");

    if (rtlToggle) {
        rtlToggle.addEventListener("click", () => {
            const current = document.documentElement.getAttribute("dir");
            const next = current === "rtl" ? "ltr" : "rtl";
            document.documentElement.setAttribute("dir", next);
            setStoredDirection(next);
        });
    }

    // Listen to changes in other tabs/windows
    window.addEventListener("storage", (e) => {
        if (e.key === "farmTheme" || e.key === "zoopark-theme" || e.key === "pawnest-theme") {
            applyTheme(e.newValue === "dark" ? "dark" : "light");
        }
        if (e.key === "farmDirection" || e.key === "zoopark-direction") {
            document.documentElement.setAttribute("dir", e.newValue === "rtl" ? "rtl" : "ltr");
        }
    });



    /* =====================================================
       HOME DROPDOWN
    ====================================================== */

    const dropdown =
        document.querySelector(".dropdown");

    const dropdownToggle =
        document.querySelector(
            ".dropdown-toggle"
        );


    if (dropdown && dropdownToggle) {

        dropdownToggle.addEventListener(
            "click",
            (event) => {

                event.stopPropagation();

                dropdown.classList.toggle(
                    "open"
                );

            }
        );

    }


    document.addEventListener(
        "click",
        (event) => {

            if (
                dropdown &&
                !dropdown.contains(event.target)
            ) {

                dropdown.classList.remove(
                    "open"
                );

            }

        }
    );



    /* =====================================================
       MOBILE MENU
    ====================================================== */

    const mobileMenuBtn =
        document.getElementById(
            "mobileMenuBtn"
        );

    const mainNav =
        document.getElementById(
            "mainNav"
        );


    if (mobileMenuBtn && mainNav) {

        mobileMenuBtn.addEventListener(
            "click",
            () => {

                mainNav.classList.toggle(
                    "mobile-open"
                );


                const icon =
                    mobileMenuBtn.querySelector(
                        "i"
                    );


                if (
                    mainNav.classList.contains(
                        "mobile-open"
                    )
                ) {

                    icon.classList.remove(
                        "fa-bars"
                    );

                    icon.classList.add(
                        "fa-xmark"
                    );

                } else {

                    icon.classList.remove(
                        "fa-xmark"
                    );

                    icon.classList.add(
                        "fa-bars"
                    );

                }

            }
        );

    }



    /* =====================================================
       MOBILE DROPDOWN
    ====================================================== */

    if (dropdown && mainNav) {

        dropdownToggle.addEventListener(
            "click",
            () => {

                if (
                    window.innerWidth <= 950
                ) {

                    dropdown.classList.toggle(
                        "open"
                    );

                }

            }
        );

    }



    /* =====================================================
       CLOSE MOBILE MENU
    ====================================================== */

    const navLinks =
        document.querySelectorAll(
            ".nav a"
        );


    navLinks.forEach(link => {

        link.addEventListener(
            "click",
            () => {

                if (
                    window.innerWidth <= 950
                ) {

                    mainNav.classList.remove(
                        "mobile-open"
                    );


                    const icon =
                        mobileMenuBtn
                            ? mobileMenuBtn.querySelector("i")
                            : null;


                    if (icon) {

                        icon.classList.remove(
                            "fa-xmark"
                        );

                        icon.classList.add(
                            "fa-bars"
                        );

                    }

                }

            }
        );

    });



    /* =====================================================
       SCROLL REVEAL
    ====================================================== */

    const revealElements =
        document.querySelectorAll(
            ".reveal, .reveal-left, .reveal-right"
        );


    const revealObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

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


    revealElements.forEach(element => {

        revealObserver.observe(element);

    });



    /* =====================================================
       SMOOTH ANCHOR
    ====================================================== */

    document.querySelectorAll(
        'a[href^="#"]'
    ).forEach(anchor => {

        anchor.addEventListener(
            "click",
            function (event) {

                const targetId =
                    this.getAttribute("href");


                if (
                    targetId &&
                    targetId !== "#"
                ) {

                    const target =
                        document.querySelector(
                            targetId
                        );


                    if (target) {

                        event.preventDefault();


                        target.scrollIntoView({
                            behavior: "smooth",
                            block: "start"
                        });

                    }

                }

            }
        );

    });

});