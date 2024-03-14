const product = {
    crazy: {
        name: "Crazy",
        price: 1000,
        img: 'images/products/burger-1.png',
        amount: 0,
        get totalSum() {
            return this.price * this.amount
        }
    },
    light: {
        name: "Light",
        price: 1000,
        img: 'images/products/Пепе.png',
        amount: 0,
        get totalSum() {
            return this.price * this.amount
        }
    },
    cheeseburger: {
        name: "CheeseBurger",
        price: 1000,
        img: 'images/products/Yoda.png',
        amount: 0,
        get totalSum() {
            return this.price * this.amount
        }
    },
    dburger: {
        name: "dBurger",
        price: 1000,
        img: 'images/products/Lady.png',
        amount: 0,
        get totalSum() {
            return this.price * this.amount
        }
    }
}

const productBtns = document.querySelectorAll('.wrapper__list-btn'),
    basketBtn = document.querySelector('.wrapper__navbar-btn'),
    basketModal = document.querySelector('.wrapper__navbar-basket'),
    closeBasketModal = document.querySelector('.wrapper__navbar-close'),
    basketChecklist = document.querySelector('.wrapper__navbar-checklist'),
    totalPriceBasket = document.querySelector('.wrapper__navbar-totalprice'),
    basketBtnCount = document.querySelector('.warapper__navbar-count')
    btncard = document.querySelector('.wrapper__navbar-bottom');
    print__body = document.querySelector('.print__body'),
    print__footer = document.querySelector('.print__footer')


productBtns.forEach((btn) => {
    btn.addEventListener('click', function () {
        plusOrMinus(this);
    });
});

function plusOrMinus(btn) {
    let parent = btn.closest('.wrapper__list-card'),
        parentId = parent.getAttribute('id')
    product[parentId].amount++
    basket()
}

function basket() {
    const productArray = []
    for (const key in product) {
        let totalCount = 0;
        const po = product[key]
        const productCard = document.querySelector(`#${po.name.toLowerCase()}`),
            parentIndecator = productCard.querySelector('.wrapper__list-count')
        if (po.amount) {
            productArray.push(po)
            basketBtnCount.classList.add('active');
            parentIndecator.classList.add('active');
            parentIndecator.innerHTML = po.amount;
            totalCount += po.amount
        } else {
            parentIndecator.classList.remove('active')
            parentIndecator.innerHTML = 0
        }
        basketBtnCount.innerHTML = totalCount
    }
    basketChecklist.innerHTML = ''
    for (let i = 0; i < productArray.length; i++) {
        basketChecklist.innerHTML += cardItemBurger(productArray[i])
    }
    const allCount = totalCountProduct()
    if (allCount) {
        basketBtnCount.classList.add('active')
    } else {
        basketBtnCount.classList.remove('active')
    }
    basketBtnCount.innerHTML = allCount
    totalPriceBasket.innerHTML = totalSummProduct()
}

function totalCountProduct() {
    let total = 0
    for (const key in product) {
        total += product[key].amount
    }
    return total
}
function totalSummProduct() {
    let total = 0
    for (const key in product) {
        total += product[key].totalSum
    }
    return total
}

function cardItemBurger(productData) {
    const {
        name,
        amount,
        img,
        totalSum
    } = productData

    return `
  
  <div class="wrapper__navbar-product">
      <div class="wrapper__navbar-info">
         <img src="${img}" alt="" class="wrapper__navbar-productImage">
         <div class="wrapper__navbar-subInfo">
          <p class="wrapper__navbar-infoName">${name}</p>
          <p class="wrapper__navbar-infoPrice">${totalSum}</p>
         </div>
      </div>
      <div class="wrapper__navbar-option" id="${name.toLowerCase()}_card">
          <button class="wrapper__navbar-symbol fa-plus" data-symbol="+">+</button>
          <span class="wrapper__navbar-count">${amount}</span>
          <button class="wrapper__navbar-symbol fa-minus" data-symbol="-">-</button>
      </div>
  </div>
  `

}

window.addEventListener('click',function(el){
    const btn = el.target
    if (btn.classList.contains('wrapper__navbar-symbol')){
       const attr = btn.getAttribute('data-symbol')
       const parent = btn.closest('.wrapper__navbar-option')
       if (parent){
        const idProduct = parent.getAttribute('id').split('_')[0]
        if(attr == '+') product[idProduct].amount++
        else if(attr == '-') product[idProduct].amount--
        basket()
       }
    }
})

