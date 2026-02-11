const navItems = ['afirmativa', 'negativa', 'interrogativa', 'int-negativa'];
const phrases = {
    afirmativa: { eng: "I still feel it is nice to ask for support.", spa: "Todavía siento que es agradable pedir apoyo." },
    negativa: { eng: "I still don't feel nice when I ask for support.", spa: "Todavía no me siento bien cuando pido apoyo." },
    interrogativa: { eng: "Do you still feel nice when you ask for support?", spa: "¿Todavía te sientes bien cuando pides apoyo?" },
    'int-negativa': { eng: "Don't you feel it is nice to ask for support?", spa: "¿No sientes que es agradable pedir apoyo?" }
};
const verbos = [
    { n: "Be", t: "Ser/Estar", ps: "am/is/are", pc: "being", pp: "been", pas: "was/were", pac: "was being", ppe: "had been", fs: "will be", fp: "will have been" },
    { n: "Have", t: "Tener", ps: "have/has", pc: "having", pp: "had", pas: "had", pac: "was having", ppe: "had had", fs: "will have", fp: "will have had" },
    { n: "Do", t: "Hacer", ps: "do/does", pc: "doing", pp: "done", pas: "did", pac: "was doing", ppe: "had done", fs: "will do", fp: "will have done" },
    { n: "Say", t: "Decir", ps: "say/s", pc: "saying", pp: "said", pas: "said", pac: "was saying", ppe: "had said", fs: "will say", fp: "will have said" },
    { n: "Get", t: "Conseguir", ps: "get/s", pc: "getting", pp: "got", pas: "got", pac: "was getting", ppe: "had got", fs: "will get", fp: "will have got" },
    { n: "Make", t: "Hacer", ps: "make/s", pc: "making", pp: "made", pas: "made", pac: "was making", ppe: "had made", fs: "will make", fp: "will have made" },
    { n: "Go", t: "Ir", ps: "go/es", pc: "going", pp: "gone", pas: "went", pac: "was going", ppe: "had gone", fs: "will go", fp: "will have gone" },
    { n: "Know", t: "Saber", ps: "know/s", pc: "knowing", pp: "known", pas: "knew", pac: "was knowing", ppe: "had known", fs: "will know", fp: "will have known" },
    { n: "Take", t: "Tomar", ps: "take/s", pc: "taking", pp: "taken", pas: "took", pac: "was taking", ppe: "had taken", fs: "will take", fp: "will have taken" },
    { n: "See", t: "Ver", ps: "see/s", pc: "seeing", pp: "seen", pas: "saw", pac: "was seeing", ppe: "had seen", fs: "will see", fp: "will have seen" },
    { n: "Come", t: "Venir", ps: "come/s", pc: "coming", pp: "come", pas: "came", pac: "was coming", ppe: "had come", fs: "will come", fp: "will have come" },
    { n: "Think", t: "Pensar", ps: "think/s", pc: "thinking", pp: "thought", pas: "thought", pac: "was thinking", ppe: "had thought", fs: "will think", fp: "will have thought" },
    { n: "Look", t: "Mirar", ps: "look/s", pc: "looking", pp: "looked", pas: "looked", pac: "was looking", ppe: "had looked", fs: "will look", fp: "will have looked" },
    { n: "Want", t: "Querer", ps: "want/s", pc: "wanting", pp: "wanted", pas: "wanted", pac: "was wanting", ppe: "had wanted", fs: "will want", fp: "will have wanted" },
    { n: "Give", t: "Dar", ps: "give/s", pc: "giving", pp: "given", pas: "gave", pac: "was giving", ppe: "had given", fs: "will give", fp: "will have given" },
    { n: "Use", t: "Usar", ps: "use/s", pc: "using", pp: "used", pas: "used", pac: "was using", ppe: "had used", fs: "will use", fp: "will have used" },
    { n: "Find", t: "Encontrar", ps: "find/s", pc: "finding", pp: "found", pas: "found", pac: "was finding", ppe: "had found", fs: "will find", fp: "will have found" },
    { n: "Tell", t: "Contar", ps: "tell/s", pc: "telling", pp: "told", pas: "told", pac: "was telling", ppe: "had told", fs: "will tell", fp: "will have told" },
    { n: "Ask", t: "Preguntar", ps: "ask/s", pc: "asking", pp: "asked", pas: "asked", pac: "was asking", ppe: "had asked", fs: "will ask", fp: "will have asked" },
    { n: "Work", t: "Trabajar", ps: "work/s", pc: "working", pp: "worked", pas: "worked", pac: "was working", ppe: "had worked", fs: "will work", fp: "will have worked" },
    { n: "Seem", t: "Parecer", ps: "seem/s", pc: "seeming", pp: "seemed", pas: "seemed", pac: "was seeming", ppe: "had seemed", fs: "will seem", fp: "will have seemed" },
    { n: "Feel", t: "Sentir", ps: "feel/s", pc: "feeling", pp: "felt", pas: "felt", pac: "was feeling", ppe: "had felt", fs: "will feel", fp: "will have felt" },
    { n: "Try", t: "Intentar", ps: "try/ies", pc: "trying", pp: "tried", pas: "tried", pac: "was trying", ppe: "had tried", fs: "will try", fp: "will have tried" },
    { n: "Leave", t: "Dejar", ps: "leave/s", pc: "leaving", pp: "left", pas: "left", pac: "was leaving", ppe: "had left", fs: "will leave", fp: "will have left" },
    { n: "Call", t: "Llamar", ps: "call/s", pc: "calling", pp: "called", pas: "called", pac: "was calling", ppe: "had called", fs: "will call", fp: "will have called" },
    { n: "Keep", t: "Mantener", ps: "keep/s", pc: "keeping", pp: "kept", pas: "kept", pac: "was keeping", ppe: "had kept", fs: "will keep", fp: "will have kept" },
    { n: "Understand", t: "Entender", ps: "understand/s", pc: "understanding", pp: "understood", pas: "understood", pac: "was understanding", ppe: "had understood", fs: "will understand", fp: "will have understood" }
];
let speed = 0.8;

