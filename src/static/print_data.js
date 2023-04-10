document.addEventListener('DOMContentLoaded', e => {
    const web_app = window.Telegram.WebApp;
    console.log(web_app);
    console.log(web_app.initDataUnsafe.user);


    let mw = document.querySelector('.loggin--first_name');
    mw.textContent = web_app.initDataUnsafe.user !== undefined ? web_app.initDataUnsafe.user.first_name : "Bob";

    mw = document.querySelector('.loggin--username');
    mw.textContent = web_app.initDataUnsafe.user !== undefined ? web_app.initDataUnsafe.user.username : "Bob";

    mw = document.querySelector('.loggin--language_code');
    mw.textContent = web_app.initDataUnsafe.user !== undefined ? web_app.initDataUnsafe.user.language_code : "Bob";


});