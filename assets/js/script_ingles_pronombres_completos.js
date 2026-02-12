  // DATOS DE LAS FRASES (TODAS LAS QUE SOLICITASTE)
  const pronounPhrases = [
    // Object Pronouns
    { en: "She loves <span class='highlight'>me</span>.", es: "Ella me ama." },
    { en: "I call <span class='highlight'>you</span> every day.", es: "Yo te llamo todos los días." },
    { en: "He doesn't know <span class='highlight'>her</span>.", es: "Él no la conoce." },
    { en: "We saw <span class='highlight'>him</span> at the park.", es: "Nosotros lo vimos en el parque." },
    { en: "They invited <span class='highlight'>us</span> to the party.", es: "Ellos nos invitaron a la fiesta." },
    { en: "Can you help <span class='highlight'>them</span>?", es: "¿Puedes ayudarlos?" },
    { en: "Our clients trust <span class='highlight'>us</span> for gas services.", es: "Nuestros clientes confían en nosotros." },
    { en: "We provide <span class='highlight'>them</span> with maintenance.", es: "Nosotros les brindamos mantenimiento." },
    // Possessive Pronouns
    { en: "This car is <span class='highlight'>mine</span>.", es: "Este coche es mío." },
    { en: "Is this jacket <span class='highlight'>yours</span>?", es: "¿Esta chaqueta es tuya?" },
    { en: "That notebook is <span class='highlight'>his</span>.", es: "Ese cuaderno es de él." },
    { en: "The blue bag is <span class='highlight'>hers</span>.", es: "La bolsa azul es de ella." },
    { en: "The victory is <span class='highlight'>ours</span>.", es: "La victoria es nuestra." },
    { en: "Those seats are <span class='highlight'>theirs</span>.", es: "Esos asientos son suyos." },
    { en: "This safety certification is <span class='highlight'>ours</span>.", es: "Esta certificación de seguridad es nuestra." },
    { en: "The responsibility for the project is <span class='highlight'>theirs</span>.", es: "La responsabilidad del proyecto es de ellos." },
    { en: "Our clients trust <span class='highlight'>us</span> for gas services.", es: "Nuestros clientes confían en nosotros para servicios de gas." },
    { en: "We provide <span class='highlight'>them</span> with maintenance.", es: "Nosotros les brindamos mantenimiento a ellos." },
    { en: "The company protects <span class='highlight'>it</span> (the facility).", es: "La empresa la protege (la instalación)." },
    { en: "You can contact <span class='highlight'>him</span> for emergency repairs.", es: "Puedes contactarlo a él para reparaciones de emergencia." },
    { en: "This safety certification is <span class='highlight'>ours</span>.", es: "Esta certificación de seguridad es nuestra." },
    { en: "The responsibility for the project is <span class='highlight'>theirs</span>.", es: "La responsabilidad del proyecto es de ellos." },
    { en: "The decision to install the system was <span class='highlight'>hers</span>.", es: "La decisión de instalar el sistema fue de ella." },
    { en: "She loves <span class='highlight'>me</span>.", es: "Ella me ama." },
    { en: "I call <span class='highlight'>you</span> every day.", es: "Yo te llamo todos los días." },
    { en: "The victory is <span class='highlight'>ours</span>.", es: "La victoria es nuestra." }
];



// LÓGICA PARA RENDERIZAR Y REPRODUCIR
const synth = window.speechSynthesis;
const pronounContainer = document.getElementById('pronoun-container');
const speedInput = document.getElementById('speedRange');
const speedVal = document.getElementById('v-val');

function renderPronouns() {
    pronounPhrases.forEach(item => {
        const card = document.createElement('div');
        card.className = 'pronoun-card';
        card.innerHTML = `
            <div>
                <p style="font-size: 1.1rem; margin-bottom: 0.5rem;">${item.en}</p>
                <p style="color: #64748b; font-size: 0.9rem; font-style: italic;">${item.es}</p>
            </div>
            <button class="btn-audio" onclick="playText('${item.en.replace(/<[^>]*>?/gm, '').replace(/'/g, "\\'")}')">▶️ Escuchar</button>
        `;
        pronounContainer.appendChild(card);
    });
}

function playText(text) {
    synth.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = parseFloat(speedInput.value);
    synth.speak(utterance);
}

speedInput.oninput = () => {
    speedVal.innerText = speedInput.value;
};

// Iniciar al cargar
document.addEventListener('DOMContentLoaded', () => {
    renderPronouns();
    document.getElementById('currentYear').textContent = new Date().getFullYear();
});

// Función necesaria para los botones de GasServicios
function mostrarSeccion(id) {
    const secciones = document.querySelectorAll('.seccion');
    secciones.forEach(s => s.classList.remove('visible'));
    document.getElementById(id).classList.add('visible');
    
    const btns = document.querySelectorAll('.botones button');
    btns.forEach(b => b.classList.remove('active'));
    document.getElementById('btn' + id.charAt(0).toUpperCase() + id.slice(1)).classList.add('active');
}