import { createSlice } from "@reduxjs/toolkit";

interface StaffState {
    staffs: Record<string, any>[];
    loading: boolean;
    error: string | null;
}

const initialState: StaffState = {
    staffs: [],
    loading: false,
    error: null,
};

const staffSlice = createSlice({
    name: 'staffs',
    initialState,
    reducers: {
        fetchStaffs: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchStaffsSuccess: (state, action) => {
            state.staffs = action.payload;
            state.loading = false;
            state.error = null;
        },
        fetchStaffsFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        fetchStaffById: (state, action) => {
            state.loading = true;
            state.error = null;
        },

        fetchStaffByIdSuccess: (state, action) => {
            state.staffs = action.payload;
            state.loading = false;
            state.error = null;
        },

        fetchStaffByIdFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        createStaff: (state, action) => {
            state.loading = true;
            state.error = null;
        },

        createStaffSuccess: (state, action) => {
            state.staffs = [action.payload, ...state.staffs];
            state.loading = false;
            state.error = null;
        },

        createStaffFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        updateStaff: (state, action) => {
            state.loading = true;
            state.error = null;
        },

        updateStaffSuccess: (state, action) => {
            state.staffs = state.staffs.map((staff) =>
            staff.id === action.payload.id ? action.payload : staff,
        );
      },

      updateStaffFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },

      deleteStaff: (state, action) => {
        state.loading = true;
        state.error = null;
      },

      deleteStaffSuccess: (state, action) => {
        state.staffs = state.staffs.filter(
            (staff) => staff.id !== action.payload.id,
        );
        state.loading = false;
        state.error = null;
      },

      deleteStaffFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },
    },
});

export const {
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
} = staffSlice.actions;

export default staffSlice.reducer;