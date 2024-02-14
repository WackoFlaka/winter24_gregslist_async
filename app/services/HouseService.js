import { AppState } from "../AppState.js"
import { House } from "../models/House.js"
import { api } from "./AxiosService.js"

class HouseService {
    async getHouses() {
        console.log('Houses on the way...')
        const response = await api.get('api/houses')
        console.log('Recieved Houses: ', response.data)
        const newHouses = response.data.map(housePOJO => new House(housePOJO))
        newHouses.reverse()
        AppState.houses = newHouses
    }
    
    openHouse(id) {
        const foundHouse = AppState.houses.find(house => house.id == id)
        AppState.activeHouse = foundHouse
    }
    
    closeHouse() {
        AppState.activeHouse = null
    }
    
    async createHouse(houseFormData) {
        const response = await api.post('api/houses', houseFormData)
        const newHouse = new House(response.data)
        AppState.houses.unshift(newHouse)
    }
    
    async deleteHouse(id) {
        const response = await api.delete(`api/houses/${id}`)
        const index = AppState.houses.findIndex(house => house.id == id)
        if(index == -1) {
            throw new Error('Index was -1, youo messed up')
        }
        AppState.houses.splice(id, 1)
    }
}

export const houseService = new HouseService()