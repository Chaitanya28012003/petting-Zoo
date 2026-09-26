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
        {
            passive: true
        }
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

                if (!icon) return;

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

        document.addEventListener(
            "click",
            (event) => {

                if (
                    dropdown &&
                    !dropdown.contains(event.target)
                ) {
                    dropdown.classList.remove("open");
                }

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

                        /*
                         Keep dropdown open
                         when dropdown toggle
                         is clicked.
                        */

                        if (
                            link.classList.contains(
                                "dropdown-toggle"
                            )
                        ) {
                            return;
                        }

                        nav.classList.remove(
                            "mobile-open"
                        );

                        if (mobileMenuBtn) {

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


    if (
        "IntersectionObserver" in window
    ) {

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

    } else {

        revealElements.forEach(
            element => {

                element.classList.add(
                    "show"
                );

            }
        );

    }


    /* =====================================================
       CINEMATIC PARALLAX ELEMENTS
    ===================================================== */

    const heroImage =
        document.querySelector(
            ".hero-image"
        );

    const introImage =
        document.querySelector(
            ".intro-large-image img"
        );

    const animalImages =
        document.querySelectorAll(
            ".animal-feature img"
        );

    const experienceImages =
        document.querySelectorAll(
            ".experience-row-image img"
        );

    const visitImage =
        document.querySelector(
            ".visit-image-layer img"
        );

    const groupsImage =
        document.querySelector(
            ".groups-image > img"
        );

    const ctaImage =
        document.querySelector(
            ".cta-background img"
        );


    let ticking = false;


    /* =====================================================
       HELPER
    ===================================================== */

    function getParallaxMove(
        element,
        strength
    ) {

        if (!element) return 0;

        const rect =
            element.getBoundingClientRect();

        const viewportHeight =
            window.innerHeight;

        /*
         * Element center relative
         * to viewport center.
         */

        const elementCenter =
            rect.top +
            rect.height / 2;

        const viewportCenter =
            viewportHeight / 2;

        const distance =
            elementCenter -
            viewportCenter;

        /*
         * Convert distance into
         * a small movement.
         */

        return (
            -distance *
            strength
        );
    }


    /* =====================================================
       UPDATE PARALLAX
    ===================================================== */

    function updateParallax() {

        /*
         * HERO
         */

        if (heroImage) {

            const move =
                getParallaxMove(
                    heroImage,
                    0.035
                );

            const limitedMove =
                Math.max(
                    -65,
                    Math.min(
                        65,
                        move
                    )
                );

            heroImage.style.transform =
                `scale(1.08) translate3d(0, ${limitedMove}px, 0)`;
        }


        /*
         * INTRO
         */

        if (introImage) {

            const move =
                getParallaxMove(
                    introImage,
                    0.028
                );

            const limitedMove =
                Math.max(
                    -45,
                    Math.min(
                        45,
                        move
                    )
                );

            introImage.style.transform =
                `scale(1.08) translate3d(0, ${limitedMove}px, 0)`;
        }


        /*
         * ANIMAL IMAGES
         */

        animalImages.forEach(
            image => {

                const move =
                    getParallaxMove(
                        image,
                        0.025
                    );

                const limitedMove =
                    Math.max(
                        -38,
                        Math.min(
                            38,
                            move
                        )
                    );

                image.style.transform =
                    `scale(1.08) translate3d(0, ${limitedMove}px, 0)`;

            }
        );


        /*
         * EXPERIENCE IMAGES
         */

        experienceImages.forEach(
            image => {

                const move =
                    getParallaxMove(
                        image,
                        0.023
                    );

                const limitedMove =
                    Math.max(
                        -35,
                        Math.min(
                            35,
                            move
                        )
                    );

                image.style.transform =
                    `scale(1.08) translate3d(0, ${limitedMove}px, 0)`;

            }
        );


        /*
         * VISIT
         */

        if (visitImage) {

            const move =
                getParallaxMove(
                    visitImage,
                    0.04
                );

            const limitedMove =
                Math.max(
                    -60,
                    Math.min(
                        60,
                        move
                    )
                );

            visitImage.style.transform =
                `scale(1.08) translate3d(0, ${limitedMove}px, 0)`;
        }


        /*
         * GROUPS
         */

        if (groupsImage) {

            const move =
                getParallaxMove(
                    groupsImage,
                    0.028
                );

            const limitedMove =
                Math.max(
                    -45,
                    Math.min(
                        45,
                        move
                    )
                );

            groupsImage.style.transform =
                `scale(1.08) translate3d(0, ${limitedMove}px, 0)`;
        }


        /*
         * CTA
         */

        if (ctaImage) {

            const move =
                getParallaxMove(
                    ctaImage,
                    0.022
                );

            const limitedMove =
                Math.max(
                    -30,
                    Math.min(
                        30,
                        move
                    )
                );

            ctaImage.style.transform =
                `scale(1.06) translate3d(0, ${limitedMove}px, 0)`;
        }


        ticking = false;
    }


    /* =====================================================
       PARALLAX SCROLL EVENT
    ===================================================== */

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


    /* =====================================================
       INITIAL PARALLAX
    ===================================================== */

    updateParallax();


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
                            behavior: "smooth",
                            block: "start"
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
       IMAGE PARALLAX AFTER RESIZE
    ===================================================== */

    let resizeTimer;

    window.addEventListener(
        "resize",
        () => {

            clearTimeout(
                resizeTimer
            );

            resizeTimer =
                setTimeout(
                    () => {

                        updateParallax();

                    },
                    100
                );

        },
        {
            passive: true
        }
    );


    /* =====================================================
       HERO ANIMAL ENCOUNTER SWITCHER (HOME 1)
    ===================================================== */
    const heroAnimalData = {
        goats: {
            title: "Pygmy Goats & Baby Kids",
            category: "Featured Farm Encounter",
            time: "11:30 AM & 2:30 PM",
            encounter: "Daily Bottle Feeding",
            desc: "Inquisitive, gentle, and utterly sweet. Step right into the goat meadow with a fresh bowl of treats and let them nibble right from your hands.",
            image: "https://images.unsplash.com/photo-1524024973431-2ad916746881?auto=format&fit=crop&w=1200&q=85",
            alt: "Playful pygmy goats at ZooPark"
        },
        rabbits: {
            title: "Bunny Haven & Cuddle Village",
            category: "Gentle Touch Zone",
            time: "Open All Day",
            encounter: "Lap Cuddles & Brushing",
            desc: "Soft Rex rabbits and lop-eared bunnies waiting in cushioned lap baskets. Gentle, calm, and perfect for toddlers and children.",
            image: "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?auto=format&fit=crop&w=1200&q=85",
            alt: "Fluffy gentle rabbit at ZooPark"
        },
        sheep: {
            title: "Fluffy Lambs & Babydoll Sheep",
            category: "Meadow Encounter",
            time: "10:30 AM & 3:30 PM",
            encounter: "Wool Grooming & Treats",
            desc: "Feel the soft spring fleece of our friendly Babydoll sheep. Hand-feed alfalfa crunch and watch our baby lambs frolic in the clover pasture.",
            image: "https://images.unsplash.com/photo-1484557985045-edf25e08da73?auto=format&fit=crop&w=1200&q=85",
            alt: "Gentle sheep and lambs in meadow"
        },
        ponies: {
            title: "Miniature Ponies & Donkeys",
            category: "Paddock Experience",
            time: "1:00 PM – 4:00 PM",
            encounter: "Pony Brushing & Petting",
            desc: "Meet our sweet miniature Shetland ponies and friendly Mediterranean donkeys. Learn how to brush their manes and offer carrot treats.",
            image: "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&w=1200&q=85",
            alt: "Miniature pony petting encounter"
        }
    };

    const animalTabs = document.querySelectorAll(".animal-tab");
    const heroCardImg = document.getElementById("heroCardImg");
    const heroCardTitle = document.getElementById("heroCardTitle");
    const heroCardCategory = document.getElementById("heroCardCategory");
    const heroCardTime = document.getElementById("heroCardTime");
    const heroCardDesc = document.getElementById("heroCardDesc");
    const heroCardEncounterType = document.getElementById("heroCardEncounterType");
    const heroExperienceCard = document.getElementById("heroExperienceCard");

    if (animalTabs.length && heroCardImg && heroCardTitle) {
        animalTabs.forEach(tab => {
            tab.addEventListener("click", () => {
                const animalKey = tab.getAttribute("data-animal");
                const data = heroAnimalData[animalKey];
                if (!data) return;

                // Update active tab button
                animalTabs.forEach(t => t.classList.remove("active"));
                tab.classList.add("active");

                // Smooth fade transition
                heroCardImg.style.opacity = "0.2";
                heroCardImg.style.transform = "scale(0.97)";

                setTimeout(() => {
                    heroCardImg.src = data.image;
                    heroCardImg.alt = data.alt;
                    if (heroCardTitle) heroCardTitle.textContent = data.title;
                    if (heroCardCategory) heroCardCategory.textContent = data.category;
                    if (heroCardDesc) heroCardDesc.textContent = data.desc;
                    if (heroCardEncounterType) heroCardEncounterType.textContent = data.encounter;
                    if (heroCardTime) {
                        heroCardTime.innerHTML = `<i class="fa-solid fa-bell"></i> ${data.time}`;
                    }

                    heroCardImg.style.opacity = "1";
                    heroCardImg.style.transform = "scale(1)";
                }, 220);
            });
        });

        // 3D subtle tilt effect on desktop
        if (window.matchMedia("(min-width: 992px)").matches && heroExperienceCard) {
            heroExperienceCard.addEventListener("mousemove", (e) => {
                const rect = heroExperienceCard.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const deltaX = (x - centerX) / centerX;
                const deltaY = (y - centerY) / centerY;

                heroExperienceCard.style.transform = `perspective(1000px) rotateY(${deltaX * 4}deg) rotateX(${-deltaY * 4}deg) translateY(-4px)`;
            });

            heroExperienceCard.addEventListener("mouseleave", () => {
                heroExperienceCard.style.transform = "";
            });
        }
    }

    /* Hero Explore Farm Scroll Prompt */
    const heroScrollPrompt = document.querySelector(".hero-scroll-prompt .scroll-link");
    if (heroScrollPrompt) {
        heroScrollPrompt.addEventListener("click", (e) => {
            e.preventDefault();
            const heroElem = document.getElementById("homeHero") || document.querySelector(".hero");
            if (heroElem) {
                const nextElem = heroElem.nextElementSibling;
                if (nextElem) {
                    nextElem.scrollIntoView({ behavior: "smooth", block: "start" });
                }
            }
        });
    }

});