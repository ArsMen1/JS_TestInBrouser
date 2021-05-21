const questionText = document.querySelector('.question') //Блок вопроса
const answerText = document.querySelector('.answers') // Блок ответов


let arrAnswers= Object.values(arrCard.card1.answers)//Массив ответов

//выводим на экран Вопрос
questionText.innerHTML = arrCard.card1.question;

arrAnswers.sort(() => Math.random() - 0.5);//Перемешаем массив что бы  нельзя быол запомнить положние ответов

//Для каждого ответа сделать блок с индефикатором
arrAnswers.forEach((item, index, array) => {
  let divs = document.createElement('div')//создаем блок
  divs.append(item)//присваеваем блоку значение из массива
  divs.classList.add('hoverAnswer')// присваеваем блокам класс для стилизации
  answerText.appendChild(divs)// добавляем блок на экран
});


const answe22rText = document.querySelectorAll('.hoverAnswer') // Блок ответов
console.log(arrAnswers)
















 /* Это то что было и исходниках, можно посмотреть проверку на правильность

   // массив с правильными ответами, проверять будем по совпадению data-id с индексом элемента массива
   // потому в хтмл инпуты с классом .answer нумеруем в data-id с нуля и по возрастанию
    
  var arrAnswer = ['коростель', 'бабе'];

  // сабмитим форму, проверяем всякое и отдаем результат
  $('#testform').on('submit', function(e) {

    var thisform = $(this);
    var questionCount = thisform.find('.answer').length; // количество инпутов\вопросов
    var countRight = 0; // количество правильных
    var resultText = ''; // текст о результатах
    var inputClass = ''; // класс инпута правильно\неправильно
    var percent = 0; // процент правильных (просто для красоты)
    var resultTextClass = ''; // класс для подсветки результирующего текста
    $('.result').removeClass('good bad');

    thisform.find('.answer').each(function() {
      $(this).removeClass('good bad'); // сбросим классы инпута

      var answerid = $(this).attr('data-id'); // ID инпута вопроса
      var answerval = $(this).val(); // значение инпута вопроса от пользователя

      var rightAnswer = arrAnswer[answerid]; // правильный ответ для данного инпута из массива

      if (answerval == rightAnswer) {
        countRight = ++countRight; // увеличим счетчик правильных на +1
        inputClass = 'good'; // установим класс
      } else {
        inputClass = 'bad';
      }
      $(this).addClass(inputClass);


    });

    percent = Math.floor((countRight / questionCount) * 100);
    if (percent > 50) {
      resultTextClass = 'good'; // установим класс
    } else {
      resultTextClass = 'bad'; // установим класс
    }


    resultText = 'правильно ' + percent + '% ' + countRight + ' вопроса из ' + questionCount + '';
    $('.result .result_text').text(resultText);
    $('.result').addClass(resultTextClass);

    return false;
  });*/