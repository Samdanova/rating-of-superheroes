
let rate=[];
let json = `[{
    "name":"Бэтмен",
    "src": "img/batman.jpg",
    "universe":"DC Comics",
"alter":"Брюс Уэйн",
"action":"борец с преступностью, филантроп, миллиардер",
"friends":" Робин, Бэтгерл",
"superpowers":"интеллект, обширные познания, знания боевых искусств, ловкость",
"details":"по популярности человек-летучая мышь может сравниться только с Суперменом. Его образ кажется очень мистическим и мрачным: черный костюм с развевающимся плащом, устрашающий Бэтмобиль, штаб-квартира в сырой пещере. Его биография настолько же темна, как и образ. В детстве у него на глазах убили родителей, и юный Брюс поклялся всеми силами защищать родной Готэм от преступности. "
},
{
    "name":"Супермен",
    "src": "img/superman.jpg",
    "universe":"DC Comics",
"alter":"Кларк Кент",
"action":"борец за справедливость",
"friends":"собака Крипто",
"superpowers":"непробиваемость, суперсила, полет, самоисцеление, суперзрение и суперслух, классный костюм",
"details":"полная противоположность своему противнику Бэтмену. Если Брюс Уэйн был простым человеком и стал героем, то Супермен героем родился, но вынужден был изображать выходца из бедной канзасской семьи. Последний представитель планеты Криптон был отправлен на Землю прямо перед тем, как его родина была уничтожена. "
},{
    "name":"Железный человек",
    "src": "img/ironman.jpg",
    "universe":"Marvel Comics",
"alter":"Тони Старк",
"action":"гений, миллиардер, плейбой, филантроп",
"friends":"Мстители",
"superpowers":"высокий уровень интеллекта, широкие познания науки и техники, связь со всемирной паутиной, бронекостюмы."
},
{
    "name":"Капитан Америка",
    "src": "img/spider-man.jpg",
    "universe":"Marvel Comics",
"alter":"Питер Паркер",
"action":"борец за справедливость, студент, фотограф",
"friends":"Мстители, Фантастическая четверка, Люди Икс",
"superpowers":"сверхчеловеческие рефлексы, «паучье чутье», способность прилепляться к твердым поверхностям, производство паутины."
},
{
    "name":"Человек паук",
    "src": "img/spider-man.jpg",
    "universe":"Marvel Comics",
"alter":"Питер Паркер",
"action":"борец за справедливость, студент, фотограф",
"friends":"Мстители, Фантастическая четверка, Люди Икс",
"superpowers":"сверхчеловеческие рефлексы, «паучье чутье», способность прилепляться к твердым поверхностям, производство паутины."
},
{
    "name":"Капитан Америка",
    "src": "img/capamer.jpg",
    "universe":"Marvel Comics",
"alter":"Стивен Роджерс",
"action":"супер-солдат",
"friends":"Мстители",
"superpowers":"сила, выносливость, бессмертие, быстрая регенерация, мастерство скрытности и боя"
}]`;

document.addEventListener("DOMContentLoaded", function(){
    getSupermans()
})

function getSupermans (){
        let superheroes = JSON.parse(json);
    let rating=localStorage.getItem("rating");
    if(rating){
        rate = JSON.parse(localStorage.getItem("rating"))
    }
    else{
        localStorage.setItem("rating", JSON.stringify([]));
    }
    for( let i = 0; i < superheroes.length; i++){
        createSuper(superheroes[i])
    }

}

function createSuper (data){
    let div = document.createElement("div");
    div.classList.add('super')
    document.getElementById('superheroesContainer').appendChild(div)
    let h1 = div.appendChild(document.createElement('h1'));
    h1.innerHTML = data.name;
    
    let div_u = div.appendChild(document.createElement('div'));
    div_u.innerHTML = "Вселенная: "+ data.universe;
    div_u.classList.add('naming');
    let div_alter = div.appendChild(document.createElement('div'));
    div_alter.innerHTML = "Альтер эго: "+data.alter;
    div_alter.classList.add('naming');
    let div_action = div.appendChild(document.createElement('div'));
    div_action.innerHTML = "Деятельность: "+ data.action;
    div_action.classList.add('naming');
    let div_friends = div.appendChild(document.createElement('div'));
    div_friends.innerHTML = "Друзья: "+ data.friends;
    div_friends.classList.add('naming');
    let div_super = div.appendChild(document.createElement('div'));
    div_super.innerHTML = "Суперсилы: "+data.superpowers;
    div_super.classList.add('naming');
    let img = div.appendChild(document.createElement('img'));
    img.classList.add('supermanImg')
    img.src = data.src;
    let div_rate = div.appendChild(document.createElement('div'));
    div_rate.innerHTML = "Оцените супергероя от 0 до 10 ";
    div_rate.classList.add('naming');
    let input = div.appendChild(document.createElement('input'));
    input.type = "number";
    input.classList.add('input');
    let buttonLike = div.appendChild(document.createElement('button'));
    buttonLike.innerHTML = "Оценить"
    buttonLike.classList.add('buttonLike');
    buttonLike.dataset.name = data.name;

    const index = rate.find(item => item.name===data.name); //если item проходит проверку, то возвращает Item то есть сам объект
    if (index) {
        input.value=index.rate;
    }

    buttonLike.addEventListener("click", setLike);
}


function setLike(event) {
    const likes = {};
    let nameSuper = event.target.dataset.name;
    console.log(nameSuper);
    // if (event.target.parentNode.querySelector('input').value >= 1){
        let numberLike = event
            .target
            .parentNode
            .querySelector('input')
            .value;
        console.log(numberLike);

    const index = rate.find(item => item.name === nameSuper);
    if (index) {
        const rate2 = rate.map((item) => {
            if (item.name === nameSuper) { //проходимся по каждому объекту массива
                item.rate = numberLike;
            }
            return item;
        });
        localStorage.setItem("rating", JSON.stringify(rate2));
        rate = rate2;
    } else {
        likes.name = nameSuper;
        likes.rate = numberLike;
        rate.push(likes);
        localStorage.setItem("rating", JSON.stringify(rate));
    }
}

