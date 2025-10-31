import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from './root-saga';
import authReducer from './auth/auth-slice';
import salonReducer from './salon/salon-slice';
import branchReducer from './branch/branch-slice';
import staffReducer from './staff/staff-slice';

const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
  reducer: {
    auth: authReducer,
    salon: salonReducer,
    branch: branchReducer,
    staff: staffReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
