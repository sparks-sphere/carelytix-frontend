import { call, put, takeLatest } from 'redux-saga/effects';
import {
  loginRequest,
  loginSuccess,
  loginFailure,
  registerFailure,
  registerSuccess,
  registerRequest,
  getUserFailure,
  getUserSuccess,
  getUserRequest,
} from './auth-slice';
import { AxiosInstance } from '@/lib/axios';
import { ApiResponse } from '@/types/api-response';
import { AxiosError, AxiosResponse } from 'axios';
import { PayloadAction } from '@reduxjs/toolkit';

function* handleLoginUser(
  action: PayloadAction<{ email: string; password: string }>,
) {
  const { email, password } = action.payload;
  try {
    const response: AxiosResponse<ApiResponse> = yield call(() =>
      AxiosInstance.post<ApiResponse>('/auth/login-user', {
        email,
        password,
      }),
    );
    console.log('Login response:', response.data);
    if (response.data.success) {
      yield put(loginSuccess(response.data.data));
    } else {
      yield put(loginFailure('Login failed'));
    }
  } catch (error: any) {
    console.log(' error ', error);
    const axiosError = error as AxiosError<ApiResponse>;
    const errorMessage =
      axiosError.response?.data?.message ||
      axiosError.message ||
      'Login failed';
    yield put(loginFailure(errorMessage));
  }
}

function* handleRegisterUser(
  action: PayloadAction<{
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone?: string;
    salonName: string;
    salonSize: string;
  }>,
) {
  const { firstName, lastName, email, password, phone, salonName, salonSize } =
    action.payload;
  try {
    const response: AxiosResponse<ApiResponse> = yield call(() =>
      AxiosInstance.post<ApiResponse>('/auth/user-registration', {
        name: `${firstName} ${lastName}`,
        email,
        password: password,
        primaryContactNo: phone,
        userMeta: { salonName, salonSize },
      }),
    );

    if (response.data.success) {
      yield put(registerSuccess(response.data.data));
    }
  } catch (error) {
    console.log(' error ', error);
    const axiosError = error as AxiosError<ApiResponse>;
    const errorMessage =
      axiosError.response?.data?.message ||
      axiosError.message ||
      'Login failed';
    console.log(' error ', errorMessage);
    yield put(registerFailure(errorMessage));
  }
}
function* handleGetUser() {
  try {
    const response: AxiosResponse<ApiResponse> = yield call(() =>
      AxiosInstance.get<ApiResponse>('/auth/get-user', {
        withCredentials: true,
      }),
    );

    if (response.data.success) {
      console.log('response.data.data', response);
      yield put(getUserSuccess(response.data.data));
    } else {
      yield put(getUserFailure('Failed to fetch user'));
    }
  } catch (error: any) {
    const axiosError = error as AxiosError<ApiResponse>;
    const errorMessage =
      axiosError.response?.data?.message ||
      axiosError.message ||
      'Failed to fetch user';
    yield put(getUserFailure(errorMessage));
  }
}

export function* watchAuthSaga() {
  yield takeLatest(loginRequest.type, handleLoginUser);
  yield takeLatest(registerRequest.type, handleRegisterUser);
  yield takeLatest(getUserRequest.type, handleGetUser);
}
