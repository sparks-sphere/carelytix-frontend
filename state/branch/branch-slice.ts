import { createSlice } from '@reduxjs/toolkit';
import { create } from 'node:domain';

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
      state.branches = action.payload;
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
      state.branches = action.payload;
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
      state.branches.push(action.payload);
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
      const updatedBranch = action.payload;
      state.branches = state.branches.map((branch) =>
        branch.id === updatedBranch.id ? updatedBranch : branch,
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
      const deletedBranch = action.payload;
      state.branches = state.branches.filter(
        (branch) => branch.id !== deletedBranch.id,
      );
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
