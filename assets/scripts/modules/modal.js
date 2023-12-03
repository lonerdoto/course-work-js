
export const closeModal = () => {
    const body = document.querySelector('body');
    const modals = document.querySelectorAll('.modal')
    body.classList.remove("disable-scroll");
    modals.forEach(e => {
        e.style.display = "none";
    });
    
}


export const openModal = (type = null) => {
    const body = document.querySelector('body');
    const loginModal = document.querySelector('.modal-login')
    const requestModal = document.querySelector('.modal-request')
    const sendedRequestModal = document.querySelector('.modal-sended-request')
    const editModal = document.querySelector('.modal-edit')
    body.classList.add("disable-scroll");
    if (type === 'req') {
        requestModal.style.display = "block";
    } else if (type === 'sended-req') {
        sendedRequestModal.style.display = "block";
    } else if (type === 'edit-req') {
        editModal.style.display = "block";
        
    } else {
        loginModal.style.display = "block";
    }

}


export const controlModal = () => {
    const sendRequestBtns = document.querySelectorAll('.request-button');
    const cabinetBtn = document.querySelector('.header__cabinet')
    const editBtn = document.querySelectorAll('.editIcon')
    let isModalOpened = false;
    if (localStorage.getItem('auth') == "true") {
        cabinetBtn.addEventListener('click', () => {
            document.location.pathname = "course-work-js";
            localStorage.setItem('auth', "false");
        })
        editBtn.forEach(e => {
            e.addEventListener('click', () => {
                openModal('edit-req');
                isModalOpened = true;
            })
        });
    } else {
        cabinetBtn.addEventListener('click', () => {
            openModal();
            isModalOpened = true;
        })
    }
    document.addEventListener('click', function (e) {
        if (!isModalOpened) {
            return;
        }
        if (!e.target.closest("form") && (!e.target.closest("button"))) {
            closeModal();
        }
    });
    document.addEventListener('keydown', function (e) {
        if(e.keyCode === 27) {
            closeModal();
        }
    }); 

    sendRequestBtns.forEach(e => {
        e.addEventListener('click', () => {
            openModal('req')
            isModalOpened = true;
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
        if (login !== adminLogin && pass !== adminPass) {
            invalidLogin.style.display = "block";
            formBtn.style.cursor = "default"
            formBtn.disabled = "true"
            loginInput.value = ""
            passwordInput.value = ""
            setTimeout(hideInvalid, 3000);
            return;
        }
        if (login === adminLogin && pass === adminPass) {
            document.location.pathname = "/course-work-js/requests.html"
            localStorage.setItem('auth', 'true')
        
        }
        
        
        
    }
    loginForm.addEventListener('submit', checkValues)

}