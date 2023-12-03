"use strict"


const itemList = document.querySelector(".tbody");
const preloader = document.querySelector('.services__preloader')
const createItemRow = (item) => {
	console.log(item);
	const tr = document.createElement("tr");
	tr.classList.add("item");
	const id = document.createElement("td");
	id.classList.add("id");
	tr.append(id);
	const date = document.createElement("td");
	date.classList.add("date");
	tr.append(date);
	const fio = document.createElement("td");
	fio.classList.add("name");
	tr.append(fio);
	const technique = document.createElement("td");
	technique.classList.add("technique");
	tr.append(technique);
	const malfunction = document.createElement("td");
	malfunction.classList.add("work_performed");
	tr.append(malfunction);
	const tel = document.createElement("td");
	tel.classList.add("count");
	tr.append(tel);
	const status = document.createElement("td");
	status.classList.add("status");
	tr.append(status);
	const sum = document.createElement("td");
	sum.classList.add("sum");
	tr.append(sum);
	const image1 = document.createElement("td");
	const image2 = document.createElement("td");
	const editIcon = document.createElement("img");
	image2.classList.add("editIcon");
	editIcon.src="assets/img/akar-icons_edit.svg";
	image2.append(editIcon);
	tr.append(image2);
	const image3 = document.createElement("td");
	const deleteIcon = document.createElement("img");
	image3.classList.add("deleteIcon");
	deleteIcon.src="assets/img/ant-design_delete-outlined.svg";
	image3.append(deleteIcon);
	tr.append(image3);
	itemList.append(tr);
	id.textContent= item.id;
	date.textContent= item.date;
	fio.textContent= item.fio;
	technique.textContent= item.technique;
	malfunction.textContent= item.malfunction;
	tel.textContent= item.tel;
	status.textContent= item.status;
	sum.textContent= item.sum;
	preloader.style.display = "none"
	return tr;
};


export {createItemRow};