basketBtn.addEventListener('click', () => {
    basketModal.classList.add('active')
})
closeBasketModal.addEventListener('click', () => {
    basketModal.classList.remove('active')
})

btncard.addEventListener('click', function(){
    print__body.innerHTML = ''
    for (const key in product) {
       const {name, amount, totalSum} = product[key];
       if(amount){
        print__body.innerHTML += `
        <div class="print__body-item">
                <div class="print__body-item_name">
                    <span>${name}</span>
                    <span>${amount}</span>
                </div>
                <p class="print__body-item_summ">${totalSum}</p>
            </div>
        `;
       }
           
    }

    print__footer.innerHTML = totalSummProduct()

    window.print();
})










const headElem = document.getElementById("head");
const buttonsElem = document.getElementById("buttons");
const pagesElem = document.getElementById("pages");

class Quiz
{
	constructor(type, questions, results)
	{

		this.type = type;


		this.questions = questions;

		this.results = results;

		this.score = 0;

		this.result = 0;

		this.current = 0;
	}

	Click(index)
	{
		let value = this.questions[this.current].Click(index);
		this.score += value;

		let correct = -1;


		if(value >= 1)
		{
			correct = index;
		}
		else
		{

			for(let i = 0; i < this.questions[this.current].answers.length; i++)
			{
				if(this.questions[this.current].answers[i].value >= 1)
				{
					correct = i;
					break;
				}
			}
		}

		this.Next();

		return correct;
	}


	Next()
	{
		this.current++;
		
		if(this.current >= this.questions.length) 
		{
			this.End();
		}
	}


	End()
	{
		for(let i = 0; i < this.results.length; i++)
		{
			if(this.results[i].Check(this.score))
			{
				this.result = i;
			}
		}
	}
} 


class Question 
{
	constructor(text, answers)
	{
		this.text = text; 
		this.answers = answers; 
	}

	Click(index) 
	{
		return this.answers[index].value; 
	}
}


class Answer 
{
	constructor(text, value) 
	{
		this.text = text; 
		this.value = value; 
	}
}


class Result 
{
	constructor(text, value)
	{
		this.text = text;
		this.value = value;
	}


	Check(value)
	{
		if(this.value <= value)
		{
			return true;
		}
		else 
		{
			return false;
		}
	}
}


const results = 
[
	new Result("Вам многому нужно научиться", 4),
	new Result("Вы уже неплохо разбираетесь", 8),
	new Result("Ваш уровень выше среднего", 12),
	new Result("Красавчики так держать все команды молодцы", 14)
];


