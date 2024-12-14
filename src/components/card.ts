import Image from './Image'

interface ILocation {
    name: string,
    address: string,
    link: string,
}

interface ICard {
    src: string,
    title: string,
    category: string,
    availableDate: string,
    ageRestriction: string,
    reviewText: string,
    locations: Array<ILocation>,
}

const Card = ({ src, title, category, availableDate, ageRestriction, reviewText, locations}:ICard):string => {
    return `
     <div class="card_left">
         ${Image({src, title})}
     </div>
     <div class="card_right">
         <h3 class="card__title">${title}</h3>

         <ul class="card__details list-reset">
             <li class="card__category">${category}</li>
             <li class="card__available-date">${availableDate}</li>
             <li class="card__age-restriction">${ageRestriction}</li>
         </ul>

         <div class="card__review">
             <p class="card__review-text">${reviewText}</p>
             <ul class="card__event-locations list-reset">
                ${
                    locations.map(location => `<li class="card__event-location">${location.name}</li>`).join('\n')
                }
             </ul>
         </div>
     </div>
    `
}

export default Card;