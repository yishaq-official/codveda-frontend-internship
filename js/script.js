const menuToggle = document.getElementById("mobile-menu");
const navLinks = document.getElementById("primary-nav");
const navLinkItems = document.querySelectorAll(".nav-link");
const navbar = document.getElementById("navbar");

if (menuToggle && navLinks) {
    const closeMenu = () => {
        navLinks.classList.remove("active");
        menuToggle.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
    };

    menuToggle.addEventListener("click", () => {
        const isOpen = navLinks.classList.toggle("active");
        menuToggle.classList.toggle("active", isOpen);
        menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navLinkItems.forEach((link) => {
        link.addEventListener("click", closeMenu);
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth >= 1025) {
            closeMenu();
        }
    });
}

if (navbar) {
    const handleScroll = () => {
        navbar.classList.toggle("scrolled", window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
}
