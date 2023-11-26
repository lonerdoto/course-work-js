import { renderCards } from "./modules/cards.js";
import { redirectLogo } from "./modules/logo-redirect.js";
import { auth, controlModal } from "./modules/modal.js";

controlModal();
redirectLogo();
// renderCards();
// controlModal();

if (document.location.pathname === '/index.html') {
    if (localStorage.getItem('auth') == "true") {
        document.location.pathname = "requests.html";
    } else {
        renderCards();
        auth();
    }
} 
