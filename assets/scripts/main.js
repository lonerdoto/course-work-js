import { renderCards } from "./modules/cards.js";
import { redirectLogo } from "./modules/logo-redirect.js";
import { auth, controlModal } from "./modules/modal.js";

controlModal();
redirectLogo();
// renderCards();
// controlModal();

if (document.location.pathname === '/index.html' || document.location.pathname === '/course-work-js/') {
    if (localStorage.getItem('auth') == "true") {
        document.location.pathname = "/course-work-js/requests.html";
    } else {
        renderCards();
        auth();
    }
} 
