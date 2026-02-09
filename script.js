/* =========================
   UTILITAIRES
========================= */

// Throttle function pour les event listeners coûteux
function throttle(func, limit) {
    let inThrottle;
    return function (...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/* =========================
   SCROLL FLUIDE (sécurité)
========================= */

document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);

        if (targetId.length > 1 && target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

/* =========================
   MENU ACTIF AU SCROLL
========================= */

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");

const updateActiveNav = throttle(() => {
    let currentSection = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.offsetHeight;

        if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
            currentSection = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${currentSection}`) {
            link.classList.add("active");
        }
    });
}, 100);

window.addEventListener("scroll", updateActiveNav);

/* =========================
   ANIMATION AU SCROLL
========================= */

const revealElements = document.querySelectorAll(".axe-card, section h2, section p");

const revealOnScroll = throttle(() => {
    const windowHeight = window.innerHeight;

    revealElements.forEach(el => {
        const elementTop = el.getBoundingClientRect().top;

        if (elementTop < windowHeight - 100) {
            el.classList.add("visible");
        }
    });
}, 100);

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", () => revealOnScroll());

/* =========================
   PARTAGE RÉSEAUX SOCIAUX
========================= */

const shareButton = document.createElement('div');
shareButton.className = 'share-buttons';
shareButton.innerHTML = `
    <div class="share-tooltip">Partager</div>
    <a href="https://wa.me/?text=Rejoignez%20la%20campagne%20BEKALAKWE%20J.%20DORIEL%20pour%20la%20pr%C3%A9sidence%202026%20!" class="share-btn whatsapp" title="Partager sur WhatsApp">
        <i class="fa-brands fa-whatsapp"></i>
    </a>
    <a href="https://www.facebook.com/sharer/sharer.php?u=" class="share-btn facebook" title="Partager sur Facebook">
        <i class="fa-brands fa-facebook"></i>
    </a>
    <a href="https://twitter.com/intent/tweet?text=Votons%20BEKALAKWE%20J.%20DORIEL%202026%20!" class="share-btn twitter" title="Partager sur Twitter">
        <i class="fa-brands fa-twitter"></i>
    </a>
    <a href="mailto:?subject=Candidature%202026&body=Découvrez%20la%20campagne%20BEKALAKWE%20J.%20DORIEL" class="share-btn email" title="Envoyer par email">
        <i class="fa-solid fa-envelope"></i>
    </a>
`;

document.body.appendChild(shareButton);

/* =========================
   BOUTON WHATSAPP FLOTTANT
========================= */
// Le bouton WhatsApp est déjà dans le HTML footer
// Pas besoin de le créer en JavaScript
