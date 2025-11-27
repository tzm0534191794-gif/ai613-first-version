import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  users: [
    { id: 1, name: "צביה", email: "tz@gmail.com", group: "מתכנת", role: "Admin", isDeveloper: true, status: "active"},
    { id: 2, name: "חנה", email: "chana@gmail.com", group: "מתכנת", role: "user", isDeveloper: false, status: "active"}
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
  const { id, newPassword } = action.payload;
  const user = state.users.find(u => u.id === id);
  if (user) {
    user.password = newPassword;
  }
},
    changeStatus: (state, action) => {
  const { id, newStatus } = action.payload;
  const user = state.users.find(u => u.id === id);

  if (user) {
    user.status = newStatus;   
  }

  if (state.selectedUser && state.selectedUser.id === id) {
    state.selectedUser.status = newStatus; 
  }
}
  }
});

export const { addUser, updateUser, selectUser, clearSelectedUser, setCurrentUser, resetPassword, changeStatus } = usersSlice.actions;
export default usersSlice.reducer;