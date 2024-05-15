import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const baseURL = process.env.variables.API_URL

export const fetchBeneficiaries = createAsyncThunk(
  'beneficiaries/fetchBeneficiaries',
  async () => {
    const response = await axios.get(`${baseURL}/beneficiaries`);
    return response.data;
  }
);

export const addBeneficiary = createAsyncThunk(
  'beneficiaries/addBeneficiary',
  async (newBeneficiary) => {
    try{
      const response = await axios.post(`${baseURL}/beneficiaries`, newBeneficiary);
      if(response.error){
        throw response.error
      }
      return response.data;
    }catch(err){
      throw err
    } 
  }
);

export const updateBeneficiary = createAsyncThunk(
  'beneficiaries/updateBeneficiary',
  async (updatedBeneficiary, { rejectWithValue }) => {
    try{
      const response = await axios.put(
        `${baseURL}/beneficiaries/${updatedBeneficiary.id}`,
        updatedBeneficiary
      );
      return response.data;
    }catch(error){
      if (error.response && error.response.status >= 400 && error.response.status < 500) {
        return rejectWithValue(error.response.data);
      } else {
        throw error;
      }
    }
  }
);

export const deleteBeneficiary = createAsyncThunk(
  'beneficiaries/deleteBeneficiary',
  async (beneficiaryId) => {
    try{
      await axios.delete(`${baseURL}/beneficiaries/${beneficiaryId}`);
      return beneficiaryId;
    }catch(err){
      throw err
    } 
    
  }
);

export const beneficiariesSlice = createSlice({
  name: 'beneficiaries',
  initialState: {
    list: [],
    status: 'idle',
    otherStatus:"idle",
    error: null,
    beneficiary: null,
  },
  reducers: {
    setBeneficiary: (state, action) => {
      state.beneficiary = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBeneficiaries.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBeneficiaries.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchBeneficiaries.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addBeneficiary.fulfilled, (state, action) => {
        state.otherStatus = 'success';
        state.list.push(action.payload);
        state.beneficiary = null;
      })
      .addCase(addBeneficiary.rejected, (state, action) => {
        state.otherStatus = 'error';
        state.beneficiary = null;
      })
      .addCase(updateBeneficiary.fulfilled, (state, action) => {
        state.otherStatus = 'success';
        const index = state.list.findIndex(
          (beneficiary) => beneficiary.id === action.payload.id
        );
        if (index !== -1) {
          state.list[index] = action.payload;
        }
        state.beneficiary = null;
      })
      .addCase(updateBeneficiary.rejected, (state, action) => {
        state.otherStatus = 'error';
        state.beneficiary = null;
      })
      .addCase(deleteBeneficiary.fulfilled, (state, action) => {
        state.list = state.list.filter(
          (beneficiary) => beneficiary.id !== action.payload
        );
        state.otherStatus = 'success';
        state.beneficiary = null;
      }).addCase(deleteBeneficiary.rejected, (state, action) => {
        state.otherStatus = 'error';
        state.beneficiary = null;
      })
  },
});

export const { setBeneficiary } = beneficiariesSlice.actions;

export default beneficiariesSlice.reducer;
