const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d"); 
const balls = [];
const ballRadius = 10;
const minDistanceToDrawLine = 100; // odległośc między piłkami potrzebna do narysowania lini
let lastTimestamp;
let fpsCounter = 0;

function init() {
  canvas.width = window.innerWidth;   // pobranie szerokości i wysokości okna przeglądarki
  canvas.height = window.innerHeight - 100;   // poprzez odjęcie 100px od wysokości przeglądarki, nie używamy scrolla i przyciski są cały czas widoczne

  for (let i = 0; i < 100; i++) {   // ustawia 100 piłek
    balls.push({     // dodaje piłki
      // Sprawia że piłki są ułożone w losowy sposób
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      dx: (Math.random() - 0.5) * 2,
      dy: (Math.random() - 0.5) * 2,
    });
  }
}
function draw(timestamp) {
  // jeśli nie ma timestampu to ustawiamy go na aktualny czas który jest przyjmowany przez funkcję draw która działa cały czas
  if (!lastTimestamp) lastTimestamp = timestamp;
  // oblicza czas od ostatniego wywołania funkcji draw
  let elapsed = timestamp - lastTimestamp;

  ctx.clearRect(0, 0, canvas.width, canvas.height); //Czyści Canvas
  let drawnBalls = 0;

  // Animuje ruch i zderzenia kulek. 
  for (let i = 0; i < balls.length; i++) {
    const ballA = balls[i];

    ballA.x += ballA.dx;
    ballA.y += ballA.dy;

    if (ballA.x - ballRadius < 0 || ballA.x + ballRadius > canvas.width) {
      ballA.dx *= -1;
    }
    if (ballA.y - ballRadius < 0 || ballA.y + ballRadius > canvas.height) {
      ballA.dy *= -1;
    }

    ctx.beginPath();
    ctx.arc(ballA.x, ballA.y, ballRadius, 0, 2 * Math.PI);
    ctx.fill();

    for (let j = i + 1; j < balls.length; j++) {
      const ballB = balls[j];
      const distance = Math.hypot(ballA.x - ballB.x, ballA.y - ballB.y);

      if (distance < minDistanceToDrawLine) {
        ctx.beginPath();
        ctx.moveTo(ballA.x, ballA.y);
        ctx.lineTo(ballB.x, ballB.y);
        ctx.stroke();
      }
    }
    drawnBalls++;
  }

  document.getElementById("ballCount").innerText = `Drawn Balls: ${drawnBalls}`;
  // wywołuje funkcję draw z poziomu przeglądarki w rytm odświeżania
  requestAnimationFrame(draw);
}

function startSimulation() {
  init();
  draw();
}

function resetSimulation() {
  balls.length = 0;
  init();
}

window.addEventListener("resize", () => {
  //dostosowuje rozmiar kulek do rozmiaru okna.
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init();
});
