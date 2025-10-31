import { all, fork } from 'redux-saga/effects';
import { watchAuthSaga } from './auth/auth-saga';
import { watchSalonSaga } from './salon/salon-saga';
import { watchBranchSaga } from './branch/branch-saga';
import { watchStaffSaga } from './staff/staff-saga';

export function* rootSaga() {
  yield all([
    fork(watchAuthSaga),
    fork(watchSalonSaga),
    fork(watchBranchSaga),
    fork(watchStaffSaga),
  ]);
}