function init() {
    // Nav
    const nav = document.getElementById('nav-bar');
    nav.innerHTML = navItems.map(item => `<button onclick="update('${item}')" id="btn-${item}">${item.toUpperCase()}</button>`).join('');
    // Verbos
    renderVerbs();
    // Ejemplos
    const examples = [
        { t: "Present Simple", e: "I understand the plan.", s: "Entiendo el plan." },
        { t: "Present Continuous", e: "He is leaving now.", s: "Él se está yendo ahora." },
        { t: "Present Perfect", e: "We have tried everything.", s: "Lo hemos intentado todo." },
        { t: "Past Simple", e: "They saw the result.", s: "Vieron el resultado." },
        { t: "Past Continuous", e: "I was working at ten.", s: "Estaba trabajando a las diez." },
        { t: "Past Perfect", e: "She had left before you came.", s: "Ella se había ido antes de que vinieras." },
        { t: "Future Simple", e: "I will call you later.", s: "Te llamaré más tarde." },
        { t: "Future Perfect", e: "I will have finished by June.", s: "Habré terminado para junio." }
    ];
    document.getElementById('examples-box').innerHTML += examples.map(ex => `
    <div>
    <strong>${ex.t}:</strong> ${ex.e} <br> <small>(${ex.s})</small>
    </div>
    `).join('');
    update('afirmativa');
}

function renderVerbs() {
    document.getElementById('verb-container').innerHTML = verbos.map(v => `
    <div class="verb-card">
    <h3>${v.n} <small>(${v.t})</small></h3>
    <table>
    <tr><td class="t-label">Present Simple</td><td>${v.ps}</td></tr>
    <tr><td class="t-label">Present Cont.</td><td>am/is ${v.pc}</td></tr>
    <tr><td class="t-label">Present Perfect</td><td>have/has ${v.pp}</td></tr>
    <tr><td class="t-label">Past Simple</td><td>${v.pas}</td></tr>
    <tr><td class="t-label">Past Cont.</td><td>was/were ${v.pc}</td></tr>
    <tr><td class="t-label">Past Perfect</td><td>had ${v.pp}</td></tr>
    <tr><td class="t-label">Future Simple</td><td>${v.fs}</td></tr>
    <tr><td class="t-label">Future Perfect</td><td>${v.fp}</td></tr>
    </table>
    </div>
    `).join('');
}

function update(type) {
    document.querySelectorAll('#nav-bar button').forEach(b => b.classList.remove('active'));
    document.getElementById('btn-' + type).classList.add('active');
    const item = phrases[type];
    document.getElementById('phrase-display').innerHTML = `
    <div class="phrase-card">
    <h2 id="tts-text">${item.eng}</h2>
    <p>${item.spa}</p>
    <button onclick="play()">🔊 ESCUCHAR AUDIO</button>
    </div>
    `;
}

function play() {
    window.speechSynthesis.cancel();
    const msg = new SpeechSynthesisUtterance(document.getElementById('tts-text').innerText);
    msg.lang = 'en-US';
    msg.rate = speed;
    window.speechSynthesis.speak(msg);
}

function changeSpeed(val) {
    speed = val;
    document.getElementById('v-val').innerText = val;
}

function filter() {
    const q = document.getElementById('search').value.toLowerCase();
    document.querySelectorAll('.verb-card').forEach(c => {
        c.style.display = c.innerText.toLowerCase().includes(q) ? "block" : "none";
    });
}

function toggleTheme() {
    const b = document.body;
    b.setAttribute('data-theme', b.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
}

window.onload = init;