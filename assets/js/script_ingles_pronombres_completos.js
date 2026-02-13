<script>
    // 1. DATOS UNIFICADOS
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

    const techPhrases = [
        { en: "You write a book.", es: "Tú escribes un libro." },
        { en: "My father doesn't work with my mother.", es: "Mi padre no trabaja con mi madre." },
        { en: "We dance reggaeton and salsa with our friends.", es: "Nosotros bailamos reggaetón y salsa con nuestros amigos." }
    ];

    // 2. CONFIGURACIÓN
    const synth = window.speechSynthesis;
    const speedInput = document.getElementById('speedRange');
    const speedVal = document.getElementById('v-val');

    // 3. RENDERIZADO
    function renderPhrases(data, containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        // Limpiamos el contenedor antes de renderizar por si acaso
        container.innerHTML = ''; 

        data.forEach(item => {
            const card = document.createElement('div');
            card.className = 'pronoun-card';
            // Limpiamos etiquetas HTML para el lector de voz
            const cleanText = item.en.replace(/<[^>]*>?/gm, '').replace(/'/g, "\\'");
            
            card.innerHTML = `
                <div>
                    <p style="font-size: 1.1rem; margin-bottom: 0.5rem;">${item.en}</p>
                    <p style="color: #64748b; font-size: 0.9rem; font-style: italic;">${item.es}</p>
                </div>
                <button class="btn-audio" onclick="playText('${cleanText}')">▶️ Escuchar</button>
            `;
            container.appendChild(card);
        });
    }

    // 4. AUDIO
    function playText(text) {
        synth.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US';
        utterance.rate = parseFloat(speedInput.value) || 0.8;
        synth.speak(utterance);
    }

    // 5. NAVEGACIÓN (Para que funcionen los botones superiores)
    function mostrarSeccion(id) {
        document.querySelectorAll('.seccion').forEach(s => s.classList.remove('visible'));
        const target = document.getElementById(id);
        if (target) target.classList.add('visible');

        document.querySelectorAll('.botones button').forEach(b => b.classList.remove('active'));
        const activeBtn = document.getElementById('btn' + id.charAt(0).toUpperCase() + id.slice(1));
        if (activeBtn) activeBtn.classList.add('active');
    }

    // 6. INICIALIZACIÓN
    document.addEventListener('DOMContentLoaded', () => {
        renderPhrases(pronounPhrases, 'pronoun-container');
        renderPhrases(techPhrases, 'tech-container');
        
        if (speedInput) {
            speedInput.oninput = () => {
                speedVal.innerText = speedInput.value;
            };
        }

        const yearSpan = document.getElementById('currentYear');
        if (yearSpan) yearSpan.textContent = new Date().getFullYear();
    });
</script>
