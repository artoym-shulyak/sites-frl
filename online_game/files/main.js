// Фильтер
const filterCards = () => {
    try {
        const btn = document.querySelector('#filter'),
            filter = document.querySelector('#filter-items'),
            items = document.querySelectorAll('li')

        btn.addEventListener('click', () => {
            filter.classList.add('_active')
        })

        items.forEach(item => {
            item.addEventListener('click', e => {
                const target = e.target;
                items.forEach(action => action.classList.remove('_active'));
                filter.classList.remove('_active')
                target.classList.add('_active')
            })
        })

        // If this class of this element is't present, then hide all the actions of the cards 
        document.addEventListener("click", (e) => {
            const target = e.target;
            if (!target.closest('.offer__head')) {
                filter.classList.remove('_active')
            }
        });
    } catch (e) {
        console.log(e)
    }
}
filterCards()

// Шаги модалки
const stepsOffer = (next, stepFirst, stepSecond, isSteps) => {
    if (isSteps) {
        next.forEach(btn => {
            btn.addEventListener('click', () => {
                if (btn.getAttribute('data-next') === 'create-offer') {
                    stepFirst.classList.remove('_active')
                    stepSecond.classList.add('_active')
                } else if (btn.getAttribute('data-next') === 'application') {
                    stepFirst.classList.remove('_active')
                    stepSecond.classList.add('_active')
                }
            })
        })

    } else {
        stepFirst.classList.add('_active')
        stepSecond.classList.remove('_active')
    }
}

// Выбор режима "Индивидуальная" / "Групповая"
const modeOffer = (btnsFilter, countPlayers) => {
    btnsFilter.forEach(btn => {
        btn.addEventListener('click', () => {
            btnsFilter.forEach(btn => btn.classList.remove('_active'))
            btn.classList.add('_active')
            if (btn.getAttribute('data-choise') === 'group') {
                countPlayers.classList.add("_show");
            } else {
                countPlayers.classList.remove("_show");
            }
        })
    })
}

// Руководство количество игроков
const countPlayer = (modal) => {
    const plus = modal.querySelector('[data-add]'),
        minus = modal.querySelector('[data-delete]'),
        count = modal.querySelector('[data-count]');

    plus.addEventListener('click', () => {
        +count.textContent++
    })
    minus.addEventListener('click', () => {
        if (+count.textContent > 0) {
            +count.textContent--
        }

    })
}

