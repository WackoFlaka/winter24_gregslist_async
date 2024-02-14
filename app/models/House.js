import { AppState } from "../AppState.js"

export class House {
    constructor(data) {
        this.id = data.id || data._id
        this.bedrooms = data.bedrooms
        this.bathrooms = data.bathrooms
        this.levels = data.levels
        this.imgUrl = data.imgUrl
        this.year = data.year
        this.price = data.price
        this.description = data.description
        this.createdAt = data.createdAt
        this.creatorId = data.creatorId
        this.creator = data.creator
    }
    
    get HouseListTemplate() {
        return /*html*/ `
         <div class="col-3 pt-5">
        <div class="card" style="width: 18rem;">
            <img src=${this.imgUrl} class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">Price: $${this.price}</h5>
              <p class="card-text">${this.description}</p>
              <a class="btn btn-primary" onclick="app.HouseController.openHouse('${this.id}')">View</a>
                ${this.DeleteButton}
            </div>
          </div>
    </div>
        `
    }
    
    get DeleteButton() {
        if (AppState.account == null || this.creatorId != AppState.account.id) {
          return ''
        }
    
        return `<a class="btn btn-warning" onclick="app.HouseController.deleteHouse('${this.id}')">Delete</a>`
      }
    
    
    get ActiveHouseCardTemplate() {
        return /*html*/ `
        <div class="home-card">
    <div>
        <h1 class="home-card-title">House</h1>
        <span class="mdi mdi-window-close text-white closeHouse" onclick="app.HouseController.closeHouse()"></span>
        <img src="${this.imgUrl}" alt="" class="home-card-img">
    </div>
    <div class="row justify-content-evenly align-items-center pt-5">
        <!-- NOTE details like year/price/bedrooms/levels/bathroos-->
        <div class="col-5 fs-5">
            <p><span class="mdi mdi-calendar-blank"></span>Year: ${this.year}</p>
            <p><span class="mdi mdi-currency-usd"></span>Price: $${this.price}</p>
            <p><span class="mdi mdi-bed-empty"></span>Bedrooms: ${this.bedrooms}</p>
            <p><span class="mdi mdi-toilet"></span>Bathrooms: ${this.bathrooms}</p>
            <p><span class="mdi mdi-home"></span>Levels: ${this.levels}</p>
        </div>
        
        <div class="col-5 fs-5">
            <p><img src="${this.creator.picture}" alt="" class="home-card-icon me-5">Listed by: ${this.creator.name}</p>
            <p>Listed on: ${this.createdAt}</p>
            <p>${this.description}</p>
        </div>
    </div>
</div>
        `
    }
}