const questions = 
[
	
	new Question("Гарантом соблюдения Конституции  РУз  является ", 
	[
		new Answer('Сама Конституция', 0),
		new Answer("Граждане страны", 0),
		new Answer("Парламент", 0),
		new Answer("Президент РУз", 1)
	]),
	new Question("Как называется лицо, неоднократно осуждённое за различные преступления", 
	[
		new Answer('Рецидивист', 1),
		new Answer("Маньяк", 0),
		new Answer("Апатрид", 0),
		new Answer("Преступник", 0)
	]),
	new Question("Что означает слово «суверенитет» ", 
	[
		new Answer('Зависмость', 0),
		new Answer("Нахождение государства в составе другого государства", 0),
		new Answer("Зависимость во внутренней жизни государства и в отношении с другими странами", 0),
		new Answer("Независимость государства в своей внутренней жизни и внешних отношениях от других государств", 1)
	]),
	new Question("Какой из этих терминов обозначает незаконное  присоединение территории  другого государства ", 
	[
		new Answer('Асфиксия ', 0),
		new Answer("Аннексия", 1),
		new Answer("Анархизм", 0),
		new Answer("Агрессия", 0)
	]),
	new Question("Можно ли обвинять школьника по некоторым статьям Уголовного Кодекса  РУз:", 
	[
		new Answer('Можно, если ему исполнилось  14 лет', 1),
		new Answer("Можно, если ему исполнилось 16 л ", 0),
		new Answer("Можно, если он не признался в преступлении ", 0),
		new Answer("Нельзя, до 18 л. обвинять  можно  только по статьям Административного Кодекса", 0)

	]),
	new Question("Прокурор – главная фигура  в суде , да или нет ?", 
	[
		new Answer('да ', 0),
		new Answer("нет", 1),
		new Answer("да но не точно ", 0),
		new Answer("хмм...", 0)
	]),
	new Question("Имеет ли  право  ташкентский  восьмиклассник  носить в школу перочинный нож  ", 
	[
		new Answer('Имеет, если ему угрожают старшеклассники', 0),
		new Answer("Имеет, если ему разрешил отец  ", 0),
		new Answer("не при каких обстаятельствах", 1),
		new Answer("Имеет, если в комплект ножа входят  ножницы, шило, открывалка и прочее", 0)
	]),
	new Question("К государственной символике относятся", 
	[
		new Answer('Конституция', 0),
		new Answer("Гимн и Герб ", 0),
		new Answer("Флаг и территория ", 0),
		new Answer("Герб, Флаг, Гимн", 1)
	]),
	new Question("Единовластный  источник  государственной власти ", 
	[
		new Answer('Народ', 1),
		new Answer("Не он", 0),
		new Answer("Президент", 0),
		new Answer("Каб.Мин", 0)
	]),
	new Question("Как называется процедура отстранения от власти президента в США ?", 
	[
		new Answer('Эстаблишмент', 0),
		new Answer("Экзекуция", 0),
		new Answer("Импичмент", 1),
		new Answer("Экстрадишен ", 0)
	]),


	new Question("По форме  гос. управления РУз ", 
	[
		new Answer('Конст.Монархия ', 0),
		new Answer("Парламентская республика ", 0),
		new Answer("Президенсткая республика", 1),
		new Answer("Абсолютная Монархия", 0)
	]),
	new Question("Что означает слово «демократия»?", 
	[
		new Answer('Власть народы', 1),
		new Answer("Власть немногих", 0),
		new Answer("Власть знатных", 0),
		new Answer("Свободу попугаям", 0)
	]),
	new Question("Как называется вступительная часть Конституции РУз ?", 
	[
		new Answer('нет точного ответа', 0),
		new Answer("Оглавление ", 0),
		new Answer("Вступление ", 0),
		new Answer("Преамбула ", 1)
	]),
	new Question("Какая организация приняла Всеобщую Декларацию Прав Человека:", 
	[
		new Answer('Красный крест', 0),
		new Answer("ООН", 1),
		new Answer("ЮНИСЕФ", 0),
		new Answer("Гаагский трибунал ", 0)
	]),
	new Question("Какое из этих государств  не является монархией: ", 
	[
		new Answer('Монголы ', 1),
		new Answer("Испания", 0),
		new Answer("Нидерланды", 0),
		new Answer("Морокко", 0)

	]),

];


const quiz = new Quiz(1, questions, results);

Update();


function Update()
{

	if(quiz.current < quiz.questions.length) 
	{

		headElem.innerHTML = quiz.questions[quiz.current].text;


		buttonsElem.innerHTML = "";


		for(let i = 0; i < quiz.questions[quiz.current].answers.length; i++)
		{
			let btn = document.createElement("button");
			btn.className = "button";

			btn.innerHTML = quiz.questions[quiz.current].answers[i].text;

			btn.setAttribute("index", i);

			buttonsElem.appendChild(btn);
		}
		

		pagesElem.innerHTML = (quiz.current + 1) + " / " + quiz.questions.length;

		Init();
	}
	else
	{

		buttonsElem.innerHTML = "";
		headElem.innerHTML = quiz.results[quiz.result].text;
		pagesElem.innerHTML = "Ваши очки: " + quiz.score;
	}
}

function Init()
{

	let btns = document.getElementsByClassName("button");

	for(let i = 0; i < btns.length; i++)
	{

		btns[i].addEventListener("click", function (e) { Click(e.target.getAttribute("index")); });
	}
}

function Click(index) 
{

	let correct = quiz.Click(index);


	let btns = document.getElementsByClassName("button");


	for(let i = 0; i < btns.length; i++)
	{
		btns[i].className = "button button_passive";
	}

	if(quiz.type == 1)
	{
		if(correct >= 0)
		{
			btns[correct].className = "button button_correct";
		}

		if(index != correct) 
		{
			btns[index].className = "button button_wrong";
		} 
	}
	else
	{

		btns[index].className = "button button_correct";
	}


	setTimeout(Update, 1000);
}



