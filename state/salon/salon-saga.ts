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
      AxiosInstance.get<ApiResponse>('/salon/get-all-salons'),
    );
    const data = response?.data?.data as any;
    const list = Array.isArray(data)
      ? data
      : Array.isArray(data?.salons)
      ? data.salons
      : Array.isArray(data?.data)
      ? data.data
      : data?.salon
      ? [data.salon]
      : [];
    yield put(fetchSalonsSuccess(list));
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
      AxiosInstance.get<ApiResponse>(`/salon/get-salon/${id}`),
    );
    const data = response?.data?.data as any;
    const listOrItem = Array.isArray(data)
      ? data
      : Array.isArray(data?.salons)
      ? data.salons
      : data?.salon ?? data ?? null;
    yield put(fetchSalonByIdSuccess(listOrItem));
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
    // Send multiple alias fields to maximize backend compatibility
    const normalizedDate = typeof data?.dateOfEstablishment === 'string' && data.dateOfEstablishment.includes('T')
      ? data.dateOfEstablishment.split('T')[0]
      : data?.dateOfEstablishment;
    const payloadToSend = {
      ...data,
      // name aliases
      salonName: data?.name ?? data?.salonName,
      // email aliases
      // email: data?.email ?? data?.emailAddress ?? data?.email_address,
      // emailAddress: data?.email ?? data?.emailAddress ?? data?.email_address,
      // email_address: data?.email ?? data?.emailAddress ?? data?.email_address,
      address: data?.address,
      // contact aliases
      // contactNumber: data?.contactNumber ?? data?.contact ?? data?.phone ?? data?.mobile,
      // contact_number: data?.contactNumber ?? data?.contact ?? data?.phone ?? data?.mobile,
      // Contact_Number: data?.contactNumber ?? data?.contact ?? data?.phone ?? data?.mobile,
      // contact: data?.contactNumber ?? data?.contact ?? data?.phone ?? data?.mobile,
      // phone: data?.contactNumber ?? data?.contact ?? data?.phone ?? data?.mobile,
      // mobile: data?.contactNumber ?? data?.contact ?? data?.phone ?? data?.mobile,
      contactNo: data?.contactNo,
      // date aliases
      dateOfEstablishment: normalizedDate ?? data?.establishedOn ?? data?.date,
      establishedOn: normalizedDate ?? data?.establishedOn ?? data?.date,
      date: normalizedDate ?? data?.establishedOn ?? data?.date,
    };
    const response: AxiosResponse<ApiResponse> = yield call(() =>
      AxiosInstance.post<ApiResponse>('/salon/create-salon', payloadToSend),
    );
    const resData = response?.data?.data as any;
    const created = resData?.salon ?? resData?.data ?? resData ?? null;
    yield put(createSalonSuccess(created));
    // Ensure UI reflects the latest server data
    yield put(fetchSalons());
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
    const normalizedDate = typeof data?.dateOfEstablishment === 'string' && data.dateOfEstablishment.includes('T')
      ? data.dateOfEstablishment.split('T')[0]
      : data?.dateOfEstablishment;
    const payloadToSend = {
      ...data,
      salonName: data?.name ?? data?.salonName,
      address: data?.address,
      contactNo: data?.contactNo ?? data?.contactNumber ?? data?.contact ?? data?.phone ?? data?.mobile,
      dateOfEstablishment: normalizedDate ?? data?.establishedOn ?? data?.date,
      establishedOn: normalizedDate ?? data?.establishedOn ?? data?.date,
      date: normalizedDate ?? data?.establishedOn ?? data?.date,
    };
    const response: AxiosResponse<ApiResponse> = yield call(() =>
      AxiosInstance.put<ApiResponse>(`/salon/update-salon/${id}`, payloadToSend),
    );
    const resData = response?.data?.data as any;
    const updated = resData?.salon ?? resData?.data ?? resData ?? null;
    yield put(updateSalonSuccess(updated));
    // Refresh list after update
    yield put(fetchSalons());
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
      AxiosInstance.delete<ApiResponse>(`/salon/delete-salon/${id}`),
    );
    const resData = response?.data?.data as any;
    const deleted = resData?.salon ?? resData?.data ?? resData ?? { id };
    yield put(deleteSalonSuccess(deleted));
    // Refresh list after delete
    yield put(fetchSalons());
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
