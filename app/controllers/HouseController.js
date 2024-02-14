import { AppState } from "../AppState.js";
import { House } from "../models/House.js";
import { api } from "../services/AxiosService.js";
import { houseService } from "../services/HouseService.js";
import { getFormData } from "../utils/FormHandler.js";
import { Pop } from "../utils/Pop.js";
import { setHTML } from "../utils/Writer.js";

function _drawHouses() {
    const houses = AppState.houses
    let htmlString = ''
    houses.forEach(house => htmlString += house.HouseListTemplate)
    setHTML('HouseList', htmlString)
}

function _drawOpenHouse() {
    const house = AppState.activeHouse
    if(!house){
        setHTML('activeHouse', '')
        return
    }
    setHTML('activeHouse', house.ActiveHouseCardTemplate)
}

function _drawHouseForm() {
    if (!AppState.account) {
      return
    }
  
    const houseFormElement = document.getElementById('houseForm')
  
    if (!houseFormElement) {
      return
    }
  
    houseFormElement.classList.remove('d-none')
  }

export class HouseController {
    constructor() {
        // NOTE checking if the controller is set by the constructor. 
        console.log('House Controller has been set.');
        
        // NOTE will grab the class getHouses()
        this.getHouses()
        AppState.on('houses', _drawHouses)
        AppState.on('activeHouse', _drawOpenHouse)
        AppState.on('account', _drawHouses)
        AppState.on('account', _drawHouseForm)
    }
    
    //REVIEW - async is a technique that enables your program to start a potentially long-running task and still be able to be responsive to other events while that task runs, rather than having to wait until that task is finished.
    async getHouses() {
        try {
            await houseService.getHouses()
            Pop.success('Houses are grabbed.')
        } catch (error) {
            console.error(error)
            Pop.error(error)
        }
    }
    
    openHouse(id) {
        houseService.openHouse(id)
    }
    
    closeHouse() {
        houseService.closeHouse()
    }
    
    async createHouse() {
        try {
            event.preventDefault()
            const form = event.target
            const houseFormData = getFormData(form)
            await houseService.createHouse(houseFormData)
            form.reset()
        } catch (error) {
            console.log(error)
            Pop.error(error)
        }
    }
    
    async deleteHouse(id) {
        try {
            const wantsToRemove = await Pop.confirm('Are you sure you want to delete?')
            if(!wantsToRemove) {
                return
            }
            await houseService.deleteHouse(id)
        } catch (error) {
            console.error()
            Pop.error(error)
        }
    }
}