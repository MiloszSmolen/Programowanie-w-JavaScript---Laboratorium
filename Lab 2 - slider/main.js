const slider = document.querySelector('#slider');
const slides = document.querySelector('.slides');
const PrevS = document.querySelector('#PrevBTN');
const NextS = document.querySelector('#NextBTN');
const Panel = document.querySelectorAll('#Panel .PanelBtn'); 
const slideWidth = 800; // Szerokość slajdu
let currentSlide = 0;
// Funkcja przewijania slajdów
function goToSlide(slideIndex) {
    slides.style.transition = 'transform 0.5s ease-in-out'; // dodaje animowane przewijanie
    slides.style.transform = `translateX(-${slideIndex * slideWidth}px`;
    currentSlide = slideIndex;
    updateS();
}
function updateS() {
    Panel.forEach((PanelBtn, index) => {
        PanelBtn.addEventListener('click', () => {
            goToSlide(index);
        });
    });
}
NextS.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % 5; 
    goToSlide(currentSlide);
});
PrevS.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + 5) % 5; // 5 - liczba slajdów
    goToSlide(currentSlide);
});
// klikanie przycisków panelu
Panel.forEach((PanelBtn, index) => {
    PanelBtn.addEventListener('click', () => {
        goToSlide(index);
    });
});
// zapętlenie funkcji przewijania slajdów
function autoSlide() {
    currentSlide = (currentSlide + 1) % 5; 
    goToSlide(currentSlide);
    setTimeout(autoSlide, 5000);
}
goToSlide(-1); // Strona wczytuje się na 1 slajdzie
autoSlide(); // automatyczne przewijanie
