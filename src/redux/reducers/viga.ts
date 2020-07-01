const initialState = {
  length: 0,
};

const vigaReducer = (state = initialState, action: ActionVigaReducer) => {
  switch (action.type) {
    case 'SET_LENGTH': {
      return {...state, length: action.payload?.length};
    }
    default: {
      return {...state};
    }
  }
};

export default vigaReducer;

export interface VigaReducer {
  length: number;
}

export interface ActionVigaReducer {
  type: string;
  payload?: {
    length: number;
  };
}
