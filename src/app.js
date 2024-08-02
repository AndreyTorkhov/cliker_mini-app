const $circle = document.querySelector("#circle");
const $score = document.querySelector("#score");
const $aim = document.querySelector("#aim");
const $resetButton = document.querySelector("#resetButton");

function start() {
  setScore(getScore());
  setImage();
}

function setScore(score) {
  localStorage.setItem("score", score);
  $score.textContent = score;
}

function setImage() {
  const score = getScore();
  if (score >= 250) {
    $circle.setAttribute("src", "./assets/бонуска.png");
    $aim.textContent = "Бонуска";
  } else if (score >= 150) {
    $circle.setAttribute("src", "./assets/даня.png");
    $aim.textContent =
      "Дотапался... Илья тебя обманул! Он весь вечер играл в танки, а потом поехал к Дане. Конец игры, Илья победил";
  } else if (score >= 100) {
    $circle.setAttribute("src", "./assets/file2.png");
    $aim.textContent =
      "Елки-палки, чтоза соска! Натапай 150 денег, чтоб Илье хватило на ужин в Маке и такси до Катьки";
  } else if (score >= 50) {
    $circle.setAttribute("src", "./assets/file1.png");
    $aim.textContent =
      "Ого! Он чистый! Натапай 100 денег, чтоб Илья сходил на шугаринг *0пы и побрил лицо";
  } else {
    $circle.setAttribute("src", "./assets/илья.png");
    $aim.textContent =
      "Илья хочет засадить Кате, поможем ему в этом. Натапай 50 денег, чтоб Илья помылся";
  }
}

function getScore() {
  return Number(localStorage.getItem("score")) ?? 0;
}

function addOne() {
  setScore(getScore() + 1);
  setImage();
}

function resetScore() {
  setScore(0);
  setImage();
}

$circle.addEventListener("click", (event) => {
  const rect = $circle.getBoundingClientRect();

  const offfsetX = event.clientX - rect.left - rect.width / 2;
  const offfsetY = event.clientY - rect.top - rect.height / 2;

  const DEG = 40;

  const tiltX = (offfsetY / rect.height) * DEG;
  const tiltY = (offfsetX / rect.width) * -DEG;

  $circle.style.setProperty("--tiltX", `${tiltX}deg`);
  $circle.style.setProperty("--tiltY", `${tiltY}deg`);

  setTimeout(() => {
    $circle.style.setProperty("--tiltX", `0deg`);
    $circle.style.setProperty("--tiltY", `0deg`);
  }, 300);

  const plusOne = document.createElement("div");
  plusOne.classList.add("plus-one");
  plusOne.textContent = "+1";
  plusOne.style.left = `${event.clientX - rect.left}px`;
  plusOne.style.top = `${event.clientY - rect.top}px`;

  $circle.parentElement.appendChild(plusOne);

  addOne();

  setTimeout(() => {
    plusOne.remove();
  }, 2000);
});

$resetButton.addEventListener("click", resetScore);

start();
