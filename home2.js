/* =========================================================
   ZOOPARK HOME 2 JS
   PREMIUM / CINEMATIC VERSION
========================================================= */

document.addEventListener("DOMContentLoaded", () => {


    const body = document.body;
    const html = document.documentElement;


    /* =====================================================
       ELEMENTS
    ===================================================== */

    const header =
        document.getElementById("header");

    const themeToggle =
        document.getElementById("themeToggle");

    const themeText =
        document.getElementById("themeText");

    const rtlToggle =
        document.getElementById("rtlToggle");

    const mobileMenuBtn =
        document.getElementById("mobileMenuBtn");

    const nav =
        document.getElementById("nav");

    const dropdown =
        document.querySelector(".nav-item.dropdown");

    const dropdownToggle =
        document.querySelector(".dropdown-toggle");


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
            const currentTheme = body.classList.contains("dark-mode") ? "dark" : "light";
            const nextTheme = currentTheme === "dark" ? "light" : "dark";
            setStoredTheme(nextTheme);
            applyTheme(nextTheme);
        });
    }


    /* =====================================================
       RTL
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

    const savedDirection = getStoredDirection();
    html.setAttribute("dir", savedDirection === "rtl" ? "rtl" : "ltr");

    if (rtlToggle) {
        rtlToggle.addEventListener("click", () => {
            const current = html.getAttribute("dir");
            const next = current === "rtl" ? "ltr" : "rtl";
            html.setAttribute("dir", next);
            setStoredDirection(next);
        });
    }

    // Listen to changes in other tabs/windows
    window.addEventListener("storage", (e) => {
        if (e.key === "farmTheme" || e.key === "zoopark-theme" || e.key === "pawnest-theme") {
            applyTheme(e.newValue === "dark" ? "dark" : "light");
        }
        if (e.key === "farmDirection" || e.key === "zoopark-direction") {
            html.setAttribute("dir", e.newValue === "rtl" ? "rtl" : "ltr");
        }
    });


    /* =====================================================
       HEADER SCROLL
    ===================================================== */

    function updateHeader() {

        if (!header) return;

        if (window.scrollY > 45) {

            header.classList.add(
                "scrolled"
            );

        } else {

            header.classList.remove(
                "scrolled"
            );

        }

    }


    updateHeader();


    window.addEventListener(
        "scroll",
        updateHeader,
        { passive: true }
    );


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    if (
        mobileMenuBtn &&
        nav
    ) {

        mobileMenuBtn.addEventListener(
            "click",
            () => {

                nav.classList.toggle(
                    "mobile-open"
                );

                const icon =
                    mobileMenuBtn.querySelector(
                        "i"
                    );

                if (
                    nav.classList.contains(
                        "mobile-open"
                    )
                ) {

                    icon.className =
                        "fa-solid fa-xmark";

                } else {

                    icon.className =
                        "fa-solid fa-bars";

                }

            }
        );

    }


    /* =====================================================
       MOBILE DROPDOWN
    ===================================================== */

    if (
        dropdown &&
        dropdownToggle
    ) {

        dropdownToggle.addEventListener(
            "click",
            (event) => {

                event.preventDefault();

                dropdown.classList.toggle(
                    "open"
                );

            }
        );

    }


    /* =====================================================
       CLOSE MOBILE MENU
    ===================================================== */

    if (nav) {

        nav.querySelectorAll("a")
            .forEach(link => {

                link.addEventListener(
                    "click",
                    () => {

                        nav.classList.remove(
                            "mobile-open"
                        );

                        if (
                            mobileMenuBtn
                        ) {

                            mobileMenuBtn
                                .querySelector("i")
                                .className =
                                "fa-solid fa-bars";

                        }

                    }
                );

            });

    }


    /* =====================================================
       CLOSE DROPDOWN
    ===================================================== */

    document.addEventListener(
        "click",
        event => {

            if (
                dropdown &&
                !dropdown.contains(
                    event.target
                )
            ) {

                dropdown.classList.remove(
                    "open"
                );

            }

        }
    );


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".reveal, .reveal-left, .reveal-right"
        );


    const revealObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "show"
                        );

                        revealObserver.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12,
                rootMargin:
                    "0px 0px -60px 0px"
            }
        );


    revealElements.forEach(
        element => {

            revealObserver.observe(
                element
            );

        }
    );


    /* =====================================================
       HERO PARALLAX
    ===================================================== */

    const heroImage =
        document.querySelector(
            ".hero-image"
        );

    const visitImage =
        document.querySelector(
            ".visit-image-layer img"
        );

    const ctaImage =
        document.querySelector(
            ".cta-background img"
        );


    let ticking = false;


    function updateParallax() {

        const scrollY =
            window.scrollY;


        if (heroImage) {

            const heroMove =
                Math.min(
                    scrollY * 0.10,
                    90
                );

            heroImage.style.transform =
                `scale(1.06) translateY(${heroMove}px)`;

        }


        if (visitImage) {

            const rect =
                visitImage.getBoundingClientRect();

            const distance =
                (rect.top -
                    window.innerHeight / 2) *
                -0.035;

            visitImage.style.transform =
                `scale(1.06) translateY(${distance}px)`;

        }


        if (ctaImage) {

            const rect =
                ctaImage.getBoundingClientRect();

            const distance =
                (rect.top -
                    window.innerHeight / 2) *
                -0.025;

            ctaImage.style.transform =
                `scale(1.05) translateY(${distance}px)`;

        }


        ticking = false;

    }


    window.addEventListener(
        "scroll",
        () => {

            if (!ticking) {

                window.requestAnimationFrame(
                    updateParallax
                );

                ticking = true;

            }

        },
        { passive: true }
    );


    updateParallax();


    /* =====================================================
       HERO SCROLL BUTTON
    ===================================================== */

    const heroScrollBtn =
        document.getElementById("heroScrollBtn") ||
        document.querySelector(".hero-scroll");

    const introSection =
        document.getElementById("intro") ||
        document.querySelector(".premium-intro");

    if (heroScrollBtn && introSection) {

        heroScrollBtn.addEventListener("click", () => {
            introSection.scrollIntoView({
                behavior: "smooth"
            });
        });

        heroScrollBtn.addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                introSection.scrollIntoView({
                    behavior: "smooth"
                });
            }
        });

    }


    /* =====================================================
       SMOOTH ANCHORS
    ===================================================== */

    document
        .querySelectorAll(
            'a[href^="#"]'
        )
        .forEach(anchor => {

            anchor.addEventListener(
                "click",
                function(event) {

                    const id =
                        this.getAttribute(
                            "href"
                        );

                    if (
                        id === "#" ||
                        !document.querySelector(id)
                    ) {
                        return;
                    }

                    event.preventDefault();

                    document
                        .querySelector(id)
                        .scrollIntoView({
                            behavior: "smooth"
                        });

                }
            );

        });


    /* =====================================================
       IMAGE DRAG PREVENTION
    ===================================================== */

    document
        .querySelectorAll("img")
        .forEach(img => {

            img.addEventListener(
                "dragstart",
                event =>
                    event.preventDefault()
            );

        });


    /* =====================================================
       TOUCH FEEDBACK
    ===================================================== */

    document
        .querySelectorAll(
            ".animal-feature, .experience-row"
        )
        .forEach(card => {

            card.addEventListener(
                "touchstart",
                () => {

                    card.classList.add(
                        "touch-active"
                    );

                },
                { passive: true }
            );

            card.addEventListener(
                "touchend",
                () => {

                    setTimeout(
                        () => {

                            card.classList.remove(
                                "touch-active"
                            );

                        },
                        180
                    );

                }
            );

        });


});