import { AxiosInstance } from '@/lib/axios';
import { ApiResponse } from '@/types/api-response';
import { AxiosError, AxiosResponse } from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';
import {
  fetchBranches,
  fetchBranchesSuccess,
  fetchBranchesFailure,
  fetchBranchById,
  fetchBranchByIdSuccess,
  fetchBranchByIdFailure,
  createBranch,
  createBranchSuccess,
  createBranchFailure,
  updateBranch,
  updateBranchSuccess,
  updateBranchFailure,
  deleteBranch,
  deleteBranchSuccess,
  deleteBranchFailure,
} from './branch-slice';
import { PayloadAction } from '@reduxjs/toolkit';

function* handleFetchBranches(): Generator<any, void, any> {
  try {
    const response: AxiosResponse<ApiResponse> = yield call(() =>
      AxiosInstance.get<ApiResponse>('/user/branch/get-all-branches'),
    );
    console.log('response', response);
    yield put(fetchBranchesSuccess(response.data.data.branches));
  } catch (error: any) {
    console.log('error', error);
    const axiosError = error as AxiosError<ApiResponse>;
    const errorMessage =
      axiosError.response?.data?.message ||
      axiosError.message ||
      'Failed to load branches';
    yield put(fetchBranchesFailure(errorMessage));
  }
}

function* handleFetchBranchById(
  action: PayloadAction<{ id: string }>,
): Generator<any, void, any> {
  const { id } = action.payload;
  try {
    const response: AxiosResponse<ApiResponse> = yield call(() =>
      AxiosInstance.get<ApiResponse>(`/user/branch/get-branch/${id}`),
    );
    yield put(fetchBranchByIdSuccess(response.data.data));
  } catch (error) {
    const axiosError = error as AxiosError<ApiResponse>;
    const errorMessage =
      axiosError.response?.data?.message ||
      axiosError.message ||
      'Failed to load branch';
    yield put(fetchBranchByIdFailure(errorMessage));
  }
}

function* handleCreateBranch(
  action: PayloadAction<{ data: Record<string, any> }>,
): Generator<any, void, any> {
  const { data } = action.payload;
  try {
    const response: AxiosResponse<ApiResponse> = yield call(() =>
      AxiosInstance.post<ApiResponse>('/user/branch/create-branch', data),
    );
    yield put(createBranchSuccess(response.data.data.branch));
  } catch (error) {
    const axiosError = error as AxiosError<ApiResponse>;
    const errorMessage =
      axiosError.response?.data?.message ||
      axiosError.message ||
      'Failed to create branch';
    yield put(createBranchFailure(errorMessage));
  }
}

function* handleUpdateBranch(
  action: PayloadAction<{ id: string; data: Record<string, any> }>,
): Generator<any, void, any> {
  const { id, data } = action.payload;
  try {
    const response: AxiosResponse<ApiResponse> = yield call(() =>
      AxiosInstance.put<ApiResponse>(`/user/branch/update-branch/${id}`, data),
    );
    yield put(updateBranchSuccess(response.data.data.branch));
  } catch (error) {
    console.log('error', error);
    const axiosError = error as AxiosError<ApiResponse>;
    const errorMessage =
      axiosError.response?.data?.message ||
      axiosError.message ||
      'Failed to update branch';
    yield put(updateBranchFailure(errorMessage));
  }
}

function* handleDeleteBranch(
  action: PayloadAction<{ id: string }>,
): Generator<any, void, any> {
  const { id } = action.payload;
  try {
    const response: AxiosResponse<ApiResponse> = yield call(() =>
      AxiosInstance.delete<ApiResponse>(`/user/branch/delete-branch/${id}`),
    );
    yield put(deleteBranchSuccess({ id }));
  } catch (error) {
    const axiosError = error as AxiosError<ApiResponse>;
    const errorMessage =
      axiosError.response?.data?.message ||
      axiosError.message ||
      'Failed to delete branch';
    yield put(deleteBranchFailure(errorMessage));
  }
}

export function* watchBranchSaga() {
  yield takeLatest(fetchBranches.type, handleFetchBranches);
  yield takeLatest(fetchBranchById.type, handleFetchBranchById);
  yield takeLatest(createBranch.type, handleCreateBranch);
  yield takeLatest(updateBranch.type, handleUpdateBranch);
  yield takeLatest(deleteBranch.type, handleDeleteBranch);
}
