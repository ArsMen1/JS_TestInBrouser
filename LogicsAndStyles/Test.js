const questionText = document.querySelector(".question"); //Блок вопроса
const answerText = document.querySelector(".answers"); // Блок ответов

let arrAnswers = Object.values(arrCard.card1.answers); //Массив ответов

//выводим на экран Вопрос
questionText.innerHTML = arrCard.card1.question;

arrAnswers.sort(() => Math.random() - 0.5); //Перемешаем массив что бы  нельзя быол запомнить положние ответов

//Для каждого ответа сделать блок с индефикатором
arrAnswers.forEach((item, index, array) => {
  let divs = document.createElement("div"); //создаем блок
  divs.append(item); //присваеваем блоку значение из массива
  divs.classList.add("hoverAnswer"); // присваеваем блокам класс для стилизации
  answerText.appendChild(divs); // добавляем блок на экран
});

const answe22rText = document.querySelectorAll(".hoverAnswer"); // Блок ответов
console.log(arrAnswers);
