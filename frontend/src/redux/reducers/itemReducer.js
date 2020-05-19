var item1Test = {
    name: "Widget",
    description: "An exquistite widget",
    price: 10.99,
    seller: "default",
    numTimeSold: 2,
    purchasers: [],
}

var item2Test = {
    name: "A shrubbery",
    description: "Who wouldn't want this?",
    price: 50,
    seller: "default",
    numTimeSold: 0,
    purchasers: [],
}

var item3Test = {
    name: "Yo-Yo",
    description: "It's a yoyo",
    price: 220,
    seller: "default",
    numTimeSold: 1,
    purchasers: ['admin'],
}

const DEFAULT_STATE = {
    name: "",
    desription: "",
    price: -1,
    seller: "",
    item : {
        name: "",
        description: "",
        price: -1,
        seller: "",
        numTimeSold: 1,
        purchasers: [],
    },
    items: [],
};

const itemReducer = (state = DEFAULT_STATE, action) => {
switch (action.type) {
    case 'ITEM_SET_ITEM':
        return {
            ...state,
            items: action.item,
        }
    case 'ITEM_SET_NAME':
        return {
            ...state,
            name: action.name,
        }
    case 'ITEM_SET_DESCRIPTION':
        return {
            ...state,
            description: action.description,
        }
    case 'ITEM_SET_PRICE':
        return {
            ...state,
            price: action.price,
        }
    case 'ITEM_ADD_ITEMS': 
        return { 
            ...state,
            items: [...state.items, state.item]
        }
    case 'ITEM_GET_ITEMS': 
        return { 
            ...state,
            items: action.items
        }
    default:
        return state;
    }
};

export default itemReducer;