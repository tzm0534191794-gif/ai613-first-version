import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [
    { id: 1, name: "דנה", email: "dana@gmail.com", group: "קבוצה A", role: "Admin", isDeveloper: true, isActive: true },
    { id: 2, name: "אבי", email: "avi@gmail.com", group: "קבוצה B", role: "user", isDeveloper: false, isActive: true }
  ],
  selectedUser: null,
  currentUser: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.users.push({ id: Date.now(), ...action.payload });
    },
    updateUser: (state, action) => {
      const updated = action.payload;
      state.users = state.users.map(u => u.id === updated.id ? updated : u);
    },
    selectUser: (state, action) => {
      state.selectedUser = action.payload;
    },
    clearSelectedUser: (state) => {
      state.selectedUser = null;
    },
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    resetPassword: (state, action) => {
      const { id } = action.payload;
      const user = state.users.find(u => u.id === id);
      if (user) {
        const newPassword = Math.random().toString(36).slice(-8); // סיסמה חדשה אקראית
        user.password = newPassword; // מוסיפים שדה סיסמה
        console.log(`סיסמה חדשה ל-${user.email}: ${newPassword}`); // פה אפשר גם לשלוח מייל
      }
    },
    changeStatus: (state, action) => {
      const { id, isActive } = action.payload;
      const user = state.users.find(u => u.id === id);
      if (user) {
        user.isActive = isActive;
      }
    }
  }
});

export const { addUser, updateUser, selectUser, clearSelectedUser, setCurrentUser, resetPassword, changeStatus } = usersSlice.actions;
export default usersSlice.reducer;