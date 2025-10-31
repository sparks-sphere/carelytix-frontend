import { AxiosInstance } from '@/lib/axios';
import { ApiResponse } from '@/types/api-response';
import { AxiosError, AxiosResponse } from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';
import {
  fetchStaffs,
  fetchStaffsSuccess,
  fetchStaffsFailure,
  fetchStaffById,
  fetchStaffByIdSuccess,
  fetchStaffByIdFailure,
  createStaff,
  createStaffSuccess,
  createStaffFailure,
  updateStaff,
  updateStaffSuccess,
  updateStaffFailure,
  deleteStaff,
  deleteStaffSuccess,
  deleteStaffFailure,
} from './staff-slice';
import { PayloadAction } from '@reduxjs/toolkit';

function* fetchStaffsSaga(): Generator<any, void, any> {
  try {
    const response: AxiosResponse<ApiResponse> = yield call(() =>
      AxiosInstance.get<ApiResponse>('/staff'),
    );
    yield put(fetchStaffsSuccess(response.data.data.staffs));
  } catch (error: any) {
    const axiosError = error as AxiosError<ApiResponse>;
    const errorMessage =
      axiosError.response?.data?.message ||
      axiosError.message ||
      'Failed to load staffs';
    yield put(fetchStaffsFailure(errorMessage));
  }
}

function* fetchStaffByIdSaga(
  action: PayloadAction<{ id: string }>,
): Generator<any, void, any> {
  const { id } = action.payload;
  try {
    const response: AxiosResponse<ApiResponse> = yield call(() =>
      AxiosInstance.get<ApiResponse>(`/staff/${id}`),
    );
    yield put(fetchStaffByIdSuccess(response.data.data));
  } catch (error) {
    const axiosError = error as AxiosError<ApiResponse>;
    const errorMessage =
      axiosError.response?.data?.message ||
      axiosError.message ||
      'Failed to load staff';
    yield put(fetchStaffByIdFailure(errorMessage));
  }
}

function* createStaffSaga(
  action: PayloadAction<{ data: Record<string, any> }>,
): Generator<any, void, any> {
  const { data } = action.payload;
  try {
    const response: AxiosResponse<ApiResponse> = yield call(() =>
      AxiosInstance.post<ApiResponse>('/staff', data),
    );
    yield put(createStaffSuccess(response.data.data));
  } catch (error) {
    const axiosError = error as AxiosError<ApiResponse>;
    const errorMessage =
      axiosError.response?.data?.message ||
      axiosError.message ||
      'Failed to create staff';
    yield put(createStaffFailure(errorMessage));
  }
}

function* updateStaffSaga(
  action: PayloadAction<{ id: string; data: Record<string, any> }>,
): Generator<any, void, any> {
  const { id, data } = action.payload;
  try {
    const response: AxiosResponse<ApiResponse> = yield call(() =>
      AxiosInstance.put<ApiResponse>(`/staff/${id}`, data),
    );
    yield put(updateStaffSuccess(response.data.data));
  } catch (error) {
    const axiosError = error as AxiosError<ApiResponse>;
    const errorMessage =
      axiosError.response?.data?.message ||
      axiosError.message ||
      'Failed to update staff';
    yield put(updateStaffFailure(errorMessage));
  }
}

function* deleteStaffSaga(
  action: PayloadAction<{ id: string }>,
): Generator<any, void, any> {
  const { id } = action.payload;
  try {
    const response: AxiosResponse<ApiResponse> = yield call(() =>
      AxiosInstance.delete<ApiResponse>(`/staff/${id}`),
    );
    yield put(deleteStaffSuccess(response.data.data));
  } catch (error) {
    const axiosError = error as AxiosError<ApiResponse>;
    const errorMessage =
      axiosError.response?.data?.message ||
      axiosError.message ||
      'Failed to delete staff';
    yield put(deleteStaffFailure(errorMessage));
  }
}

export function* watchStaffSaga() {
  yield takeLatest(fetchStaffs.type, fetchStaffsSaga);
  yield takeLatest(fetchStaffById.type, fetchStaffByIdSaga);
  yield takeLatest(createStaff.type, createStaffSaga);
  yield takeLatest(updateStaff.type, updateStaffSaga);
  yield takeLatest(deleteStaff.type, deleteStaffSaga);
}
