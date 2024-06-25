import { createSlice } from "@reduxjs/toolkit";
import { ReviewState } from "../types";
import { ErrorResponse } from "@/core/api";
import AlertService from "@/core/shared/utils/alert-service";
import reviewDataModel from "../../models/review-model";
import { ReviewDataInterface } from "../../interfaces/review-interface";
import {
  createReview,
  deleteReview,
  getReviewDetails,
  getReviewsList,
} from "../thunks/review-thunk";

//* Initial State
const initialState: ReviewState = {
  reviews: [],
  currentReview: reviewDataModel.defaultValues,
  isFetched: false,
  loading: false,
  error: "",
};

const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {
    clearError(state) {
      state.error = "";
    },
    clearCurrentReview(state) {
      state.currentReview = initialState.currentReview;
    },
    clearReviewList(state) {
      state.reviews = initialState.reviews;
    },
    setCurrentReview(
      state,
      action: { payload: ReviewDataInterface; type: string }
    ) {
      state.currentReview = action.payload;
    },
    setReviewList(
      state,
      action: { payload: ReviewDataInterface[]; type: string }
    ) {
      state.reviews = action.payload;
    },
    setLoading(state, action: { payload: boolean; type: string }) {
      state.loading = action.payload;
    },
  },
  extraReducers(builder) {
    //* get all reviews from api
    builder.addCase(getReviewsList?.pending, (state, _action) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(getReviewsList?.fulfilled, (state, action) => {
      state.loading = false;
      state.reviews = action.payload;
      state.error = "";
      console.log("getReviewsList", action.payload);
    });
    builder.addCase(getReviewsList?.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as ErrorResponse).message;
      AlertService.showAlert(`${state.error}`, "error");
      state.reviews = initialState.reviews;
    });

    //* create review
    builder.addCase(createReview.pending, (state, _action) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(createReview.fulfilled, (state, _action) => {
      state.loading = false;
      state.currentReview = initialState.currentReview;
      state.error = "";
      AlertService.showAlert("Review added successfully", "success");
    });
    builder.addCase(createReview.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as ErrorResponse).message;
      AlertService.showAlert(`${state.error}`, "error");
    });

    //* delete review
    builder.addCase(deleteReview.pending, (state, _action) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(deleteReview.fulfilled, (state, _action) => {
      state.loading = false;
      state.error = "";
      AlertService.showAlert("Review deleted successfully", "success");
    });
    builder.addCase(deleteReview.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as ErrorResponse).message;
      AlertService.showAlert(`${state.error}`, "error");
    });

    //* get single review details
    builder.addCase(getReviewDetails.pending, (state, _action) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(getReviewDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.currentReview = action.payload;
      state.error = "";
    });
    builder.addCase(getReviewDetails.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as ErrorResponse).message;
      state.currentReview = initialState.currentReview;
      AlertService.showAlert(`${state.error}`, "error");
    });
  },
});

export const {
  setLoading,
  setReviewList,
  setCurrentReview,
  clearReviewList,
  clearCurrentReview,
  clearError,
} = reviewSlice.actions;
export default reviewSlice.reducer;
