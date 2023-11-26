export const renderCards = () => {
    const cardsSection = document.querySelector(".services__cards-container");
    const cardsInfo = [
            {"type": "холодильников",
            "img_src": "assets/img/fridge.png",
            "img_alt": "Холодильник",
            "breaking_1": "Не охлаждает",
            "breaking_2": "Течёт",
            "breaking_3": "Сильно шумит",
            "price" : 449
            },
            {"type": "пылесосов",
            "img_src": "assets/img/vacuum cleaner.png",
            "img_alt": "Пылесос",
            "breaking_1": "Не включается",
            "breaking_2": "Слабо всасывает",
            "breaking_3": "Засорился",
            "price" : 349
            },
            {"type": "телевизоров",
            "img_src": "assets/img/tv.png",
            "img_alt": "Телевизор",
            "breaking_1": "Повреждена матрица",
            "breaking_2": "Пропадает изображение",
            "breaking_3": "Хрипят динамики",
            "price" : 399
            },
            {"type": "духовых шкафов",
            "img_src": "assets/img/oven.png",
            "img_alt": "Духовой шкаф",
            "breaking_1": "Не работает конвекция",
            "breaking_2": "Не держит температуру",
            "breaking_3": "Не включает режимы",
            "price" : 389
            },
            {"type": "электроплит",
            "img_src": "assets/img/electric stove.png",
            "img_alt": "Электроплита",
            "breaking_1": "Не работает конфорка",
            "breaking_2": "Не горят индикаторы",
            "breaking_3": "Не нагревается",
            "price" : 399
            },
            {"type": "стиральных машин",
            "img_src": "assets/img/washing machine.png",
            "img_alt": "Стиральная машина",
            "breaking_1": "Течёт",
            "breaking_2": "Шумит",
            "breaking_3": "Не отжимает",
            "price" : 469
            },
            {"type": "варочных панелей",
            "img_src": "assets/img/hob.png",
            "img_alt": "Варочная панель",
            "breaking_1": "Не работает конфорка",
            "breaking_2": "Не горят индикаторы",
            "breaking_3": "Не нагревается",
            "price" : 449
            },
            {"type": "кофемашин",
            "img_src": "assets/img/coffee machine.png",
            "img_alt": "Кофемашина",
            "breaking_1": "Не включается",
            "breaking_2": "Не нагревается",
            "breaking_3": "Не измельчает кофе",
            "price" : 479
            },
            {"type": "сушильных машин",
            "img_src": "assets/img/dryer.png",
            "img_alt": "Сушильная машина",
            "breaking_1": "Не включается",
            "breaking_2": "Не горят индикаторы",
            "breaking_3": "Не сушит",
            "price" : 399
            }   
    ]
    cardsInfo.forEach(el => {
        const card = document.createElement('div');
        card.classList.add('services__card');
        card.innerHTML = `
            <img class="card__image" src="${el.img_src}" alt="${el.img_alt}">
            <div class="card__wrapper">
                <h3 class="card__header">
                    Ремонт<br>${el.type}
                </h3>
                <ul class="card__breakdowns-list">
                    <li class="card__breakdowns-item">
                        ${el.breaking_1}
                    </li>
                    <li class="card__breakdowns-item">
                        ${el.breaking_2}
                    </li>
                    <li class="card__breakdowns-item">
                        ${el.breaking_3}
                    </li>
                </ul>
                <div class="card__footer">
                    <p class="card__footer-price">
                        от ${el.price} ₽
                    </p>
                    <button type="button" class="card__footer-btn request-button">
                        Оставить заявку
                    </button>
                </div>
            </div>
            `
            cardsSection.appendChild(card)
    })
}