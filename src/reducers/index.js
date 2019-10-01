
const initialState = {
  isLoggedIn: false,
  loginName: '',
  userId: '',
  ingredients: [],
  loading: true,
  error: null,
  cartItems: [],
  orderTotal: 0,
  historyItems: [],
  historyDetailsItems: [],
  messageForModalWindow: '',
};


const updateCartItems = (cartItems, item, idx) => {
  if (item.count === 0) {
    return [
      ...cartItems.slice(0, idx),
      ...cartItems.slice(idx + 1),
    ];
  }

  if (idx === -1) {
    return [
      ...cartItems,
      item,
    ];
  }

  return [
    ...cartItems.slice(0, idx),
    item,
    ...cartItems.slice(idx + 1),
  ];
};

const updateTotalOrder = (ingredient, orderTotal, quantity) => orderTotal + quantity
  * ingredient.timeCook;

const updateCartItem = (ingredient, item, quantity) => {
  if (item) {
    return {
      ...item,
      count: item.count + quantity,
      time: item.time + quantity * ingredient.timeCook,
    };
  }
  return {
    id: ingredient.id,
    name: ingredient.name,
    count: 1,
    time: ingredient.timeCook,
  };
};

const updateOrder = (state, ingredientId, quantity) => {
  const { ingredients, cartItems, orderTotal } = state;
  const ingredient = ingredients.find((e) => e.id === ingredientId);

  const itemIndex = cartItems.findIndex((e) => e.id === ingredientId);
  const item = cartItems[itemIndex];
  const newItem = updateCartItem(ingredient, item, quantity);

  return {
    ...state,
    cartItems: updateCartItems(cartItems, newItem, itemIndex),
    orderTotal: updateTotalOrder(ingredient, orderTotal, quantity),
  };
};

const checkAuth = (state) => {
  const id = localStorage.getItem('userId');
  const login = localStorage.getItem('loginName');
  if (login && id) {
    return {
      ...state,
      loginName: login,
      userId: id,
      isLoggedIn: true,
    };
  } return state;
};

const reducer = (state = initialState, action) => {
  let item;
  switch (action.type) {
    case 'POST_USER_CREATE':
      return {
        ...state,
        messageForModalWindow: action.payload,
      };

    case 'POST_LOGIN_SUCCESS':
      localStorage.setItem('userId', action.payload[1]);
      localStorage.setItem('loginName', action.payload[0]);
      return {
        ...state,
        loginName: action.payload[0],
        userId: `${action.payload[1]}`,
        isLoggedIn: true,
        messageForModalWindow: 'Теперь вы можете сделать заказ',
        loading: false,
        error: null,
      };

    case 'CHECK_AUTHENTICATION_FROM_LOCAL_STORAGE':
      return checkAuth(state);

    case 'POST_LOGIN_FAILURE':
      return {
        ...state,
        loginName: '',
        isLoggedIn: false,
        loading: false,
        error: action.payload,
      };

    case 'POST_LOGIN_WRONG':
      return {
        ...state,
        messageForModalWindow: action.payload,
      };

    case 'FETCH_LOG_OUT':
      localStorage.clear();
      return {
        ...state,
        loginName: '',
        isLoggedIn: false,
      };

    case 'FETCH_INGREDIENTS_REQUEST':
      return {
        ...state,
        ingredients: [],
        loading: true,
        error: null,
      };

    case 'FETCH_INGREDIENTS_SUCCESS':
      return {
        ...state,
        ingredients: action.payload,
        loading: false,
        error: null,
      };

    case 'FETCH_INGREDIENTS_FAILURE':
      return {
        ...state,
        ingredients: [],
        loading: false,
        error: action.payload,
      };

    case 'FETCH_HISTORY_ITEMS_REQUEST':
      return {
        ...state,
        historyItems: [],
        loading: true,
        error: null,
      };

    case 'FETCH_HISTORY_ITEMS_SUCCESS':
      return {
        ...state,
        historyItems: action.payload,
        loading: false,
        error: null,
      };

    case 'FETCH_HISTORY_ITEMS_FAILURE':
      return {
        ...state,
        historyItems: [],
        loading: false,
        error: action.payload,
      };

    case 'FETCH_HISTORY_DETAILS_ITEMS_SUCCESS':
      return {
        ...state,
        historyDetailsItems: action.payload,
      };

    case 'MAKE_NEW_ORDER_REQUEST':
      return {
        ...state,
        cartItems: [],
        orderTotal: 0,
        messageForModalWindow: `Ваш заказ № ${action.payload} отрпавлен в обработку`,
      };

    case 'MAKE_NEW_ORDER_SUCCESS':
      return {
        ...state,
        messageForModalWindow: `Заказ № ${action.payload} готов `,
      };

    case 'MAKE_NEW_ORDER_FAILURE':
      return {
        ...state,
        cartItems: [],
        error: action.payload,
      };

    case 'MODAL_WINDOW_SHOULD_CLOSE':
      return {
        ...state,
        messageForModalWindow: '',
      };

    case 'INGREDIENT_ADDED_TO_CART':
      return updateOrder(state, action.payload, 1);

    case 'INGREDIENT_REMOVED_FROM_CART':
      return updateOrder(state, action.payload, -1);

    case 'ALL_INGREDIENTS_REMOVED_FROM_CART':
      item = state.cartItems.find(({ id }) => id === action.payload);
      return updateOrder(state, action.payload, -item.count);

    default:
      return state;
  }
};

export default reducer;
