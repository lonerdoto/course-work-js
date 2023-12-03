"use strict"
import { getData } from "./getServerData.js"
import { renderItems } from "./render.js"

const filter = () => {
    const placeHolder = document.getElementById("input");
    placeHolder.oninput = async (ev) => {
        let value = ev.target.value.trim();
        console.log(value)
        const data = await getData();
        console.log(data)

        let sort_data = [];
        

        if (value) {
            data.forEach(el => {
                if (el.id.search(value) != -1) {
                    sort_data.push(el);
                }
            });
            await renderItems(sort_data)
        } else {
            await renderItems(data);
        }
    }

    

}

export {filter}