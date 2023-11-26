export const controlModal = () => {
    const body = document.querySelector('body');
    const sendRequestBtns = document.querySelectorAll('.request-button');
    const requestModal = document.querySelector('.modal-request')
    const loginModal = document.querySelector('.modal-login')
    const closeBtns = document.querySelectorAll('.close-modal-btn')
    const cabinetBtn = document.querySelector('.header__cabinet')
    if (localStorage.getItem('auth') == "true") {
        cabinetBtn.addEventListener('click', () => {
            document.location.pathname = "/course-work-js/"
            localStorage.setItem('auth', "false");
        })
    } else {
        cabinetBtn.addEventListener('click', () => {
            loginModal.style.display = "block";
            body.classList.add("disable-scroll");
        })
    }
    closeBtns.forEach(e => {
        e.addEventListener('click', () => {
            requestModal.style.display = "none";
            loginModal.style.display = "none";
            body.classList.remove("disable-scroll");
        })
    });
    sendRequestBtns.forEach(e => {
        e.addEventListener('click', () => {
            requestModal.style.display = "block";
            body.classList.add("disable-scroll");
        })
    });
}

export const auth = () => {
    const loginForm = document.querySelector('.login__form');
    const adminLogin = 'admin';
    const adminPass = 'admin';

    const checkValues = event => {
        event.preventDefault();
        const loginInput = document.querySelector('#login');
        const passwordInput = document.querySelector('#password');
        const invalidLogin = document.querySelector('.modal__invalid-login');
        const invalidPass= document.querySelector('.modal__invalid-pass');
        const formBtn = document.querySelector('.form__button');
        
        const login = loginInput.value
        const pass = passwordInput.value
        const hideInvalid = () => {
            formBtn.style.cursor = "pointer"
            formBtn.disabled = ""
            invalidLogin.style.display = "none";
            invalidPass.style.display = "none";
        }
        if (login !== adminLogin) {
            invalidLogin.style.display = "block";
            formBtn.style.cursor = "default"
            formBtn.disabled = "true"
            setTimeout(hideInvalid, 3000);
        }
        if (pass !== adminPass) {
            formBtn.style.cursor = "default"
            formBtn.disabled = "true"
            invalidPass.style.display = "block";
            setTimeout(hideInvalid, 3000);
        }
        if (pass === adminPass && login === adminLogin) {
            document.location.pathname = "/course-work-js/requests.html"
            localStorage.setItem('auth', 'true')
        }

        loginInput.value = ""
        passwordInput.value = ""
        
    }
    loginForm.addEventListener('submit', checkValues)

}