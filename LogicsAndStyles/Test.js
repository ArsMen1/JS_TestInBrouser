const questionText = document.querySelector(".question"); //Блок вопроса
const answerText = document.querySelector(".answers"); // Блок ответов

let arrAnswers = Object.values(arrCard.card1.answers); //Массив ответов из изходника
let yourAnswers = []; //Массив ваших ответов

questionText.innerHTML = arrCard.card1.question; //выводим на экран Вопрос

arrAnswers.sort(() => Math.random() - 0.5); //Перемешаем массив что бы  нельзя быол запомнить положние ответов

//Для каждого ответа сделать блок с индефикатором
arrAnswers.forEach((elem) => {
  let divs = document.createElement("div"); //создаем блок
  divs.append(elem); //присваеваем блоку значение из массива
  divs.classList.add("hoverAnswer"); // присваеваем блокам класс для стилизации
  answerText.appendChild(divs); // добавляем блок на экран
});

document.querySelector(".answers").onclick = answerClick; //Нa выбранный блок вешаем событие
function answerClick() {
  let r = event.target.innerHTML;
  if (r == arrCard.card1.answers.right) {
    event.target.classList.add("rightAnswer");
  } else {
    event.target.classList.add("falseAnswer");
  }
  yourAnswers.push(r);
}

console.log(yourAnswers);
