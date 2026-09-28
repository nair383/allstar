document.addEventListener("DOMContentLoaded", () => {
    // 1. Loader de Entrada Estelar
    const loader = document.getElementById("loader");
    if (loader) {
        setTimeout(() => {
            loader.classList.add("fade-out");
        }, 500);
    }

    // 2. Menú Móvil Hamburguesa
    const hamburger = document.getElementById("hamburger");
    const mobileMenu = document.getElementById("mobileMenu");

    if (hamburger && mobileMenu) {
        hamburger.addEventListener("click", () => {
            mobileMenu.classList.toggle("active");
            const icon = hamburger.querySelector("i");
            if (mobileMenu.classList.contains("active")) {
                icon.classList.remove("fa-bars");
                icon.classList.add("fa-xmark");
                document.body.style.overflow = "hidden";
            } else {
                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");
                document.body.style.overflow = "auto";
            }
        });

        mobileMenu.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                mobileMenu.classList.remove("active");
                document.body.style.overflow = "auto";
                const icon = hamburger.querySelector("i");
                if (icon) {
                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");
                }
            });
        });
    }

    // 3. Selector de Tema (Modo Oscuro / Claro)
    const themeToggle = document.getElementById("theme-toggle");
    const htmlElement = document.documentElement;

    const savedTheme = localStorage.getItem("allstars_theme") || "dark";
    if (savedTheme === "light") {
        htmlElement.classList.remove("dark");
        htmlElement.classList.add("light");
        if (themeToggle) themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
    }

    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            if (htmlElement.classList.contains("dark")) {
                htmlElement.classList.remove("dark");
                htmlElement.classList.add("light");
                localStorage.setItem("allstars_theme", "light");
                themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
            } else {
                htmlElement.classList.remove("light");
                htmlElement.classList.add("dark");
                localStorage.setItem("allstars_theme", "dark");
                themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
            }
        });
    }

    // 4. Efecto de Inclinación 3D (Tilt Effect) - Solo en Escritorio
    if (window.innerWidth > 992) {
        const tiltCards = document.querySelectorAll(".tilt-card");
        tiltCards.forEach(card => {
            card.addEventListener("mousemove", (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const xc = rect.width / 2;
                const yc = rect.height / 2;
                const dx = (x - xc) / 15;
                const dy = (yc - y) / 15;
                card.style.transform = `perspective(1000px) rotateX(${dy}deg) rotateY(${dx}deg) scale3d(1.01, 1.01, 1.01)`;
            });

            card.addEventListener("mouseleave", () => {
                card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
                card.style.transition = "transform 0.4s ease";
            });

            card.addEventListener("mouseenter", () => {
                card.style.transition = "none";
            });
        });
    }

    // 5. Efecto de Onda (Ripple Effect) en Botones
    const rippleButtons = document.querySelectorAll(".ripple");
    rippleButtons.forEach(btn => {
        btn.addEventListener("click", function(e) {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const circle = document.createElement("span");
            circle.classList.add("ripple-effect");
            circle.style.left = `${x}px`;
            circle.style.top = `${y}px`;

            btn.appendChild(circle);
            setTimeout(() => {
                circle.remove();
            }, 500);
        });
    });

    // 6. Lightbox para Galería
    window.openLightbox = function(imgSrc) {
        const modal = document.getElementById("lightboxModal");
        const modalImg = document.getElementById("lightboxImg");
        if (modal && modalImg) {
            modal.style.display = "flex";
            modalImg.src = imgSrc;
        }
    };

    window.closeLightbox = function() {
        const modal = document.getElementById("lightboxModal");
        if (modal) {
            modal.style.display = "none";
        }
    };

    // 7. Widget de Reserva Paso a Paso y WhatsApp
    window.nextStep = function(stepNumber) {
        if (stepNumber === 2) {
            const selectedService = document.querySelector('input[name="service"]:checked');
            if (!selectedService) {
                alert("Por favor selecciona un servicio antes de continuar.");
                return;
            }
        }
        if (stepNumber === 3) {
            const selectedBarber = document.querySelector('input[name="barber"]:checked');
            if (!selectedBarber) {
                alert("Por favor selecciona un barbero.");
                return;
            }
        }

        document.querySelectorAll(".form-step").forEach(step => step.classList.remove("active"));
        const targetStep = document.getElementById(`step-${stepNumber}`);
        if (targetStep) targetStep.classList.add("active");
    };

    window.prevStep = function(stepNumber) {
        document.querySelectorAll(".form-step").forEach(step => step.classList.remove("active"));
        const targetStep = document.getElementById(`step-${stepNumber}`);
        if (targetStep) targetStep.classList.add("active");
    };

    const bookingForm = document.getElementById("bookingForm");
    if (bookingForm) {
        bookingForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const serviceInput = document.querySelector('input[name="service"]:checked');
            const barberInput = document.querySelector('input[name="barber"]:checked');
            const dateInput = document.getElementById("bookingDate").value;
            const timeInput = document.getElementById("bookingTime").value;
            const nameInput = document.getElementById("clientName").value;

            if (!serviceInput || !barberInput || !dateInput || !timeInput || !nameInput) {
                alert("Por favor completa todos los campos de la reserva.");
                return;
            }

            const phoneNumber = "56959356209";
            const message = `Hola Pablito ⭐, soy *${nameInput}* y quiero confirmar una reserva en All Stars Barber (Av. San Carlos 01283):\n\n` +
                            `💈 *Servicio:* ${serviceInput.value}\n` +
                            `✂️ *Barbero:* ${barberInput.value}\n` +
                            `📅 *Fecha:* ${dateInput}\n` +
                            `⏰ *Hora:* ${timeInput} hrs\n\n` +
                            `Quedo atento a la confirmación. ¡Nos vemos!`;

            const encodedMessage = encodeURIComponent(message);
            const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

            window.open(whatsappURL, "_blank");
        });
    }

    // 8. Filtro Interactivo de Servicios
    const filterButtons = document.querySelectorAll(".filter-btn");
    const serviceCards = document.querySelectorAll(".service-card");

    if (filterButtons.length > 0 && serviceCards.length > 0) {
        filterButtons.forEach(btn => {
            btn.addEventListener("click", () => {
                filterButtons.forEach(b => b.classList.remove("active"));
                btn.classList.add("active");

                const filterValue = btn.getAttribute("data-filter");

                serviceCards.forEach(card => {
                    const category = card.getAttribute("data-category");
                    if (filterValue === "all" || category === filterValue) {
                        card.style.display = "flex";
                        card.classList.add("fade-in");
                    } else {
                        card.style.display = "none";
                    }
                });
            });
        });
    }

    // 9. Animaciones al hacer Scroll (Intersection Observer)
    const fadeElements = document.querySelectorAll(".fade-in");
    const observerOptions = {
        threshold: 0.05,
        rootMargin: "0px 0px -30px 0px"
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => {
        observer.observe(el);
    });
});