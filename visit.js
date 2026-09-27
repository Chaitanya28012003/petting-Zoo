/* =========================================================
   ZOOPARK — VISIT US JS
   DARK MODE + RTL + MOBILE MENU + DROPDOWN
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const body = document.body;
    const html = document.documentElement;

    const themeToggle = document.getElementById("themeToggle");
    const rtlToggle = document.getElementById("rtlToggle");

    const mobileMenuBtn =
        document.getElementById("mobileMenuBtn");

    /* IMPORTANT: HTML nav ID = mainNav */
    const nav =
        document.getElementById("mainNav");

    const header =
        document.getElementById("header");

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

        localStorage.setItem(
            "farmTheme",
            theme
        );

        localStorage.setItem(
            "zoopark-theme",
            theme
        );

        localStorage.setItem(
            "pawnest-theme",
            theme
        );

    }


    function applyTheme(theme) {

        const isDark = theme === "dark";

        if (isDark) {

            html.classList.add("dark-mode");
            body.classList.add("dark-mode");

        } else {

            html.classList.remove("dark-mode");
            body.classList.remove("dark-mode");

        }


        /* Change moon / sun icon */

        if (themeIcon) {

            themeIcon.className = isDark
                ? "fa-solid fa-sun"
                : "fa-solid fa-moon";

        }


        /* Accessibility */

        if (themeToggle) {

            themeToggle.setAttribute(
                "aria-label",
                isDark
                    ? "Switch to light mode"
                    : "Switch to dark mode"
            );

            themeToggle.setAttribute(
                "title",
                isDark
                    ? "Light Mode"
                    : "Dark Mode"
            );

        }

    }


    /* Apply saved theme */

    applyTheme(
        getStoredTheme()
    );


    /* Theme button */

    if (themeToggle) {

        themeToggle.addEventListener(
            "click",
            () => {

                const currentTheme =
                    body.classList.contains(
                        "dark-mode"
                    )
                        ? "dark"
                        : "light";

                const nextTheme =
                    currentTheme === "dark"
                        ? "light"
                        : "dark";

                setStoredTheme(
                    nextTheme
                );

                applyTheme(
                    nextTheme
                );

            }
        );

    }


    /* =====================================================
       RTL MODE
    ===================================================== */

    function getStoredDirection() {

        return (
            localStorage.getItem(
                "farmDirection"
            ) ||

            localStorage.getItem(
                "zoopark-direction"
            ) ||

            "ltr"
        );

    }


    function setStoredDirection(dir) {

        localStorage.setItem(
            "farmDirection",
            dir
        );

        localStorage.setItem(
            "zoopark-direction",
            dir
        );

    }


    function applyDirection(dir) {

        const isRTL =
            dir === "rtl";


        html.setAttribute(
            "dir",
            isRTL
                ? "rtl"
                : "ltr"
        );


        html.setAttribute(
            "lang",
            isRTL
                ? "ar"
                : "en"
        );


        if (rtlToggle) {

            rtlToggle.classList.toggle(
                "active",
                isRTL
            );

        }

    }


    /* Apply saved direction */

    applyDirection(
        getStoredDirection()
    );


    /* RTL button */

    if (rtlToggle) {

        rtlToggle.addEventListener(
            "click",
            () => {

                const currentDirection =
                    html.getAttribute("dir") ||
                    "ltr";

                const nextDirection =
                    currentDirection === "ltr"
                        ? "rtl"
                        : "ltr";


                setStoredDirection(
                    nextDirection
                );

                applyDirection(
                    nextDirection
                );

            }
        );

    }


    /* =====================================================
       STORAGE CHANGE
    ===================================================== */

    window.addEventListener(
        "storage",
        (event) => {

            if (
                event.key === "farmTheme" ||
                event.key === "zoopark-theme" ||
                event.key === "pawnest-theme"
            ) {

                applyTheme(
                    event.newValue === "dark"
                        ? "dark"
                        : "light"
                );

            }


            if (
                event.key === "farmDirection" ||
                event.key === "zoopark-direction"
            ) {

                applyDirection(
                    event.newValue === "rtl"
                        ? "rtl"
                        : "ltr"
                );

            }

        }
    );


    /* =====================================================
       HEADER SCROLL
    ===================================================== */

    function handleHeaderScroll() {

        if (!header) return;


        if (window.scrollY > 30) {

            header.classList.add(
                "scrolled"
            );

        } else {

            header.classList.remove(
                "scrolled"
            );

        }

    }


    window.addEventListener(
        "scroll",
        handleHeaderScroll
    );

    handleHeaderScroll();


    /* =====================================================
       MOBILE MENU
       IMPORTANT
    ===================================================== */

    if (
        mobileMenuBtn &&
        nav
    ) {

        mobileMenuBtn.addEventListener(
            "click",
            (event) => {

                event.stopPropagation();


                nav.classList.toggle(
                    "mobile-open"
                );


                const isOpen =
                    nav.classList.contains(
                        "mobile-open"
                    );


                mobileMenuBtn.setAttribute(
                    "aria-expanded",
                    String(isOpen)
                );


                /* Change hamburger to X */

                const menuIcon =
                    mobileMenuBtn.querySelector(
                        "i"
                    );


                if (menuIcon) {

                    menuIcon.className =
                        isOpen
                            ? "fa-solid fa-xmark"
                            : "fa-solid fa-bars";

                }

            }
        );

    }


    /* =====================================================
       HOME DROPDOWN
    ===================================================== */

    const dropdowns =
        document.querySelectorAll(
            ".nav-item.dropdown"
        );


    dropdowns.forEach(
        (dropdown) => {

            const toggle =
                dropdown.querySelector(
                    ".dropdown-toggle"
                );


            if (!toggle) return;


            toggle.addEventListener(
                "click",
                (event) => {

                    event.preventDefault();
                    event.stopPropagation();


                    dropdowns.forEach(
                        (item) => {

                            if (
                                item !== dropdown
                            ) {

                                item.classList.remove(
                                    "open"
                                );

                            }

                        }
                    );


                    dropdown.classList.toggle(
                        "open"
                    );

                }
            );

        }
    );


    /* =====================================================
       CLOSE DROPDOWN OUTSIDE
    ===================================================== */

    document.addEventListener(
        "click",
        (event) => {

            if (
                !event.target.closest(
                    ".nav-item.dropdown"
                )
            ) {

                dropdowns.forEach(
                    (dropdown) => {

                        dropdown.classList.remove(
                            "open"
                        );

                    }
                );

            }

        }
    );


    /* =====================================================
       CLOSE MOBILE MENU OUTSIDE
    ===================================================== */

    document.addEventListener(
        "click",
        (event) => {

            if (
                !nav ||
                !mobileMenuBtn
            ) {
                return;
            }


            const clickedInsideNav =
                nav.contains(
                    event.target
                );

            const clickedMenuButton =
                mobileMenuBtn.contains(
                    event.target
                );


            if (
                !clickedInsideNav &&
                !clickedMenuButton
            ) {

                nav.classList.remove(
                    "mobile-open"
                );


                mobileMenuBtn.setAttribute(
                    "aria-expanded",
                    "false"
                );


                const icon =
                    mobileMenuBtn.querySelector(
                        "i"
                    );


                if (icon) {

                    icon.className =
                        "fa-solid fa-bars";

                }

            }

        }
    );


    /* =====================================================
       CLOSE MOBILE MENU AFTER LINK CLICK
    ===================================================== */

    if (nav) {

        nav.querySelectorAll(
            "a"
        ).forEach(
            (link) => {

                link.addEventListener(
                    "click",
                    () => {

                        nav.classList.remove(
                            "mobile-open"
                        );


                        if (mobileMenuBtn) {

                            mobileMenuBtn.setAttribute(
                                "aria-expanded",
                                "false"
                            );


                            const icon =
                                mobileMenuBtn.querySelector(
                                    "i"
                                );


                            if (icon) {

                                icon.className =
                                    "fa-solid fa-bars";

                            }

                        }

                    }
                );

            }
        );

    }


    /* =====================================================
       REVEAL ANIMATION
    ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".reveal, .reveal-left, .reveal-right"
        );


    if (
        "IntersectionObserver"
        in window
    ) {

        const observer =
            new IntersectionObserver(
                (entries) => {

                    entries.forEach(
                        (entry) => {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.classList.add(
                                    "show"
                                );


                                observer.unobserve(
                                    entry.target
                                );

                            }

                        }
                    );

                },
                {
                    threshold: 0.12
                }
            );


        revealElements.forEach(
            (element) => {

                observer.observe(
                    element
                );

            }
        );


    } else {

        revealElements.forEach(
            (element) => {

                element.classList.add(
                    "show"
                );

            }
        );

    }


    /* =====================================================
       SMOOTH ANCHOR LINKS
    ===================================================== */

    document
        .querySelectorAll(
            'a[href^="#"]'
        )
        .forEach(
            (link) => {

                link.addEventListener(
                    "click",
                    (event) => {

                        const targetId =
                            link.getAttribute(
                                "href"
                            );


                        if (
                            !targetId ||
                            targetId === "#"
                        ) {

                            return;

                        }


                        const target =
                            document.querySelector(
                                targetId
                            );


                        if (!target) {
                            return;
                        }


                        event.preventDefault();


                        target.scrollIntoView({
                            behavior: "smooth",
                            block: "start"
                        });

                    }
                );

            }
        );


    /* =====================================================
       ESC KEY — CLOSE MOBILE MENU
    ===================================================== */

    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Escape"
            ) {

                if (nav) {

                    nav.classList.remove(
                        "mobile-open"
                    );

                }


                if (mobileMenuBtn) {

                    mobileMenuBtn.setAttribute(
                        "aria-expanded",
                        "false"
                    );


                    const icon =
                        mobileMenuBtn.querySelector(
                            "i"
                        );


                    if (icon) {

                        icon.className =
                            "fa-solid fa-bars";

                    }

                }


                dropdowns.forEach(
                    (dropdown) => {

                        dropdown.classList.remove(
                            "open"
                        );

                    }
                );

            }

        }
    );

});