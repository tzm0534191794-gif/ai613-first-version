import { useState } from "react";
import UsersList from "./UsersList";
import UserDetailsModal from "./UserDetailsModal";
import AddUserForm from "./AddUserForm";
import { useNavigate } from "react-router-dom";

export default function UsersManager() {
  const [isAdding, setIsAdding] = useState(false);

  const navigate = useNavigate();
<button onClick={() => navigate("/add-user")}>הוסף משתמש חדש</button>

  return (
    <div>
      <h1>ניהול משתמשים</h1>

      {!isAdding && (
        <button onClick={() => setIsAdding(true)}>הוספת משתמש חדש</button>
      )}

      {isAdding && <AddUserForm onCancel={() => setIsAdding(false)} />}

      <UsersList />

      <UserDetailsModal />
    </div>
  );
}