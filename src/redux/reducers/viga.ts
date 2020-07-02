const initialState: VigaReducer = {
  length: 0,
  elements: [],
};

const vigaReducer = (state = initialState, action: ActionVigaReducer) => {
  switch (action.type) {
    case 'SET_LENGTH': {
      return {...state, length: action.payload?.length};
    }

    case 'DEL_VIGA': {
      return {...initialState};
    }

    case 'EDIT_ELEMENT': {
      const editedElement = action.payload?.element;
      const selfIndex = action.payload?.selfIndex;

      const elements = [...state.elements];

      if (editedElement && typeof selfIndex === 'number') {
        elements.splice(selfIndex, 1, editedElement);

        return {...state, elements};
      }

      return {...state};
    }

    case 'ADD_ELEMENT': {
      const newElement = action.payload?.element;

      if (newElement) {
        return {...state, elements: state.elements.concat(newElement)};
      }

      return {...state};
    }

    case 'DEL_ELEMENT': {
      return {...state, elements: state.elements.filter(e => e.id !== action.payload?.elementID)};
    }

    default: {
      return {...state};
    }
  }
};

export default vigaReducer;

export type element = {
  id: string;
  type: string;
  specificType: string;
  customName: string;
  position: number;
  isActive: boolean;
};

export interface VigaReducer {
  length: number;
  elements: element[];
}

export interface ActionVigaReducer {
  type: string;
  payload?: {
    length: number;
    element: element;
    elementID: string;
    selfIndex: number;
  };
}
