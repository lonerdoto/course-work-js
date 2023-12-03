"use strict";


import { popup } from "../main.js";
import { setStorage, clearStorage } from "../modules/localStorage.js"
import { createItemRow } from "./addEl.js";
import { getData, createGoods, deleteGoods, editGoods, getGoods } from "../modules/getServerData.js";
import { lastPageItems, renderItems } from "../modules/render.js";
import { closeModal, openModal, controlModal } from "./modal.js";

const itemList = document.querySelector(".tbody");

const data = await getData();

const popupControl = (addProductBtn, closeBtn, popup) => {
	const name = document.querySelector(".textarea-name");
	const category = document.querySelector(".textarea-category");
	const units = document.querySelector(".textarea-units");
	const discount = document.querySelector(".textarea-discount");
	const description = document.querySelector(".textarea-description");
	const count = document.querySelector(".textarea-amount");
	const price = document.querySelector(".textarea-price");
	const footerSum = document.querySelector(".footer-sum");
	const checkbox = document.querySelector(".checkbox");
	const previewImg = document.querySelector('.preview-img');
	const imgError = document.querySelector('.img_error');
	const addImgBtn = document.querySelector('.add-img');

	// addProductBtn.addEventListener('click', e => {
	// 	const url = 'https://playful-ubiquitous-sloth.glitch.me/';
	// 	const nameInput = document.querySelector('.name-input')
	// 	const categoryInput = document.querySelector('.category-input')
	// 	const unitsInput = document.querySelector('.units-input')
	// 	const discountInput = document.querySelector('.discount-input')
	// 	const right = document.querySelector('.right')
	// 	const footer__sum = document.querySelector('.footer__sum')
	// 	const preview_img = document.querySelector('.preview-img')
	// 	nameInput.style.display = 'block';
	// 	categoryInput.style.display = 'block';
	// 	unitsInput.style.display = 'block';
	// 	discountInput.style.display = 'block';
	// 	right.style.display = 'block';
	// 	footer__sum.style.display = 'block';
	// 	preview_img.style.width = '100px'
	// 	popup.classList.add("active");
	// 	e.stopPropagation();
	// });
	closeBtn.addEventListener('click', () => {
		name.value = "";
		category.value = "";
		units.value = "";
		discount.value = "";
		description.value = "";
		count.value = "";
		price.value = "";
		footerSum.value = "";
		previewImg.src = "";
		previewImg.style.display = 'none';
		imgError.style.display = "none";
		addImgBtn.value = '';
		checkbox.checked = false;

		popupClose();
	});
};

const popupClose = () => {
	const popup = document.querySelector(".edit__container")
	popup.style.display = "none"
	popup.querySelector(".pop-up__title").innerHTML = "Добавить товар";
	popup.querySelector('.footer__btn').innerHTML = "Добавить товар";
};

const increment = () => {
	return data.length + 1;
};

