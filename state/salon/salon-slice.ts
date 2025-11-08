import { createSlice } from '@reduxjs/toolkit';

interface SalonState {
  salons: Record<string, any>[];
  loading: boolean;
  error: string | null;
}

const initialState: SalonState = {
  salons: [],
  loading: false,
  error: null,
};

const salonSlice = createSlice({
  name: 'salons',
  initialState,
  reducers: {
    fetchSalons: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchSalonsSuccess: (state, action) => {
      state.salons = (action.payload || []).map((s: any) => {
        const id = s?.id ?? s?._id ?? s?.salonId ?? s?.SalonId ?? s?.uuid;
        const name = s?.name ?? s?.salonName ?? s?.title ?? '';
        const email = s?.address ?? '';
        const contactNumber = s?.contactNo ?? '';
        const rawDate = s?.dateOfEstablishment ?? s?.establishedOn ?? s?.date ?? s?.createdAt ?? '';
        const dateOfEstablishment = typeof rawDate === 'string' && rawDate.includes('T')
          ? rawDate.split('T')[0]
          : rawDate || '';
        return { ...s, id, name, email, contactNumber, dateOfEstablishment };
      });
      state.loading = false;
      state.error = null;
    },
    fetchSalonsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchSalonById: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    fetchSalonByIdSuccess: (state, action) => {
      const payload = action.payload;
      state.salons = Array.isArray(payload)
        ? payload.map((s: any) => {
            const id = s?.id ?? s?._id ?? s?.salonId ?? s?.SalonId ?? s?.uuid;
            const name = s?.name ?? s?.salonName ?? s?.title ?? '';
            const email = s?.email ?? s?.emailAddress ?? s?.mail ?? s?.Email_Address ?? s?.email_address ?? '';
            const contactNumber = s?.contactNumber ?? s?.contact ?? s?.phone ?? s?.mobile ?? s?.contact_number ?? s?.Contact_Number ?? '';
            const rawDate = s?.dateOfEstablishment ?? s?.establishedOn ?? s?.date ?? s?.createdAt ?? '';
            const dateOfEstablishment = typeof rawDate === 'string' && rawDate.includes('T') ? rawDate.split('T')[0] : rawDate || '';
            return { ...s, id, name, email, contactNumber, dateOfEstablishment };
          })
        : payload
        ? (() => {
            const s = payload;
            const id = s?.id ?? s?._id ?? s?.salonId ?? s?.SalonId ?? s?.uuid;
            const name = s?.name ?? s?.salonName ?? s?.title ?? '';
            const email = s?.email ?? s?.emailAddress ?? s?.mail ?? s?.Email_Address ?? s?.email_address ?? '';
            const contactNumber = s?.contactNumber ?? s?.contact ?? s?.phone ?? s?.mobile ?? s?.contact_number ?? s?.Contact_Number ?? '';
            const rawDate = s?.dateOfEstablishment ?? s?.establishedOn ?? s?.date ?? s?.createdAt ?? '';
            const dateOfEstablishment = typeof rawDate === 'string' && rawDate.includes('T') ? rawDate.split('T')[0] : rawDate || '';
            return [{ ...s, id, name, email, contactNumber, dateOfEstablishment }];
          })()
        : [];
      state.loading = false;
      state.error = null;
    },
    fetchSalonByIdFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    createSalon: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    createSalonSuccess: (state, action) => {
      const s = action.payload ?? {};
      const id = s?.id ?? s?._id ?? s?.salonId ?? s?.SalonId ?? s?.uuid;
      const name = s?.name ?? s?.salonName ?? s?.title ?? '';
      const email = s?.email ?? s?.emailAddress ?? s?.mail ?? s?.Email_Address ?? s?.email_address ?? '';
      const contactNumber = s?.contactNumber ?? s?.contact ?? s?.phone ?? s?.mobile ?? s?.contact_number ?? s?.Contact_Number ?? '';
      const rawDate = s?.dateOfEstablishment ?? s?.establishedOn ?? s?.date ?? s?.createdAt ?? '';
      const dateOfEstablishment = typeof rawDate === 'string' && rawDate.includes('T') ? rawDate.split('T')[0] : rawDate || '';
      const normalized = { ...s, id, name, email, contactNumber, dateOfEstablishment };
      state.salons = [normalized, ...state.salons];
      state.loading = false;
      state.error = null;
    },
    createSalonFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    updateSalon: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    updateSalonSuccess: (state, action) => {
      const s = action.payload ?? {};
      const id = s?.id ?? s?._id ?? s?.salonId ?? s?.SalonId ?? s?.uuid;
      const name = s?.name ?? s?.salonName ?? s?.title ?? '';
      const email = s?.email ?? s?.emailAddress ?? s?.mail ?? s?.Email_Address ?? s?.email_address ?? '';
      const contactNumber = s?.contactNumber ?? s?.contact ?? s?.phone ?? s?.mobile ?? s?.contact_number ?? s?.Contact_Number ?? '';
      const rawDate = s?.dateOfEstablishment ?? s?.establishedOn ?? s?.date ?? s?.createdAt ?? '';
      const dateOfEstablishment = typeof rawDate === 'string' && rawDate.includes('T') ? rawDate.split('T')[0] : rawDate || '';
      const normalized = { ...s, id, name, email, contactNumber, dateOfEstablishment };
      state.salons = state.salons.map((salon) =>
        salon.id === normalized.id ? normalized : salon,
      );
      state.loading = false;
    },
    updateSalonFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteSalon: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    deleteSalonSuccess: (state, action) => {
      const s = action.payload ?? {};
      const id = s?.id ?? s?._id ?? s?.salonId ?? s?.SalonId ?? s?.uuid;
      state.salons = state.salons.filter((salon) => salon.id !== id);
      state.loading = false;
      state.error = null;
    },
    deleteSalonFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
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
} = salonSlice.actions;
export default salonSlice.reducer;
