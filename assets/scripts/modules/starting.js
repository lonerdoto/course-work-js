"use strict";


import { popup } from "../main.js";
import { getData, createGoods, deleteGoods, editGoods, getGoods } from "../modules/getServerData.js";
import { closeModal, openModal, controlModal } from "./modal.js";

const itemList = document.querySelector(".tbody");
const data = await getData();


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
			let itemJson = { 'tel': newItem.telnumber, 'fio': newItem.fio, 'technique': newItem.technique, 'malfunction': newItem.malfunction, 'date': newItem.date, 'status': 'Не рассмотрена', 'sum': '0' };
			closeModal();
			openModal("sended-req");
			setTimeout(closeModal, 3000)
			setTimeout(async () => {
				await createGoods(JSON.stringify(itemJson));
				e.target.reset();
			}, 3000);
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


const editItemsFunction = () => {
	const status = document.querySelector(".textarea-status");
	const sum = document.querySelector(".textarea-sum");
	const statusInput = document.querySelector('.status-input')
	const editIcons = document.querySelectorAll(".editIcon");
	const submitBtn = document.querySelector(".footer__btn");
	const sumInput = document.querySelector('.sum-input')

	controlModal();

	editIcons.forEach(icon => {
		icon.addEventListener("click", async e => {
			const target = e.target;
			let item = await getGoods(target.closest(".item").querySelector('.id').innerHTML);

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





export { formControl, editItemsFunction }
