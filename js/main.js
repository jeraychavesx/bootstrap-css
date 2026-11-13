// EDITA AQUÍ tus 9 contenidos. x / y = posición en % de la pantalla.
const items = [
    { kanji: "一", title: "Sobre mí",     text: "Escribe aquí tu información.", x: 8,  y: 38 },
    { kanji: "二", title: "Proyectos",    text: "Escribe aquí tu información.", x: 22, y: 24 },
    { kanji: "三", title: "Habilidades",  text: "Escribe aquí tu información.", x: 38, y: 40 },
    { kanji: "四", title: "Experiencia",  text: "Escribe aquí tu información.", x: 52, y: 26 },
    { kanji: "五", title: "Educación",    text: "Escribe aquí tu información.", x: 66, y: 42 },
    { kanji: "六", title: "Servicios",    text: "Escribe aquí tu información.", x: 80, y: 28 },
    { kanji: "七", title: "Herramientas", text: "Escribe aquí tu información.", x: 88, y: 50 },
    { kanji: "八", title: "Testimonios",  text: "Escribe aquí tu información.", x: 58, y: 62 },
    { kanji: "九", title: "Contacto",     text: "Escribe aquí tu información.", x: 30, y: 62 }
];

const container = document.getElementById("petals");
const countEl = document.getElementById("count");
const modal = new bootstrap.Modal(document.getElementById("infoModal"));
const seen = new Set();

items.forEach((item, i) => {
    const btn = document.createElement("button");
    btn.className = "petal";
    btn.setAttribute("role", "listitem");
    btn.setAttribute("aria-label", item.title);
    btn.title = item.title;
    btn.style.left = item.x + "%";
    btn.style.top = item.y + "%";
    btn.style.setProperty("--r", (i % 2 ? -20 : 20) + (i * 7 % 30) + "deg");
    btn.style.setProperty("--d", (i * 0.7) % 5 + "s");
    btn.innerHTML = `<span>${item.kanji}</span>`;

    btn.addEventListener("click", () => {
        document.getElementById("infoKanji").textContent = item.kanji;
        document.getElementById("infoTitle").textContent = item.title;
        document.getElementById("infoText").textContent = item.text;
        modal.show();
        btn.classList.add("seen");
        seen.add(i);
        countEl.textContent = seen.size === items.length
            ? "Todo descubierto"
            : `${seen.size} de ${items.length} descubiertos`;
    });

    container.appendChild(btn);
});

// Pétalos decorativos cayendo
const falling = document.getElementById("falling");
if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    for (let i = 0; i < 18; i++) {
        const p = document.createElement("i");
        p.className = "fall";
        p.style.left = Math.random() * 100 + "%";
        p.style.setProperty("--x", (Math.random() * 200 - 40) + "px");
        p.style.animationDuration = 9 + Math.random() * 9 + "s";
        p.style.animationDelay = -Math.random() * 15 + "s";
        p.style.transform = `scale(${0.6 + Math.random() * 0.9})`;
        falling.appendChild(p);
    }
}
