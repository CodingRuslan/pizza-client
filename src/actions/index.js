import io from 'socket.io-client/dist/socket.io';
import PizzaService from '../services/pizza-service';

const pizzaService = new PizzaService();

const registrationUser = (data) => ({
  type: 'POST_USER_CREATE',
  payload: data,
});

export const checkAuthenticationFromLocalStorage = () => ({
  type: 'CHECK_AUTHENTICATION_FROM_LOCAL_STORAGE',
});

const correctLogin = (...args) => ({
  type: 'POST_LOGIN_SUCCESS',
  payload: args,
});

const wrongLogin = () => ({
  type: 'POST_LOGIN_WRONG',
  payload: 'Неправильный логин или пароль',
});

export const logOut = () => ({
  type: 'FETCH_LOG_OUT',
});

const loginError = (error) => ({
  type: 'POST_LOGIN_FAILURE',
  payload: error,
});

const ingredientsRequested = () => ({
  type: 'FETCH_INGREDIENTS_REQUEST',
});

const ingredientsLoaded = (newIngredients) => ({
  type: 'FETCH_INGREDIENTS_SUCCESS',
  payload: newIngredients,
});

const ingredientsError = (error) => ({
  type: 'FETCH_INGREDIENTS_FAILURE',
  payload: error,
});

const historyItemsRequested = () => ({
  type: 'FETCH_HISTORY_ITEMS_REQUEST',
});

const historyItemsLoaded = (newHistoryItems) => ({
  type: 'FETCH_HISTORY_ITEMS_SUCCESS',
  payload: newHistoryItems,
});

const historyItemsError = (error) => ({
  type: 'FETCH_HISTORY_ITEMS_FAILURE',
  payload: error,
});

const historyDetailsItemsLoaded = (newHistoryItems) => ({
  type: 'FETCH_HISTORY_DETAILS_ITEMS_SUCCESS',
  payload: newHistoryItems,
});

const orderPlaced = (orderId) => ({
  type: 'MAKE_NEW_ORDER_REQUEST',
  payload: orderId,
});

const orderIsReady = (newOrder) => ({
  type: 'MAKE_NEW_ORDER_SUCCESS',
  payload: newOrder,
});

const orderError = (error) => ({
  type: 'MAKE_NEW_ORDER_FAILURE',
  payload: error,
});

export const ingredientAddedToCart = (ingredientId) => ({
  type: 'INGREDIENT_ADDED_TO_CART',
  payload: ingredientId,
});

export const ingredientRemoveFromCart = (ingredientId) => ({
  type: 'INGREDIENT_REMOVED_FROM_CART',
  payload: ingredientId,
});

export const allIngredientRemoveFromCart = (ingredientId) => ({
  type: 'ALL_INGREDIENTS_REMOVED_FROM_CART',
  payload: ingredientId,
});

const socket = io.connect('http://localhost:8080');

const fetchIngredients = () => (dispatch) => {
  dispatch(ingredientsRequested());
  pizzaService.getIngredients()
    .then((e) => dispatch(ingredientsLoaded(e)))
    .catch((err) => dispatch(ingredientsError(err)));
};

const fetchHistoryItems = (userId) => (dispatch) => {
  dispatch(historyItemsRequested());
  pizzaService.getHistoryItems(userId)
    .then((e) => dispatch(historyItemsLoaded(e)))
    .catch((err) => dispatch(historyItemsError(err)));
};

const fetchHistoryDetailsItems = (orderId) => (dispatch) => {
  pizzaService.getHistoryDetailsItems(orderId)
    .then((e) => dispatch(historyDetailsItemsLoaded(e)))
    .catch((err) => dispatch(historyItemsError(err)));
};

const fetchLogin = (login, pass) => (dispatch) => {
  pizzaService.logIn(login, pass)
    .then((e) => {
      if (e.data.login.length > 0) {
        dispatch(correctLogin(e.data.login, e.data.idusers));
      } else {
        dispatch(wrongLogin());
      }
    })
    .catch((err) => dispatch(loginError(err)));
};

const fetchRegistration = (login, pass) => (dispatch) => {
  pizzaService.registration(login, pass)
    .then((e) => {
      dispatch(registrationUser(e.data));
    })
    .catch((err) => dispatch(loginError(err)));
};

const fetchMakeOrder = (userId, cartItems, orderTotal) => (dispatch) => {
  pizzaService.makeOrder(userId, cartItems, orderTotal)
    .then((e) => {
      socket.emit('submitOrder', e.data);
      dispatch(orderPlaced(e.data));
      socket.on('orderIsReady', (id) => {
        dispatch(orderIsReady(id));
      });
    })
    .catch((err) => dispatch(orderError(err)));
};

export {
  fetchIngredients,
  fetchHistoryItems,
  fetchHistoryDetailsItems,
  fetchLogin,
  fetchRegistration,
  fetchMakeOrder,
};
