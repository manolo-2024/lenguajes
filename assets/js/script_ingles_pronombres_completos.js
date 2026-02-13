// 1. DATOS DE LAS FRASES (PRONOMBRES)
const pronounPhrases = [
    { en: "She loves <span class='highlight'>me</span>.", es: "Ella me ama." },
    { en: "I call <span class='highlight'>you</span> every day.", es: "Yo te llamo todos los días." },
    { en: "He doesn't know <span class='highlight'>her</span>.", es: "Él no la conoce." },
    { en: "We saw <span class='highlight'>him</span> at the park.", es: "Nosotros lo vimos en el parque." },
    { en: "They invited <span class='highlight'>us</span> to the party.", es: "Ellos nos invitaron a la fiesta." },
    { en: "Can you help <span class='highlight'>them</span>?", es: "¿Puedes ayudarlos?" },
    { en: "Our clients trust <span class='highlight'>us</span> for gas services.", es: "Nuestros clientes confían en nosotros." },
    { en: "We provide <span class='highlight'>them</span> with maintenance.", es: "Nosotros les brindamos mantenimiento." },
    { en: "This car is <span class='highlight'>mine</span>.", es: "Este coche es mío." },
    { en: "Is this jacket <span class='highlight'>yours</span>?", es: "¿Esta chaqueta es tuya?" },
    { en: "That notebook is <span class='highlight'>his</span>.", es: "Ese cuaderno es de él." },
    { en: "The blue bag is <span class='highlight'>hers</span>.", es: "La bolsa azul es de ella." },
    { en: "The victory is <span class='highlight'>ours</span>.", es: "La victoria es nuestra." },
    { en: "Those seats are <span class='highlight'>theirs</span>.", es: "Esos asientos son suyos." },
    { en: "This safety certification is <span class='highlight'>ours</span>.", es: "Esta certificación de seguridad es nuestra." },
    { en: "The responsibility for the project is <span class='highlight'>theirs</span>.", es: "La responsabilidad del proyecto es de ellos." },
    { en: "The company protects <span class='highlight'>it</span> (the facility).", es: "La empresa la protege (la instalación)." },
    { en: "You can contact <span class='highlight'>him</span> for emergency repairs.", es: "Puedes contactarlo a él para reparaciones de emergencia." },
    { en: "The decision to install the system was <span class='highlight'>hers</span>.", es: "La decisión de instalar el sistema fue de ella." }
];

// 2. TUS 3 FRASES NUEVAS (SECCIÓN TÉCNICA)
const techPhrases = [
    { en: "You write a book.", es: "Tú escribes un libro." },
    { en: "My father doesn't work with my mother.", es: "Mi padre no trabaja con mi madre." },
    { en: "We dance reggaeton and salsa with our friends.", es: "Nosotros bailamos reggaetón y salsa con nuestros amigos." }
];

// 3. CONFIGURACIÓN DE AUDIO Y SELECTORES
const synth = window.speechSynthesis;
const speedInput = document.getElementById('speedRange');
const speedVal = document.getElementById('v-val');

// 4. FUNCIÓN PARA RENDERIZAR LAS TARJETAS
function renderPhrases(data, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return; // Seguridad por si el ID no existe
    
    data.forEach(item => {
        const card = document.createElement('div');
        card.className = 'pronoun-card';
        card.innerHTML = `
            <div>
                <p style="font-size: 1.1rem; margin-bottom: 0.5rem;">${item.en}</p>
                <p style="color: #64748b; font-size: 0.9rem; font-style: italic;">${item.es}</p>
            </div>
            <button class="btn-audio" onclick="playText('${item.en.replace(/<[^>]*>?/gm, '').replace(/'/g, "\\'")}')">▶️ Escuchar</button>
        `;
        container.appendChild(card);
    });
}

// 5. FUNCIÓN PARA REPRODUCIR VOZ
function playText(text) {
    // Cancelar cualquier audio en curso antes de empezar uno nuevo
    synth.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = parseFloat(speedInput.value) || 0.8;
    synth.speak(utterance);
}

// 6. CONTROL DE VELOCIDAD
if (speedInput) {
    speedInput.oninput = () => {
        speedVal.innerText = speedInput.value;
    };
}

// 7. NAVEGACIÓN DE SECCIONES (GasServicios)
function mostrarSeccion(id) {
    const secciones = document.querySelectorAll('.seccion');
    secciones.forEach(s => s.classList.remove('visible'));
    
    const target = document.getElementById(id);
    if (target) target.classList.add('visible');
    
    const btns = document.querySelectorAll('.botones button');
    btns.forEach(b => b.classList.remove('active'));
    
    const activeBtn = document.getElementById('btn' + id.charAt(0).toUpperCase() + id.slice(1));
    if (activeBtn) activeBtn.classList.add('active');
}

// 8. INICIALIZACIÓN AL CARGAR LA PÁGINA
document.addEventListener('DOMContentLoaded', () => {
    // Renderiza la lista de pronombres
    renderPhrases(pronounPhrases, 'pronoun-container');
    
    // Renderiza tus 3 frases en la sección de Uso Técnico
    renderPhrases(techPhrases, 'tech-container');
    
    // Actualiza el año del footer
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();
});
