import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  prompts: [], // רשימת הפרומפטים
  selectedPrompt: null,
};

const promptsSlice = createSlice({
  name: "prompts",
  initialState,
  reducers: {
    addPrompt: (state, action) => {
      state.prompts.push({
        id: Date.now(),
        ...action.payload,
        approved: false, // לא מאושר בהתחלה
      });
    },
    approvePrompt: (state, action) => {
      const id = action.payload;
      const prompt = state.prompts.find(p => p.id === id);
      if (prompt) prompt.approved = true;
    },
    selectPrompt: (state, action) => {
      state.selectedPrompt = action.payload;
    },
    clearSelectedPrompt: (state) => {
      state.selectedPrompt = null;
    },
  }
});

export const { addPrompt, approvePrompt, selectPrompt, clearSelectedPrompt } = promptsSlice.actions;
export default promptsSlice.reducer;