// Efecto suave al cargar contenido
document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".fade-in");
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.3}s`;
    });
});
