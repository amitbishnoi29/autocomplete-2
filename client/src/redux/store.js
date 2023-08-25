import { configureStore } from '@reduxjs/toolkit';
import suggestionReducer from './suggestionReducer';
import detailsReducer from './detailsReducer';

const store = configureStore({
  reducer: {
    suggestions: suggestionReducer,
    details: detailsReducer
  },
});

export default store;
