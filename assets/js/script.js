// 1. Año dinámico
document.getElementById('currentYear').textContent = new Date().getFullYear();
    
// 2. Gestión de tema (con persistencia y detección del sistema)
function initTheme() {
    const saved = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = saved || (systemPrefersDark ? 'dark' : 'light');
    
    document.documentElement.setAttribute('data-theme', theme);
    updateThemeIcon(theme);
}

function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme');
    const newTheme = current === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
    const icon = document.querySelector('#themeToggle span');
    icon.textContent = theme === 'dark' ? '☀️' : '🌙';
}

// 3. Sistema de pestañas robusto y accesible
function mostrarSeccion(id) {
    // Ocultar secciones
    document.querySelectorAll('.seccion').forEach(sec => {
        sec.classList.remove('visible');
        sec.setAttribute('aria-hidden', 'true');
    });

    // Desactivar botones
    document.querySelectorAll('.botones button').forEach(btn => {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
    });

    // Mostrar sección activa
    const target = document.getElementById(id);
    if (target) {
        target.classList.add('visible');
        target.setAttribute('aria-hidden', 'false');
    }

    // Activar botón correspondiente (por ID explícito)
    const btnId = `btn${id.charAt(0).toUpperCase()}${id.slice(1)}`;
    const activeBtn = document.getElementById(btnId);
    if (activeBtn) {
        activeBtn.classList.add('active');
        activeBtn.setAttribute('aria-selected', 'true');
    }

    // Actualizar navegación
    document.querySelectorAll('nav a').forEach(link => link.removeAttribute('aria-current'));
    const currentLink = [...document.querySelectorAll('nav a')].find(link => 
        link.getAttribute('onclick')?.includes(`'${id}'`)
    );
    if (currentLink) currentLink.setAttribute('aria-current', 'page');
}

// 4. Validación de newsletter mejorada
function handleNewsletter(e) {
    e.preventDefault();
    const email = document.getElementById('email').value.trim();
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!regex.test(email)) {
        alert('📧 Por favor, introduce un email válido');
        return;
    }
    
    const btn = e.target.querySelector('button');
    const original = btn.textContent;
    btn.disabled = true;
    btn.textContent = 'Enviando...';
    
    setTimeout(() => {
        alert(`✅ ¡Gracias por suscribirte!\nRecibirás novedades en: ${email}`);
        e.target.reset();
        btn.disabled = false;
        btn.textContent = original;
    }, 800);
}

// 5. Inicialización
document.addEventListener('DOMContentLoaded', () => {
    // Tema
    initTheme();
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);
    
    // Tabs por defecto
    mostrarSeccion('nosotros');
    
    // Formulario
    document.getElementById('newsletterForm').addEventListener('submit', handleNewsletter);
    
    // Botones de tarjetas
    document.querySelectorAll('.tarjeta button').forEach(btn => {
        btn.addEventListener('click', e => {
            const title = e.currentTarget.closest('.tarjeta').querySelector('h3').textContent;
            alert(`ℹ️ Próximamente: información detallada sobre "${title}"`);
        });
    });
    
    // Navegación por teclado en tabs
    document.querySelectorAll('.botones button').forEach((btn, i, all) => {
        btn.addEventListener('keydown', e => {
            if (e.key === 'ArrowRight') {
                all[(i + 1) % all.length].focus();
            } else if (e.key === 'ArrowLeft') {
                all[(i - 1 + all.length) % all.length].focus();
            }
        });
    });
});