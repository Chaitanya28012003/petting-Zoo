/* =========================================================
   PETTING ZOO & ANIMAL FARM EXPERIENCE
   GROUP BOOKINGS JS
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const body = document.body;
    const html = document.documentElement;

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
       THEME
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

        if (window.scrollY > 35) {

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
        {
            passive: true
        }
    );


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    mobileMenuBtn.addEventListener(
        "click",
        () => {

            nav.classList.toggle(
                "mobile-open"
            );

            const icon =
                mobileMenuBtn.querySelector("i");

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


    /* =====================================================
       MOBILE DROPDOWN
    ===================================================== */

    if (dropdownToggle) {

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

    nav.querySelectorAll("a")
        .forEach(link => {

            link.addEventListener(
                "click",
                () => {

                    nav.classList.remove(
                        "mobile-open"
                    );

                    mobileMenuBtn
                        .querySelector("i")
                        .className =
                        "fa-solid fa-bars";

                }
            );

        });


    /* =====================================================
       CLOSE DROPDOWN OUTSIDE
    ===================================================== */

    document.addEventListener(
        "click",
        (event) => {

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
            (entries, observer) => {

                entries.forEach(entry => {

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

                });

            },
            {
                threshold: 0.12,

                rootMargin:
                    "0px 0px -50px 0px"
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
       IMAGE PARALLAX
    ===================================================== */

    const heroImage =
        document.querySelector(
            ".group-hero-image"
        );

    const ctaImage =
        document.querySelector(
            ".cta-image"
        );

    let ticking = false;


    function updateParallax() {

        const scrollY =
            window.scrollY;


        if (heroImage) {

            const move =
                Math.min(
                    scrollY * 0.10,
                    70
                );

            heroImage.style.transform =
                `scale(1.05) translateY(${move}px)`;

        }


        if (ctaImage) {

            const rect =
                ctaImage.getBoundingClientRect();

            const viewportCenter =
                window.innerHeight / 2;

            const imageCenter =
                rect.top +
                rect.height / 2;

            const distance =
                (imageCenter -
                    viewportCenter) * 0.025;

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
        {
            passive: true
        }
    );


    updateParallax();


    /* =====================================================
       SMOOTH ANCHOR SCROLL
    ===================================================== */

    document
        .querySelectorAll(
            'a[href^="#"]'
        )
        .forEach(anchor => {

            anchor.addEventListener(
                "click",
                function(event) {

                    const targetId =
                        this.getAttribute(
                            "href"
                        );

                    if (
                        targetId === "#" ||
                        !document.querySelector(
                            targetId
                        )
                    ) {

                        return;

                    }

                    event.preventDefault();

                    document
                        .querySelector(
                            targetId
                        )
                        .scrollIntoView({
                            behavior: "smooth"
                        });

                }
            );

        });


    /* =====================================================
       BOOKING FORM
    ===================================================== */

    const bookingForm =
        document.getElementById(
            "groupBookingForm"
        );

    const formMessage =
        document.getElementById(
            "formMessage"
        );


    if (bookingForm) {

        bookingForm.addEventListener(
            "submit",
            (event) => {

                event.preventDefault();


                const name =
                    document.getElementById(
                        "name"
                    ).value.trim();


                if (!name) {

                    formMessage.textContent =
                        "Please enter your name.";

                    return;

                }


                formMessage.textContent =
                    `Thank you, ${name}! Your group enquiry has been received. Our team will be in touch soon.`;


                bookingForm.reset();

            }
        );

    }


    /* =====================================================
       CARD TOUCH FEEDBACK
    ===================================================== */

    const cards =
        document.querySelectorAll(
            ".group-card, .included-card, .package-card"
        );


    cards.forEach(card => {

        card.addEventListener(
            "touchstart",
            () => {

                card.classList.add(
                    "touch-active"
                );

            },
            {
                passive: true
            }
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


    /* =====================================================
       PREVENT IMAGE DRAG
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

});