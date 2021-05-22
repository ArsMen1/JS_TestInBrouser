const questionText = document.querySelector(".question"); //Блок вопроса
const answerText = document.querySelector(".answers"); // Блок ответов
const content = document.querySelector(".content"); // Весь блок
const progress = document.querySelector(".progress"); // Полоса прогресса

let arrAnswers = Object.values(arrCard.card1.answers); //Массив ответов из изходника
let yourAnswers = []; //Массив ваших ответов
let rightAnswers = []; //Массив верных ответов

let q = {}; //Обьект для хранения текущей карточки
let i = 0; //счеичик карточек
let countRightAnswers = 0; // Количество верных ответов

//Секундомер
let secWatch = document.getElementById("secWatch"),
  seconds = -1,
  minutes = 0,
  hours = 0,
  add = () => {
    seconds++;
    if (seconds >= 60) {
      seconds = 0;
      minutes++;
      if (minutes >= 60) {
        minutes = 0;
        hours++;
      }
    }
    secWatch.textContent =
      (hours ? (hours > 9 ? hours : "0" + hours) : "00") +
      ":" +
      (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") +
      ":" +
      (seconds > 9 ? seconds : "0" + seconds);
    return (tt = setTimeout(add, 1000));
  };
add();

questionText.innerHTML = arrCard.card1.question; //выводим на экран Вопрос

let shuffle = () => arrAnswers.sort(() => Math.random() - 0.5); //Перемешаем массив что бы  нельзя быол запомнить положние ответов
shuffle();

//Для каждого ответа сделать блок с индефикатором
arrAnswers.forEach((elem) => {
  let divs = document.createElement("div"); //создаем блок
  divs.append(elem); //присваеваем блоку значение из массива
  divs.classList.add("hoverAnswer"); // присваеваем блокам класс для стилизации
  answerText.appendChild(divs); // добавляем блок на экран
});

document.querySelector(".answers").onmouseup = answerClick; //Нa выбранный блок вешаем событие

let k = 1;
function answerClick() {
  q = Object.entries(arrCard);
  let r = event.target.innerHTML;
  if (r == q[i][1].answers.right) {
    event.target.classList.add("rightAnswer");
    if (k > 0) {
      yourAnswers.push(r);
      countRightAnswers++;
      k--;
    }
  } else {
    event.target.classList.add("falseAnswer");
    if (k > 0) {
      yourAnswers.push(r);
    }
    k--;
  }
  k = 0;
  //Добавляем в конец массива ответ выбранный пользователем
}

document.querySelector(".button20").onclick = nextCard; //привязываем функцию nextCard к кнопке "Далее"

//функция nextCard показывает следующий вопрос и ответы на экране
function nextCard() {
  i++;
  k++;
  if (k > 1) {
    k--;
  }

  q = Object.entries(arrCard);

  progress.style.width = `${(i / q.length) * 100}%`; //Зеленая линия прогресс выполнения

  if (i > q.length - 1)
    return (
      clearTimeout(tt),
      (content.innerHTML = `<pre class="endList">
  Вопросы закончились. 

  Ваше время: ${secWatch.textContent},
  Правильных ответов: ${countRightAnswers}, что состовляет ${
        (countRightAnswers / q.length) * 100
      }%.
  Оценка: ${
    countRightAnswers / q.length > 0.89
      ? "Отлично"
      : countRightAnswers / q.length > 0.74
      ? "Хорошо"
      : countRightAnswers / q.length > 0.59
      ? "Удовлетватилельно"
      : "Неудовлетворительно"
  }</pre>
   <a class="restart" href="">Начать заново</a>
   <div class="more">Посмотреть ошибки<div>`)
    );
  questionText.innerHTML = q[i][1].question; //следующий вопрос
  arrAnswers = Object.values(q[i][1].answers); //следующий Ответ
  shuffle(); //тасуем варианты ответа
  //Для каждого ответа сделать блок с индефикатором
  document
    .querySelectorAll(".hoverAnswer")
    .forEach((e) => e.parentNode.removeChild(e)); //отчистим блоки от старых ответов
  arrAnswers.forEach((elem) => {
    divs = document.createElement("div"); //создаем блок
    divs.append(elem); //присваеваем блоку значение из массива
    divs.classList.add("hoverAnswer"); // присваеваем блокам класс для стилизации
    answerText.appendChild(divs); // добавляем блок на экран
  });
  rightAnswers.push(q[i][1].answers.right);
}

//////////////////////////////////////////////////нужна кнопка просмотра оштибок
/*
document.querySelector(".more").onclick = viewErrors;

function viewErrors() {
  alert(123);
  //return (content.innerHTML = `123`);
}
*/
