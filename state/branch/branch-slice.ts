import { createSlice } from '@reduxjs/toolkit';

interface BranchState {
  branches: Record<string, any>[];
  //branch: Record<string, any> | null;
  loading: boolean;
  error: string | null;
}

const initialState: BranchState = {
  //branch: null,
  branches: [],
  loading: false,
  error: null,
};

const branchSlice = createSlice({
  name: 'branches',
  initialState,
  reducers: {
    fetchBranches: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchBranchesSuccess: (state, action) => {
      const list = Array.isArray(action.payload) ? action.payload : [];
      state.branches = list.map((b: any) => ({
        ...b,
        id: b?.id ?? b?._id ?? b?.branchId ?? b?.BranchId ?? b?.uuid,
        name: b?.name ?? b?.branchName ?? b?.title ?? '',
        branchCode: b?.branchCode ?? b?.code ?? '',
        contactNo: b?.contactNo ?? b?.contact ?? b?.phone ?? b?.mobile ?? '',
      }));
      state.loading = false;
      state.error = null;
    },
    fetchBranchesFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchBranchById: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    fetchBranchByIdSuccess: (state, action) => {
      const payload = action.payload;
      const arr = Array.isArray(payload) ? payload : payload ? [payload] : [];
      state.branches = arr.map((b: any) => ({
        ...b,
        id: b?.id ?? b?._id ?? b?.branchId ?? b?.BranchId ?? b?.uuid,
        name: b?.name ?? b?.branchName ?? b?.title ?? '',
        branchCode: b?.branchCode ?? b?.code ?? '',
        contactNo: b?.contactNo ?? b?.contact ?? b?.phone ?? b?.mobile ?? '',
      }));
      state.loading = false;
      state.error = null;
    },
    fetchBranchByIdFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    createBranch: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    createBranchSuccess: (state, action) => {
      const b = action.payload ?? {};
      const normalized = {
        ...b,
        id: b?.id ?? b?._id ?? b?.branchId ?? b?.BranchId ?? b?.uuid,
        name: b?.name ?? b?.branchName ?? b?.title ?? '',
        branchCode: b?.branchCode ?? b?.code ?? '',
        contactNo: b?.contactNo ?? b?.contact ?? b?.phone ?? b?.mobile ?? '',
      };
      state.branches = [normalized, ...state.branches];
      state.loading = false;
      state.error = null;
    },
    createBranchFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    updateBranch: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    updateBranchSuccess: (state, action) => {
      const b = action.payload ?? {};
      const updated = {
        ...b,
        id: b?.id ?? b?._id ?? b?.branchId ?? b?.BranchId ?? b?.uuid,
        name: b?.name ?? b?.branchName ?? b?.title ?? '',
        branchCode: b?.branchCode ?? b?.code ?? '',
        contactNo: b?.contactNo ?? b?.contact ?? b?.phone ?? b?.mobile ?? '',
      };
      state.branches = state.branches.map((branch) =>
        branch.id === updated.id ? updated : branch,
      );
      state.loading = false;
      state.error = null;
    },
    updateBranchFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    deleteBranch: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    deleteBranchSuccess: (state, action) => {
      const deleted = action.payload ?? {};
      const id = deleted?.id ?? deleted?._id ?? deleted?.branchId ?? deleted?.BranchId ?? deleted?.uuid;
      state.branches = state.branches.filter((branch) => branch.id !== id);
      state.loading = false;
      state.error = null;
    },
    deleteBranchFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
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
} = branchSlice.actions;
export default branchSlice.reducer;
