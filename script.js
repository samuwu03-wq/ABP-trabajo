// ================================================
// CULTIDIOMAS — SCRIPT PRINCIPAL
// ================================================
console.log('🌍 Cultidiomas script cargado');

document.addEventListener('DOMContentLoaded', function () {
    console.log('✅ DOM listo');

    // ==========================================
    // 1. PANEL LATERAL DESLIZABLE
    // ==========================================
    const sidePanelToggle  = document.getElementById('sidePanelToggle');
    const sidePanel        = document.getElementById('sidePanel');
    const sidePanelOverlay = document.getElementById('sidePanelOverlay');
    const sidePanelClose   = document.getElementById('sidePanelClose');
    const sidePanelLinks   = document.querySelectorAll('.side-panel-link');

    function abrirPanel() {
        sidePanel.classList.add('open');
        sidePanelOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function cerrarPanel() {
        sidePanel.classList.remove('open');
        sidePanelOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (sidePanelToggle) {
        sidePanelToggle.addEventListener('click', function () {
            if (sidePanel.classList.contains('open')) {
                cerrarPanel();
            } else {
                abrirPanel();
            }
        });
    }

    if (sidePanelClose) {
        sidePanelClose.addEventListener('click', cerrarPanel);
    }

    if (sidePanelOverlay) {
        sidePanelOverlay.addEventListener('click', cerrarPanel);
    }

    // Links del panel: scroll suave a la sección y cerrar panel
    sidePanelLinks.forEach(function (link) {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId  = this.getAttribute('href');
            const targetEl  = document.querySelector(targetId);

            cerrarPanel();

            if (targetEl) {
                setTimeout(function () {
                    targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 380); // esperar a que cierre la animación del panel
            }
        });
    });

    console.log('✅ Panel lateral configurado');

    // ==========================================
    // 2. CARRUSEL DE IMÁGENES
    // ==========================================
    const slides      = document.querySelectorAll('.carousel-slide');
    const dots        = document.querySelectorAll('.dot');
    const prevBtn     = document.getElementById('carouselPrev');
    const nextBtn     = document.getElementById('carouselNext');
    let currentSlide  = 0;
    let autoplayTimer = null;

    function irASlide(index) {
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');

        currentSlide = (index + slides.length) % slides.length;

        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    function siguienteSlide() {
        irASlide(currentSlide + 1);
    }

    function anteriorSlide() {
        irASlide(currentSlide - 1);
    }

    function iniciarAutoplay() {
        autoplayTimer = setInterval(siguienteSlide, 5000);
    }

    function reiniciarAutoplay() {
        clearInterval(autoplayTimer);
        iniciarAutoplay();
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', function () {
            anteriorSlide();
            reiniciarAutoplay();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', function () {
            siguienteSlide();
            reiniciarAutoplay();
        });
    }

    dots.forEach(function (dot, i) {
        dot.addEventListener('click', function () {
            irASlide(i);
            reiniciarAutoplay();
        });
    });

    if (slides.length > 0) {
        iniciarAutoplay();
    }

    console.log('✅ Carrusel configurado con', slides.length, 'diapositivas');

    // ==========================================
    // 3. TARJETAS DE NOSOTROS — Expandir/cerrar
    // ==========================================
    const aboutCards = document.querySelectorAll('.about-card');

    aboutCards.forEach(function (card, index) {
        card.addEventListener('click', function () {
            var estaActivo = this.classList.contains('active');

            // Cerrar todas
            aboutCards.forEach(function (c) {
                c.classList.remove('active');
            });

            // Si no estaba activo, activar
            if (!estaActivo) {
                this.classList.add('active');
                console.log('✅ Tarjeta nosotros expandida:', index + 1);
            }
        });
    });

    console.log('✅ Tarjetas de nosotros configuradas');

    // ==========================================
    // 4. BOTONES DEL HERO → Scroll a secciones
    // ==========================================
    var verPlanesBtn  = document.getElementById('verPlanesBtn');
    var verIdiomasBtn = document.getElementById('verIdiomasBtn');

    if (verPlanesBtn) {
        verPlanesBtn.addEventListener('click', function () {
            var sec = document.getElementById('planes');
            if (sec) {
                sec.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    }

    if (verIdiomasBtn) {
        verIdiomasBtn.addEventListener('click', function () {
            var sec = document.getElementById('idiomas');
            if (sec) {
                sec.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    }

    console.log('✅ Botones del hero configurados');

    // ==========================================
    // 5. BOTONES DE PLANES → Acción de consultar
    // ==========================================
    var planBtns = document.querySelectorAll('.plan-btn');

    planBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
            var planNombre = this.closest('.plan-card').querySelector('.plan-badge').textContent;
            var contacto   = document.getElementById('contacto');

            // Feedback visual rápido
            var textoOriginal = this.textContent;
            this.textContent = '¡Redirigiendo!';
            var self = this;
            setTimeout(function () {
                self.textContent = textoOriginal;
            }, 1200);

            if (contacto) {
                setTimeout(function () {
                    contacto.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 400);
            }

            console.log('✅ Botón plan presionado:', planNombre);
        });
    });

    console.log('✅ Botones de planes configurados');

    // ==========================================
    // 6. FORMULARIO DE COMENTARIOS
    // ==========================================
    var commentForm  = document.getElementById('comment-form');
    var commentsList = document.getElementById('comments-list');

    if (commentForm && commentsList) {
        commentForm.addEventListener('submit', function (e) {
            e.preventDefault();

            var nombre     = document.getElementById('nombre').value.trim();
            var comentario = document.getElementById('comentario').value.trim();

            if (!nombre || !comentario) return;

            var commentDiv = document.createElement('div');
            commentDiv.classList.add('comment', 'fade-up');
            commentDiv.innerHTML =
                '<strong>' + nombre + '</strong>' +
                '<p>' + comentario + '</p>';

            commentsList.insertBefore(commentDiv, commentsList.firstChild);

            // Activar animación
            requestAnimationFrame(function () {
                commentDiv.classList.add('visible');
            });

            commentForm.reset();
            console.log('✅ Comentario enviado de:', nombre);
        });
    }

    console.log('✅ Formulario de comentarios configurado');

    // ==========================================
    // 7. REDES SOCIALES — Animación de click
    // ==========================================
    document.querySelectorAll('.social-icon').forEach(function (icon) {
        icon.addEventListener('click', function () {
            this.style.transition = 'transform 0.35s ease';
            this.style.transform  = 'scale(1.25) rotate(360deg)';
            var self = this;
            setTimeout(function () {
                self.style.transform = '';
            }, 350);
        });
    });

    // ==========================================
    // 8. SCROLL SUAVE — Links del footer
    // ==========================================
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var href = this.getAttribute('href');
            if (href === '#') return;

            var target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // ==========================================
    // 9. ANIMACIONES AL HACER SCROLL (IntersectionObserver)
    // ==========================================
    var observadorOpciones = {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
    };

    var observador = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observador.unobserve(entry.target);
            }
        });
    }, observadorOpciones);

    // Elementos que se animarán al aparecer
    var elementosAnimados = document.querySelectorAll(
        '.plan-card, .idioma-card, .profesor-card, .about-card'
    );

    elementosAnimados.forEach(function (el) {
        el.classList.add('fade-up');
        observador.observe(el);
    });

    console.log('✅ Observer de scroll configurado para', elementosAnimados.length, 'elementos');

    // ==========================================
    // 10. INDICADOR ACTIVO EN PANEL LATERAL (scroll)
    // ==========================================
    var secciones = document.querySelectorAll('section[id], footer[id]');

    function actualizarLinkActivo() {
        var scrollY = window.scrollY + 120;

        secciones.forEach(function (seccion) {
            var top    = seccion.offsetTop;
            var bottom = top + seccion.offsetHeight;
            var id     = seccion.getAttribute('id');

            if (scrollY >= top && scrollY < bottom) {
                sidePanelLinks.forEach(function (link) {
                    link.classList.remove('activo');
                    if (link.getAttribute('data-section') === id) {
                        link.classList.add('activo');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', actualizarLinkActivo, { passive: true });
    actualizarLinkActivo();

    console.log('🎉 Cultidiomas — todas las funcionalidades activas');
});
