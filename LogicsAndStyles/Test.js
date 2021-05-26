const questionText = document.querySelector(".question"); //Блок вопроса
const answerText = document.querySelector(".answers"); // Блок ответов
const content = document.querySelector(".content"); // Весь блок
const progress = document.querySelector(".progress"); // Полоса прогресса

let arrAnswers = Object.values(arrCard.card1.answers); //Массив ответов из изходника
let yourAnswers = []; //Массив ваших ответов
let rightAnswers = [arrCard.card1.answers.right]; //Массив верных ответов

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
  q = Object.entries(arrCard); //создаем массив со всеми обьектами
  let r = event.target.innerHTML; // создаем переменную в каторой будет лежать клик
  if (r == q[i][1].answers.right) {
    // события при нажатии на верный ответ
    if (k > 0) {
      // Проверка для чтения только перволго клика
      event.target.classList.add("neutralAnswer"); // вставьте в кавычки "rightAnswer" для зеленого фона на правильном ответе
      yourAnswers.push(r); //Добавляет вариант ответа в масиив для каончнго отображения файлов при проверке
      countRightAnswers++; // счетчик правильных ответов
      k--; // не позволяет делать более одного клика на ответы
    }
  } else {
    // события при нажатии на неверный ответ
    if (k > 0) {
      // Проверка для чтения только перволго клика
      event.target.classList.add("neutralAnswer"); // вставьте в кавычки "falseAnswer" для красного фона на неправильном ответе
      yourAnswers.push(r); //Добавляет вариант ответа в масиив для каончнго отображения файлов при проверке
    }
    k--; // не позволяет делать более одного клика на ответы
  }
  k = 0; // Если было слишком мног онажатий, сбрасывает их
  //Добавляем в конец массива ответ выбранный пользователем
}

document.querySelector(".buttonNext").onclick = nextCard; //привязываем функцию nextCard к кнопке "Далее"

//функция nextCard показывает следующий вопрос и ответы на экране
function nextCard() {
  if (k > 0) return;
  i++;
  k++; // Для составления массивов ответов
  if (k > 1) {
    // Для избежания попадания в массив более одного ответа
    k--;
  }
  q = Object.entries(arrCard); // обьект с вопросами и ответами

  progress.style.width = `${(i / q.length) * 100}%`; //Зеленая линия прогресс выполнения
  if (i > q.length - 1)
    // после крйнего ответа, ваыводит на экран оценку
    return (
      clearTimeout(tt), //остановливает таймер сверху
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
        <div class="more">Посмотреть ошибки<div>`),
      (document.querySelector(".more").onclick = viewErrors)
    );

  questionText.innerHTML = q[i][1].question; //следующий вопрос
  arrAnswers = Object.values(q[i][1].answers); //следующий Ответ
  shuffle(); //тасуем варианты ответов

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
  rightAnswers.push(q[i][1].answers.right); // добавляем правельные ответы в соответствующий массив
}

// Динамическая таблица со сравнением ответов в конце
// (ДЛЯ ТОГО ЧТОБЫ ОНА РАТОБАЛА НУЖНО УДАЛИТЬ МНОГОСТРОЧНЫЕК КОМЕНТАРИИ)
// ↓
/*
let nnText='';
let qwer='';
function viewErrors() {
  for (let nn=0; nn<i;nn++){
    if(yourAnswers[nn]==rightAnswers[nn]){
      qwer = `<td class='trueNd'>${yourAnswers[nn]}</td>`
    }else{
     qwer = `<td class='falseNd'>${yourAnswers[nn]}</td>`
   }
   nnText += `<tr>
   <td>${nn+1}</td>
   ${qwer}
   <td>${rightAnswers[nn]}</td>
   </tr>`
 }
 return (content.innerHTML = `
  <table class='tableAnswers'>
  <tr>
  <th>Номер вопроса</th>
  <th>Ваши ответы:</th>
  <th>Верные ответы:</th>
  </tr>
  ${nnText}
  </table>
   <a class="restart" href="">Начать заново</a>`
  );
}
*/
