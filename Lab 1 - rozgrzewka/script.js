const calculate = document.querySelector('#przelicz');
const results = document.querySelector('#wynik');
const number1 = document.querySelector('#number1');
const number2 = document.querySelector('#number2');
const number3 = document.querySelector('#number3');
const number4 = document.querySelector('#number4');
//querySelector odwołuje się do html

    function calculateAndDisplayResults(){
        let value1 = parseFloat(number1.value) || 0;
        let value2 = parseFloat(number2.value) || 0;
        let value3 = parseFloat(number3.value) || 0;
        let value4 = parseFloat(number4.value) || 0;
        let sum = value1 + value2 + value3 + value4;
        let srednia = sum / 4;
        let min = Math.min(value1, value2, value3, value4);
        let max = Math.max(value1, value2, value3, value4);
//parseFloat pobiera wartości z input i przekształca je na liczby zmiennoprzecinkowe
// funkcja wywołana po wypełnieniu pól input, jeżeli jest pusta lub ma złe wartości przyjmuje wartość 0
        results.innerHTML = 
            `Suma: ${sum}<br>
            Średnia: ${srednia}<br>
            Minimum: ${min}<br>
            Maksimum: ${max}`;}

calculate.addEventListener('click', calculateAndDisplayResults);
    number1.addEventListener('input', calculateAndDisplayResults);
    number2.addEventListener('input', calculateAndDisplayResults);
    number3.addEventListener('input', calculateAndDisplayResults);
    number4.addEventListener('input', calculateAndDisplayResults);
// dodaje metode EventListener, odpowiada za to, że po wypełnieniu input lub kliknęciu przelicz, zostaje wywołana funkcja calculateAndDisplayResults, oblicza i wyświetla wynik
// wynik jest odświeżany przy każdej zmianie liczb.
