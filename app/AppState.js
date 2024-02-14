import { Car } from './models/Car.js'
import { House } from './models/House.js'
import { EventEmitter } from './utils/EventEmitter.js'
import { createObservableProxy } from './utils/ObservableProxy.js'

class ObservableAppState extends EventEmitter {

  // NOTE user and account are needed for login / logout functionality. Leave them be
  user = null
  /**@type {import('./models/Account.js').Account | null} */
  account = null


  /**
   * @type {Car[]}
   * 
   */
  cars = []
  
  /**
   * @type {House[]}
   */
  
  houses = []
  
  activeHouse = null
}

export const AppState = createObservableProxy(new ObservableAppState())