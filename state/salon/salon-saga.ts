import { AxiosInstance } from '@/lib/axios';
import { ApiResponse } from '@/types/api-response';
import { AxiosError, AxiosResponse } from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';
import {
  fetchSalons,
  fetchSalonsSuccess,
  fetchSalonsFailure,
  fetchSalonById,
  fetchSalonByIdSuccess,
  fetchSalonByIdFailure,
  createSalon,
  createSalonSuccess,
  createSalonFailure,
  updateSalon,
  updateSalonSuccess,
  updateSalonFailure,
  deleteSalon,
  deleteSalonSuccess,
  deleteSalonFailure,
} from './salon-slice';
import { PayloadAction } from '@reduxjs/toolkit';

function* handleFetchSalons(): Generator<any, void, any> {
  try {
    const response: AxiosResponse<ApiResponse> = yield call(() =>
      AxiosInstance.get<ApiResponse>('/user/salon/get-all-salons'),
    );
    yield put(fetchSalonsSuccess(response.data.data.salons));
  } catch (error: any) {
    console.log('error', error);
    const axiosError = error as AxiosError<ApiResponse>;
    const errorMessage =
      axiosError.response?.data?.message ||
      axiosError.message ||
      'Failed to load salons';
    yield put(fetchSalonsFailure(errorMessage));
  }
}

function* handleFetchSalonById(
  action: PayloadAction<{ id: string }>,
): Generator<any, void, any> {
  const { id } = action.payload;
  try {
    const response: AxiosResponse<ApiResponse> = yield call(() =>
      AxiosInstance.get<ApiResponse>(`/user/salon/get-salon/${id}`),
    );

    yield put(fetchSalonByIdSuccess(response.data.data.salons));
  } catch (error) {
    const axiosError = error as AxiosError<ApiResponse>;
    const errorMessage =
      axiosError.response?.data?.message ||
      axiosError.message ||
      'Failed to load salon';
    yield put(fetchSalonByIdFailure(errorMessage));
  }
}

function* handleCreateSalon(
  action: PayloadAction<{ data: Record<string, any> }>,
): Generator<any, void, any> {
  const { data } = action.payload;
  try {
    const response: AxiosResponse<ApiResponse> = yield call(() =>
      AxiosInstance.post<ApiResponse>('/user/salon/create-salon', data),
    );
    yield put(createSalonSuccess(response.data.data));
  } catch (error) {
    const axiosError = error as AxiosError<ApiResponse>;
    const errorMessage =
      axiosError.response?.data?.message ||
      axiosError.message ||
      'Failed to create salon';
    yield put(createSalonFailure(errorMessage));
  }
}

function* handleUpdateSalon(
  action: PayloadAction<{ id: string; data: Record<string, any> }>,
): Generator<any, void, any> {
  const { id, data } = action.payload;
  try {
    const response: AxiosResponse<ApiResponse> = yield call(() =>
      AxiosInstance.patch<ApiResponse>(`/user/salon/update-salon/${id}`, data),
    );
    yield put(updateSalonSuccess(response.data.data));
  } catch (error) {
    const axiosError = error as AxiosError<ApiResponse>;
    const errorMessage =
      axiosError.response?.data?.message ||
      axiosError.message ||
      'Failed to update salon';
    yield put(updateSalonFailure(errorMessage));
  }
}
function* handleDeleteSalon(
  action: PayloadAction<{ id: string }>,
): Generator<any, void, any> {
  const { id } = action.payload;
  try {
    const response: AxiosResponse<ApiResponse> = yield call(() =>
      AxiosInstance.delete<ApiResponse>(`/user/salon/delete-salon/${id}`),
    );
    yield put(deleteSalonSuccess(response.data.data));
  } catch (error) {
    const axiosError = error as AxiosError<ApiResponse>;
    const errorMessage =
      axiosError.response?.data?.message ||
      axiosError.message ||
      'Failed to delete salon';
    yield put(deleteSalonFailure(errorMessage));
  }
}

export function* watchSalonSaga() {
  yield takeLatest(fetchSalons.type, handleFetchSalons);
  yield takeLatest(fetchSalonById.type, handleFetchSalonById);
  yield takeLatest(createSalon.type, handleCreateSalon);
  yield takeLatest(updateSalon.type, handleUpdateSalon);
  yield takeLatest(deleteSalon.type, handleDeleteSalon);
}