function ValidName(myName) {
	let re = /^[а-я ,.'-]+$/i;
	let valid = re.test(myName);
	return valid;
}
function ValidPhone(myPhone) {
	let re = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/;
	let valid = re.test(myPhone);
	return valid;
}

const formControl = (form, data) => {
	console.log(form)
	const form_name = document.querySelector('.form__header');
	const formButton = document.querySelector('.request__form-btn')
	const numberInput = document.querySelector('.number__input')
	const fioInput = document.querySelector('.fio__input')
	const techniqueInput = document.querySelector('.technique__input')
	const textareaInput = document.querySelector('.textarea__input')
	const invalidTel = document.querySelector('.modal__invalid-tel')
	const invalidName = document.querySelector('.modal__invalid-name')

	const hideInvalid = () => {
		formButton.style.cursor = "pointer"
		formButton.disabled = ""
		numberInput.style.border = "2px solid var(--main-first-color)"
		fioInput.style.border = "2px solid var(--main-first-color)"
		invalidTel.style.display = "none";
		invalidName.style.display = "none";
	}
	if (document.location.href.includes('index.html') || document.location.href.includes('course-work.html')) {
		form.addEventListener("submit", async e => {
			e.preventDefault();
			const formData = new FormData(e.target);
			const newItem = Object.fromEntries(formData);
			if (!ValidPhone(numberInput.value)) {
				console.log('cyka');
				invalidTel.style.display = "block";
				numberInput.style.border = "3px solid red"
				formButton.style.cursor = "default";
				formButton.disabled = "true";
				setTimeout(hideInvalid, 3000);
				return;
			}
			if (!ValidName(fioInput.value)) {
				invalidName.style.display = "block";
				fioInput.style.border = "3px solid red"
				formButton.style.cursor = "default";
				formButton.disabled = "true"
				setTimeout(hideInvalid, 3000);
				return;
			}
			let itemJson = { 'tel': newItem.telnumber, 'fio': newItem.fio, 'technique': newItem.technique, 'malfunction': newItem.malfunction,  'date': newItem.date, 'status': 'Не рассмотрена', 'sum': '0'};
			closeModal();
			openModal("sended-req");
			setTimeout(closeModal, 3000)
			setTimeout(async () => {
				await createGoods(JSON.stringify(itemJson));
				e.target.reset();
			}, 3000);
			console.log(itemJson);

		})
	} else {
		form.addEventListener("submit", async e => {
			e.preventDefault();
			if (form_name.innerHTML.includes("Редактировать")) {
				return;
			}
			const formData = new FormData(e.target);
			const newItem = Object.fromEntries(formData);

			let itemJson = { 'tel': newItem.telnumber, 'fio': newItem.fio, 'technique': newItem.technique, 'malfunction': newItem.malfunction };
			closeModal();


			createGoods(JSON.stringify(itemJson));
			e.target.reset();
		


		})
	}


};


const addItem = (item, itemList) => {
	itemList.append(createItemRow(item));
};

const deleteFunction = () => {
	const deleteIcons = document.querySelectorAll(".deleteIcon");
	deleteIcons.forEach(icon => {
		icon.addEventListener("click", async (e) => {

			e.preventDefault();
			e.stopPropagation();
			const target = e.target;
			await deleteGoods(target.parentNode.parentNode.querySelector('.id').innerHTML);
			await renderItems();
		});
	});
};


const getImageFromServer = async (path) => {

	const data = await fetch(url + path, {
		method: 'GET',
		mode: 'no-cors',
	});

}

const editItemsFunction = () => {
	const previewImg = document.querySelector('.preview-img');
	const status = document.querySelector(".textarea-status");
	const sum = document.querySelector(".textarea-sum");
	const units = document.querySelector(".textarea-units");
	const discount = document.querySelector(".textarea-discount");
	const description = document.querySelector(".textarea-description");
	const count = document.querySelector(".textarea-amount");
	const price = document.querySelector(".textarea-price");
	const statusInput = document.querySelector('.status-input')
	const addImg = document.querySelector(".add-img")
	const imgError = document.querySelector('.img_error');
	const url = 'https://playful-ubiquitous-sloth.glitch.me/';
	const editIcons = document.querySelectorAll(".editIcon");
	const submitBtn = document.querySelector(".footer__btn");
	const footerSum = document.querySelector(".footer-sum");
	const checkbox = document.querySelector(".checkbox");
	const sumInput = document.querySelector('.sum-input')
	const unitsInput = document.querySelector('.units-input')
	const discountInput = document.querySelector('.discount-input')
	const right = document.querySelector('.right')
	const footer__sum = document.querySelector('.footer__sum')
	controlModal();

	editIcons.forEach(icon => {
		icon.addEventListener("click", async e => {
			const target = e.target;
			let item = await getGoods(target.closest(".item").querySelector('.id').innerHTML);
			console.log(item);
			e.preventDefault();
			e.stopPropagation();
			statusInput.style.display = 'flex';
			sumInput.style.display = 'flex';

			popup.style.display = "block"
			popup.querySelector(".form__header").innerHTML = `Редактировать заявку клиента ${item.fio}`;
			popup.querySelector('.footer__btn').innerHTML = "Редактировать";


			status.value = item.status;
			sum.value = item.sum;



			submitBtn.addEventListener("click", async (e) => {
				// if (price.value == '' || name.value == '' || category.value == '' || parseInt(discount.value) > 99) {
				// 	formMsg.innerHTML = '<p class="error__text">Ошибка. Проверьте правильность заполнения полей</p>';
				// 	setTimeout(() => {
				// 		formMsg.innerHTML = '';
				// 	}, 3000);
				// 	return;
				// }
				item.id = item.id;
				item.status = status.value;
				item.sum = sum.value;
				
				let jsonItem = { 'tel': item.telnumber, 'fio': item.fio, 'technique': item.technique, 'malfunction': item.malfunction, 'date': item.date, 'status': item.status, 'sum': item.sum }


				await editGoods(item.id, JSON.stringify(jsonItem));

				location.reload()
			});
			;
		});
	});
};


const changeToNumber = e => {
	const value = e.value;
	e.value = value.replace(/\D/g, '');
};
const removeSpace = e => {
	if (e.value.charAt(0) == ' ') {
		e.value = "";
	}
}


export { popupControl, popupClose, increment, formControl, addItem, deleteFunction, editItemsFunction, removeSpace, changeToNumber }
