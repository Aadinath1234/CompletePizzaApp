import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { getAllPizzaReducer,addPizzaReducer,getPizzaByIdReducer,updatePizzaByIdReducer } from "./reducers/pizzaReducer";
import { cartReducer } from "./reducers/cartReducer";
import { registerUserReducer, loginUserReducer ,getAllUsersReducer} from "./reducers/userReducer";
import { placeOrderReducer,getUserOrdersReducer,allUserOrdersReducer } from "./reducers/orderReducer";





const rootReducer = combineReducers({
  getAllPizzaReducer: getAllPizzaReducer,
  cartReducer: cartReducer,
  registerUserReducer: registerUserReducer,
  loginUserReducer: loginUserReducer,
  placeOrderReducer:placeOrderReducer,
  getUserOrdersReducer:getUserOrdersReducer,
  addPizzaReducer:addPizzaReducer,
  getPizzaByIdReducer:getPizzaByIdReducer,
  updatePizzaByIdReducer:updatePizzaByIdReducer,
  allUserOrdersReducer:allUserOrdersReducer,
  getAllUsersReducer:getAllUsersReducer,

 
});

const cartItemsKey = "cartItems";
let cartItemsJson = localStorage.getItem(cartItemsKey);

let cartItems = [];
try {
  cartItems = JSON.parse(cartItemsJson);
} catch (error) {
  console.error("Error parsing cartItems from localStorage", error);
}




const currentUser = localStorage.getItem("currentUser")
  ? JSON.parse(localStorage.getItem("currentUser"))
  : null;





const initialState = {
  cartReducer: {
    cartItems: cartItems,
  },
  loginUserReducer:{
    currentUser:currentUser,
  },
};
const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
export default store;
