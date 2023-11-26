export const redirectLogo = () => {
    const logo = document.querySelector('.header__logo-container');
    const changePath = () => {
        window.location.pathname = "/index.html";
    }
    logo.addEventListener('click', changePath)
    if (window.location.pathname.includes("index.html")) {
        logo.style.cursor = "default";
        logo.removeEventListener('click', changePath);
    }
}

