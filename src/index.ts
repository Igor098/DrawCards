import "./style.scss"
import axios from "axios";
import Card from "./components/card";
const root = document.getElementById("root")
const grid = document.createElement("div");
grid.classList.add("grid");

type IEvents = {
    events: Array<IEvent>;
}

type IEvent = {
    id: string
    idfull: string
    pref: string
    cat_id: string
    cat_url: string
    loc_id: string
    name: string
    date_start: string
    date_end: string
    logo: string
    logo_p: string
    anons: string
    is_free: string
    min_price: string
    max_price: string
    age: string
    vip: string
    places: []
}


async function getUsers() {
    const {data, status} =  await axios.get<IEvents>("http://localhost:8000/events/1011/?loc_id=1310&limit=20");
    console.log(data)
    console.log(status)
    return data
}

const data = getUsers()
data.then(el => {
    el.events.map(item =>{
        const card = document.createElement("div");
        card.classList.add("card")
        card.innerHTML = Card({src: item.logo, title: item.name, category: item.cat_id, availableDate: item.date_end, ageRestriction: item.age, reviewText: item.anons, locations: item.places})
        grid.appendChild(card)
        console.log(item)
    })
})

root?.appendChild(grid)
