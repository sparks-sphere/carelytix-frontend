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
      state.salons = action.payload;
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
      state.salons = action.payload;
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
      state.salons = [action.payload, ...state.salons];
      state.loading = false;
      state.error = null;
    },
    createSalonFailure: (state, action) => {
      state.loading = false;
      state.error = null;
    },

    updateSalon: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    updateSalonSuccess: (state, action) => {
      state.salons = state.salons.map((salon) =>
        salon.id === action.payload.id ? action.payload : salon,
      );
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
      state.salons = state.salons.filter(
        (salon) => salon.id !== action.payload.id,
      );
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
