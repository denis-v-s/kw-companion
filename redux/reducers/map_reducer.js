const INITIAL_STATE = {
  randomMap: null
};

const mapReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'GET_RANDOM_MAP': {
      return {
        ...state,
        randomMap: action.randomMap
      }
    }

    default: {
      return state;
    }
  }
}

export default mapReducer;
