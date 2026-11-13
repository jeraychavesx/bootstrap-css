
const items = [
    { kanji: "一", title: "Estructura y sintaxis", x: 8,  y: 38,
      text: "Una regla CSS tiene <b>selector</b>, <b>propiedad</b> y <b>valor</b>.<code>h1 { color: red; }</code>" },
    { kanji: "二", title: "Tipos de incorporación", x: 22, y: 24,
      text: "<b>Interno</b>: etiqueta &lt;style&gt; en el head. <b>Externo</b>: archivo .css con &lt;link&gt; (el más recomendado). <b>En línea</b>: atributo style en la etiqueta." },
    { kanji: "三", title: "Identación, herencia y comentarios", x: 38, y: 40,
      text: "Indentar hace el código legible. Los hijos heredan algunas propiedades del padre (color, font).<code>/* Esto es un comentario */</code>" },
    { kanji: "四", title: "Niveles de especificidad", x: 52, y: 26,
      text: "Gana la regla más específica: <b>en línea</b> &gt; <b>#id</b> &gt; <b>.clase</b> &gt; <b>etiqueta</b>. <code>!important</code> pasa sobre todas." },
    { kanji: "五", title: "Flexbox, Grid y breakpoints", x: 66, y: 42,
      text: "<b>Flexbox</b> ordena en una dimensión y <b>Grid</b> en filas y columnas. Los <b>breakpoints</b> son los anchos donde el diseño cambia." },
    { kanji: "六", title: "Media queries", x: 80, y: 28,
      text: "Aplican estilos según el tamaño o tipo de pantalla.<code>@media (max-width: 768px) { ... }</code>" },
    { kanji: "七", title: "Pseudo elementos", x: 88, y: 50,
      text: "Estilizan o crean partes de un elemento.<code>p::first-letter  ·  div::before  ·  div::after</code>" },
    { kanji: "八", title: "Pseudo clases", x: 58, y: 62,
      text: "Estilizan según el estado o la posición del elemento.<code>a:hover  ·  input:focus  ·  li:nth-child(2)</code>" },
    { kanji: "九", title: "Z-index", x: 30, y: 62,
      text: "Define qué elemento queda encima de otro. Solo funciona si el elemento tiene <b>position</b> distinto de static.<code>z-index: 10;</code>" }
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
        document.getElementById("infoText").innerHTML = item.text;
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
