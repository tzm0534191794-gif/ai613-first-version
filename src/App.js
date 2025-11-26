import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "./store/usersSlice";

import UsersManager from "./component/UsersManager";
import UserDetailsModal from "./component/UserDetailsModal";
import AddUserForm from "./component/AddUserForm";

export default function App() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);

  useEffect(() => {
    if (users.length > 0) {
      dispatch(setCurrentUser(users[0]));
    }
  }, [dispatch, users]);

  return (
      <Routes>
        <Route path="/" element={<UsersManager />} />
        <Route path="/user/:id" element={<UserDetailsModal />} />
        <Route path="/add-user" element={<AddUserForm />} />
      </Routes>
  );
}