// Скрыть / Показать "Модальные окно"
const modal = () => {
    try {
        const modal = document.querySelector('[data-modal]'), // Modal Window
            open = document.querySelectorAll('[data-body]'), // Open modal
            close = modal.querySelectorAll('[data-close]'), // Close modal
            edit = document.querySelectorAll(['[data-edit]']), // Redactor modal
            next = document.querySelectorAll('[data-next]'), // Btn of next
            stepFirst = document.querySelector('[data-step="1"]'), // Step 1
            stepSecond = document.querySelector('[data-step="2"]'), // Step 2
            stepFirstAplication = document.querySelector('[data-application="1"]'), // Step 2
            stepSecondAplication = document.querySelector('[data-application="2"]'), // Step 2
            cart = document.querySelector('[data-cart]'), // Add cart
            game = document.querySelector('[data-game]'), // Add game
            application = document.querySelector('[data-application]'), // Add application
            btnsFilter = document.querySelectorAll('[data-choise]'), // Filters
            countPlayers = document.querySelector('#count-players'), // block countPlayers
            title = modal.querySelectorAll('.modal__title span:first-child'),
            spanTitle = modal.querySelectorAll('.modal__title span:last-child');

        modeOffer(btnsFilter, countPlayers)
        countPlayer(modal)

        open.forEach(btn => {
            btn.addEventListener('click', (event) => {
                event.preventDefault();

                if (btn.getAttribute('data-body') === 'create') {
                    stepFirst.classList.add('_active')
                    stepSecond.classList.remove('_active')
                    game.classList.remove('_show');
                    application.classList.remove('_active');
                    modal.classList.add('_show');
                    stepsOffer(next, stepFirst, stepSecond, true)
                }
                 else if (btn.getAttribute('data-body') === 'edit') {
                    title.forEach(item => {
                        item.textContent = 'Игровое предложение'
                    })
                    spanTitle.forEach(item => item.style.opacity = '1')
                    modal.querySelectorAll('.modal__remove').forEach(btn => btn.style.display = 'flex')
                    modal.classList.add('_show');
                    stepsOffer(next, stepFirst, stepSecond, true)
                } else if (btn.getAttribute('data-body') === 'cart') {
                    stepFirst.classList.remove('_active')
                    stepSecond.classList.remove('_active')
                    cart.classList.add('_show');
                    modal.classList.add('_show');
                } else if (btn.getAttribute('data-body') === 'game') {
                    stepFirst.classList.remove('_active')
                    stepSecond.classList.remove('_active')
                    stepFirstAplication.classList.remove('_active')
                    stepSecondAplication.classList.remove('_active')
                    game.classList.add('_show');
                    modal.classList.add('_show');
                } else if (btn.getAttribute('data-body') === 'application') {
                    stepFirst.classList.remove('_active')
                    stepSecond.classList.remove('_active')
                    stepSecondAplication.classList.remove('_active')
                    game.classList.remove('_show');
                    application.classList.add('_active');
                    modal.classList.add('_show');
                    stepsOffer(next, stepFirstAplication, stepSecondAplication, true)
                } else {
                    title.forEach(item => item.textContent = 'Создание игрового предложения')
                    spanTitle.forEach(item => item.style.opacity = '0')
                    modal.querySelectorAll('.modal__remove').forEach(btn => btn.style.display = 'none')
                    modal.classList.add('_show');
                }
            })
        })

        close.forEach(btn => {
            btn.addEventListener('click', () => {
                modal.classList.remove('_show');
                stepsOffer(next, stepFirst, stepSecond, false)
            })
        })

        modal.addEventListener('click', e => {
            if (e.target && e.target === modal) {
                modal.classList.remove('_show')
            }
        })
    } catch (e) {
        console.log(e)
    }
}
modal()


// Загрузка изображения
function addImg(fileBox) {
    try {
        const box = document.querySelector(fileBox), // Файл
            input = box.querySelector('[name="upload"]'), // Файл инпута
            img = document.createElement("img");

        box.appendChild(img);
        img.style.display = "none";

        // Отслеживаем событие добавление изображении
        ["drop", "input"].forEach((eventName) => {
            input.addEventListener(eventName, (e) => {
                if (eventName === "drop") {
                    input.files = e.dataTransfer.files; // Получаем информацию о IMG
                }
                let nameImgArray = input.files[0].name.split(".");
                let name = nameImgArray[0];
                let format = nameImgArray[1];

                if (format === "png" || format === "jpg" || format === "webp") {
                    img.src = `img/${name}.${format}`;
                    img.alt = `${name}`;
                    box.querySelector("span").style.display = "none";
                    box.querySelector("button").style.display = "none";
                    box.querySelector("input").style.display = "none";
                    img.style.display = "block";
                }
            });
        });
    } catch (e) {
        console.log(e)
    }
}
addImg('[data-upload]')

const modalPages = (open, modalContent) => {
    try {
        const btn = document.querySelector(open),
            modal = document.querySelector(modalContent),
            close = document.querySelector('[data-close]')

        btn.addEventListener('click', e => {
            e.preventDefault()
            modal.classList.add('_active')
        })

        close.addEventListener('click', e => {
            modal.classList.remove('_active')
        })

        modal.addEventListener('click', e => {
            if (e.target && e.target === modal) {
                modal.classList.remove('_active')
            }
        })
    } catch (e) {
        console.log(e)
    }
}
modalPages('.btn-pages', '.pages')