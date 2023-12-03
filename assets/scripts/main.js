import { renderCards } from "./modules/cards.js";
import { redirectLogo } from "./modules/logo-redirect.js";
import { auth, controlModal } from "./modules/modal.js";
import { getData } from "./modules/getServerData.js";
import {renderItems} from "../scripts/modules/render.js";
import { formControl} from "./modules/starting.js";
import {filter} from "../scripts/modules/filter.js";

let addProductBtn = document.querySelector(".add-product-btn");
let popup = document.querySelector(".modal-edit");
let closeBtn = document.querySelector(".pop-up__close");
const form = document.querySelector(".form ");
const data = await getData();

const init = async () => {
	popupControl(addProductBtn, closeBtn, popup);
	await renderItems();
	formControl(form, data);
	filter();
}

if (document.location.pathname == 'course-work-js') {
    if (localStorage.getItem('auth') == "true") {
        document.location.pathname = "course-work-js/requests.html";
        init();
    } else {
        formControl(form, data);
        renderCards();
        auth();
    }
}  else if (document.location.href == 'course-work-js/access-denied.html') {
    auth();
} else {
    init();
}

controlModal();
redirectLogo();

export {data, popup}