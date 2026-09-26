/* =========================================================
   PAWNEST BOOKING PAGE JS
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const body = document.body;

    const themeToggle =
        document.getElementById("themeToggle");

    const themeIcon =
        document.getElementById("themeIcon");

    const rtlToggle =
        document.getElementById("rtlToggle");

    const rtlText =
        document.getElementById("rtlText");

    const bookingForm =
        document.getElementById("bookingForm");

    const bookingMessage =
        document.getElementById("bookingMessage");

    const dateInput =
        document.getElementById("date");


    /* =====================================================
       DATE
    ===================================================== */

    if (dateInput) {

        const today =
            new Date().toISOString().split("T")[0];

        dateInput.min = today;
    }


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
            themeIcon.classList.toggle("fa-moon", !isDark);
            themeIcon.classList.toggle("fa-sun", isDark);
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

    themeToggle?.addEventListener("click", () => {
        const currentTheme = body.classList.contains("dark-mode") ? "dark" : "light";
        const nextTheme = currentTheme === "dark" ? "light" : "dark";
        setStoredTheme(nextTheme);
        applyTheme(nextTheme);
    });


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

    function applyDirection(dir) {
        const isRTL = dir === "rtl";
        document.documentElement.setAttribute("dir", isRTL ? "rtl" : "ltr");
        if (rtlText) {
            rtlText.textContent = isRTL ? "LTR" : "RTL";
        }
    }

    applyDirection(getStoredDirection());

    rtlToggle?.addEventListener("click", () => {
        const current = document.documentElement.getAttribute("dir") || "ltr";
        const next = current === "rtl" ? "ltr" : "rtl";
        setStoredDirection(next);
        applyDirection(next);
    });

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
       BOOKING FORM
    ===================================================== */

    bookingForm?.addEventListener(
        "submit",
        (event) => {

            event.preventDefault();


            const name =
                document
                    .getElementById("name")
                    .value
                    .trim();


            const email =
                document
                    .getElementById("email")
                    .value
                    .trim();


            const date =
                document
                    .getElementById("date")
                    .value;


            const guests =
                document
                    .getElementById("guests")
                    .value;


            const experience =
                document
                    .getElementById("experience")
                    .value;


            /* Validation */

            if (
                !name ||
                !email ||
                !date ||
                !guests ||
                !experience
            ) {

                bookingMessage.textContent =
                    "Please complete all booking details.";

                bookingMessage.className =
                    "booking-message error";

                return;
            }


            /* Success */

            bookingMessage.textContent =
                `Thank you, ${name}! Your visit request has been received.`;

            bookingMessage.className =
                "booking-message success";


            /* Button */

            const submitButton =
                bookingForm.querySelector(
                    ".booking-submit"
                );


            const originalHTML =
                submitButton.innerHTML;


            submitButton.innerHTML =
                `
                    <span>Booking Received</span>
                    <i class="fa-solid fa-check"></i>
                `;


            submitButton.style.background =
                "#2F6B45";


            /* Reset */

            setTimeout(() => {

                bookingForm.reset();

                submitButton.innerHTML =
                    originalHTML;

                submitButton.style.background =
                    "";

                bookingMessage.textContent =
                    "";

                bookingMessage.className =
                    "booking-message";

            }, 3500);

        }
    );

});