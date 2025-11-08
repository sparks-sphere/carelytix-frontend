import { AxiosInstance } from '@/lib/axios';
import { ApiResponse } from '@/types/api-response';
import { AxiosError, AxiosResponse } from 'axios';
import { call, put, takeLatest, delay } from 'redux-saga/effects';
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

function* handleFetchBranches(
  action?: PayloadAction<{ saloonId?: string }>,
): Generator<any, void, any> {
  try {
    const saloonId = action?.payload?.saloonId;
    const url = saloonId
      ? `/branch/get-all-branches/${saloonId}`
      : '/branch/get-all-branches';
    const response: AxiosResponse<ApiResponse> = yield call(() =>
      AxiosInstance.get<ApiResponse>(url),
    );
    const data: any = response?.data?.data;
    const list = Array.isArray(data)
      ? data
      : Array.isArray(data?.branches)
      ? data.branches
      : Array.isArray(data?.data)
      ? data.data
      : [];
    yield put(fetchBranchesSuccess(list));
  } catch (error: any) {
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
      AxiosInstance.get<ApiResponse>(`/branch/get-branch/${id}`),
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
    // Guard: payload must be an object
    if (!data || typeof data !== 'object') {
      throw new Error('Invalid input: expected object, received undefined');
    }
    // Normalize an optional date field (e.g., openingDate) to YYYY-MM-DD
    const rawDate = (data as any)?.openingDate ?? (data as any)?.date;
    const normalizedDate =
      typeof rawDate === 'string' && rawDate.includes('T')
        ? rawDate.split('T')[0]
        : rawDate;
    const payloadToSend: any = {
      ...data,
      // normalize/trim primary fields
      name: (data?.name ?? data?.branchName ?? data?.title ?? '').trim(),
      branchCode: (data?.branchCode ?? data?.code ?? '').trim(),
      saloonId: data?.saloonId,
      // optional fields
      address: typeof data?.address === 'string' ? data.address.trim() : data?.address,
      city: typeof data?.city === 'string' ? data.city.trim() : data?.city,
      pincode: typeof data?.pincode === 'string' ? data.pincode.trim() : data?.pincode,
      contactNo: typeof data?.contactNo === 'string' ? data.contactNo.trim() : data?.contactNo,
      openingDate: normalizedDate ?? (data as any)?.openingDate ?? (data as any)?.date,
    };
    // Drop optional fields that don't meet backend minimum lengths
    if (!payloadToSend.address || String(payloadToSend.address).length < 2) delete payloadToSend.address;
    if (!payloadToSend.city || String(payloadToSend.city).length < 2) delete payloadToSend.city;
    if (!payloadToSend.pincode || String(payloadToSend.pincode).length < 6) delete payloadToSend.pincode;
    if (!payloadToSend.contactNo || String(payloadToSend.contactNo).length < 10) delete payloadToSend.contactNo;
    const response: AxiosResponse<ApiResponse> = yield call(() =>
      AxiosInstance.post<ApiResponse>(
        '/branch/create-branch',
        payloadToSend,
        { headers: { 'Content-Type': 'application/json' } },
      ),
    );
    const resData: any = response?.data?.data;
    const created = resData?.branch ?? resData ?? null;
    yield put(createBranchSuccess(created));
    // Refresh list after creation
    yield delay(300);
    const refetchSalonId = created?.saloonId ?? data?.saloonId;
    yield put(fetchBranches({ saloonId: refetchSalonId } as any));
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
    const payloadToSend: any = {
      ...data,
      // normalize/trim primary fields
      name: (data?.name ?? (data as any)?.branchName ?? (data as any)?.title ?? '').trim(),
      branchCode: (data as any)?.branchCode ? String((data as any).branchCode).trim() : (data as any)?.code ? String((data as any).code).trim() : undefined,
      saloonId: (data as any)?.saloonId,
      // optional fields
      address: typeof (data as any)?.address === 'string' ? (data as any).address.trim() : (data as any)?.address,
      city: typeof (data as any)?.city === 'string' ? (data as any).city.trim() : (data as any)?.city,
      pincode: typeof (data as any)?.pincode === 'string' ? (data as any).pincode.trim() : (data as any)?.pincode,
      contactNo: typeof (data as any)?.contactNo === 'string' ? (data as any).contactNo.trim() : (data as any)?.contactNo,
    };
    // Drop optional fields that don't meet backend minimum lengths
    if (!payloadToSend.address || String(payloadToSend.address).length < 2) delete payloadToSend.address;
    if (!payloadToSend.city || String(payloadToSend.city).length < 2) delete payloadToSend.city;
    if (!payloadToSend.pincode || String(payloadToSend.pincode).length < 6) delete payloadToSend.pincode;
    if (!payloadToSend.contactNo || String(payloadToSend.contactNo).length < 10) delete payloadToSend.contactNo;
    // Remove undefined values
    Object.keys(payloadToSend).forEach((k) => {
      if (payloadToSend[k] === undefined || payloadToSend[k] === null) delete payloadToSend[k];
    });
    const response: AxiosResponse<ApiResponse> = yield call(() =>
      AxiosInstance.put<ApiResponse>(
        `/branch/update-branch/${id}`,
        payloadToSend,
        { headers: { 'Content-Type': 'application/json' } },
      ),
    );
    const resData: any = response?.data?.data;
    const updated = resData?.branch ?? resData ?? null;
    yield put(updateBranchSuccess(updated));
    // Refresh list after update
    const refetchSalonId = updated?.saloonId ?? data?.saloonId;
    yield put(fetchBranches({ saloonId: refetchSalonId } as any));
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
  action: PayloadAction<{ id: string; saloonId?: string }>,
): Generator<any, void, any> {
  const { id, saloonId } = action.payload;
  try {
    const response: AxiosResponse<ApiResponse> = yield call(() =>
      AxiosInstance.delete<ApiResponse>(`/branch/delete-branch/${id}`,
        {
          data: { id, saloonId },
          headers: { 'Content-Type': 'application/json' },
        },
      ),
    );
    yield put(deleteBranchSuccess({ id }));
    // Refresh list after deletion
    yield delay(200);
    yield put(fetchBranches({ saloonId } as any));
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
