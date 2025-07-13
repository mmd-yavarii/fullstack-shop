// reducer and initial state for dispatchForm
const addProductInitialState = {
  title: '',
  description: '',
  category: '',
  qty: 0,
  price: 0,
  discount: 0,
  images: [],
};

function addProducReducer(state, action) {
  switch (action.type) {
    case 'TITLE':
      return { ...state, title: action.payload };

    case 'DESCRIPTION':
      return { ...state, description: action.payload };

    case 'CATEGORY':
      return { ...state, category: action.payload };

    case 'QTY':
      return { ...state, qty: action.payload };

    case 'PRICE':
      return { ...state, price: action.payload };

    case 'DISCOUNT':
      return { ...state, discount: action.payload };

    case 'IMAGES':
      return { ...state, images: [...state.images, action.payload] };
  }
}

export { addProductInitialState, addProducReducer };
