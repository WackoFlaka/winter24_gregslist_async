import { AccountController } from "./controllers/AccountController.js";
import { CarsController } from "./controllers/CarsController.js";
import { HouseController } from "./controllers/HouseController.js";
import { AuthGuard } from "./services/AuthService.js";
import { Router } from "./utils/Router.js";


export const router = new Router([
  {
    path: '',
    controllers: [],
    view: /*html*/`
    <div class="container">
      <section class="row">
        <div class="col-12">
          <h1 class="m-3">Welcome to Gregslist</h1>
        </div>
      </section>
    </div>
    `
  },
  {
    path: '#/cars',
    controllers: [CarsController],
    view: 'app/views/CarsView.html'
  },
  {
    path: '#/houses',
    controllers: [HouseController],
    view: 'app/views/HousesView.html'
  },
  {
    path: '#/account',
    middleware: [AuthGuard],
    controllers: [AccountController],
    view: 'app/views/AccountView.html',
  }
])




