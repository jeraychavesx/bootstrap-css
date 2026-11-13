// EDITA AQUÍ tus 9 contenidos. x / y = posición en % de la pantalla.
const items = [
    { kanji: "一", title: "Estructura y sintaxis", x: 8,  y: 38,
      text: "Una regla CSS se compone de un <b>selector</b> (a quién afecta) y un bloque entre llaves con <b>propiedades</b> y <b>valores</b> (qué cambia). Cada declaración termina en punto y coma, y puedes agrupar varios selectores separándolos con comas.<code>h1, h2 {\n  color: red;\n  font-size: 2rem;\n}</code>" },
    { kanji: "二", title: "Tipos de incorporación", x: 22, y: 24,
      text: "<b>Interno</b>: etiqueta &lt;style&gt; dentro del head, útil para pruebas rápidas. <b>Externo</b>: archivo .css enlazado con &lt;link&gt;; es reutilizable y el más recomendado. <b>En línea</b>: atributo style, afecta a una sola etiqueta y es difícil de mantener.<code>&lt;link rel='stylesheet' href='styles.css'&gt;</code>" },
    { kanji: "三", title: "Identación, herencia y comentarios", x: 38, y: 40,
      text: "Indentar con 2 o 4 espacios muestra qué pertenece a qué. La <b>herencia</b> hace que los hijos reciban del padre propiedades como color y font-family (pero no margin ni border). Los <b>comentarios</b> no se ejecutan: explican o desactivan código.<code>body { color: navy; }  /* los p heredan este color */</code>" },
    { kanji: "四", title: "Niveles de especificidad", x: 52, y: 26,
      text: "El navegador elige la regla de más peso: <b>en línea</b> (1000), <b>#id</b> (100), <b>.clase</b> y pseudo-clases (10), <b>etiqueta</b> (1). Si empatan, gana la última escrita. <code>!important</code> rompe este orden; úsalo solo como último recurso.<code>p  &lt;  .nota  &lt;  #intro  &lt;  style=''</code>" },
    { kanji: "五", title: "Flexbox, Grid y breakpoints", x: 66, y: 42,
      text: "<b>Flexbox</b> acomoda elementos en una sola dirección (fila o columna). <b>Grid</b> maneja filas y columnas a la vez. Los <b>breakpoints</b> son los anchos donde el diseño cambia; en Bootstrap: 576, 768, 992, 1200 y 1400 px.<code>.caja {\n  display: flex;\n  justify-content: center;\n  gap: 1rem;\n}</code>" },
    { kanji: "六", title: "Media queries", x: 80, y: 28,
      text: "Aplican estilos solo cuando se cumple una condición: ancho, orientación o incluso modo oscuro. Son la base del diseño responsivo, ya sea <b>mobile first</b> (min-width) o <b>desktop first</b> (max-width).<code>@media (max-width: 768px) {\n  .menu { display: none; }\n}</code>" },
    { kanji: "七", title: "Pseudo elementos", x: 88, y: 50,
      text: "Se escriben con <b>dos puntos dobles</b>. <code>::before</code> y <code>::after</code> insertan contenido decorativo mediante la propiedad content; <code>::first-letter</code> y <code>::first-line</code> estilizan partes del texto; <code>::selection</code> cambia el color al seleccionar.<code>.titulo::after {\n  content: '桜';\n  color: pink;\n}</code>" },
    { kanji: "八", title: "Pseudo clases", x: 58, y: 62,
      text: "Usan <b>un solo dos puntos</b> y reaccionan al estado o la posición del elemento: <code>:hover</code> (cursor encima), <code>:focus</code> (seleccionado), <code>:active</code> (al hacer clic), <code>:first-child</code> y <code>:nth-child(n)</code> (posición en la lista).<code>a:hover { color: gold; }\nli:nth-child(odd) { background: #eee; }</code>" },
    { kanji: "九", title: "Z-index", x: 30, y: 62,
      text: "Controla el orden de apilamiento en el eje Z: el número mayor queda encima. Solo funciona en elementos con <b>position</b> distinto de static (o hijos de flex/grid). Un <b>contexto de apilamiento</b> impide que un hijo supere a elementos de otro contexto.<code>.modal {\n  position: fixed;\n  z-index: 1000;\n}</code>" }
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
