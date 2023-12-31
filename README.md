# Commenting-system

### Описание
Система комментирования реализованная на TypeScript.

### Инструменты
- HTML
- SCSS
- TypeScript
- Vite
- Библиотека Axios

### Как запустить
- Клонируем репозиторий себе на локальный ПК (git clone https://github.com/ReyChart/PR06-CommentingSystem.git)
- Устанавливаем пакеты **с помощью npm i**
- Запускаем проект **с помощью npm run dev**
- Открываем проект **по ссылке от Vite** http://localhost:5173/

### Функциональные требования
В реализованном проекте можно:

- добавлять комментарии. Так как проект не подразумевает создание серверной части, данные можно сохранять в браузере, а для тестирования использовать mock-данные *(искусственные данные, имитирующие реальные)*.
- отвечать на уже существующие комментарии.
- задавать максимальную длину комментария *(1000 символов)*. При превышении этого лимита пользователю запрещается публиковать комментарий *(кнопка отправки комментария должна стать неактивной)*.
- изменять рейтинг комментария — увеличивать или уменьшать его на единицу. Каждый пользователь может менять рейтинг строго на единицу *(не более)*. Данные о рейтинге и его изменении можно также хранить в браузере. Прописать это **можно в localStorage**, чтобы и после обновления страницы было видно, что пользователь уже поменял рейтинг комментария.
- добавлять комментарий в избранное. После добавления комментария в избранное должны изменяться иконка и текст *(макет)*. При повторном нажатии все изменения отменяются и комментарий перестаёт быть избранным.
- сортировать все комментарии по различным параметрам — избранные, по дате размещения, количеству оценок, количеству ответов. По умолчанию используйте сортировку по дате размещения.

### Требования к коду
- Проект выполнен с использованием *TypeScript*.
- На *ES6-классах* применено ООП.
- Соблюдено единообразие оформления кода: корректные отступы между смысловыми блоками, единый формат отступов от левого края *(два или четыре пробела — на ваш выбор)* и так далее.
- Все переменные, классы и функции имеют осмысленные имена.
- Проект следует принципам **DRY** *(Don’t Repeat Yourself)* и **KISS** *(Keep It Short and Simple)*.
- Все комментарии хранятся *в localStorage*.
- Для генерирования аватаров пользователей применяются сторонние сервисы.

# Дополнительно

![Commenting_system](https://github.com/ReyChart/PR06-CommentingSystem/assets/126756819/850b7ba7-c401-44f3-aea9-8fd8d8e30ff8)
