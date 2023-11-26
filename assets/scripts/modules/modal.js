export const controlModal = () => {
    const body = document.querySelector('body');
    const sendRequestBtns = document.querySelectorAll('.request-button');
    const requestModal = document.querySelector('.modal-request')
    const loginModal = document.querySelector('.modal-login')
    const closeBtns = document.querySelectorAll('.close-modal-btn')
    const cabinetBtn = document.querySelector('.header__cabinet')
    cabinetBtn.addEventListener('click', () => {
        loginModal.style.display = "block";
        body.classList.add("disable-scroll");
    })
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
