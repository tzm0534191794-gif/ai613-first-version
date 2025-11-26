import UsersList from "./UsersList";
import UserDetailsModal from "./UserDetailsModal";
import { useNavigate } from "react-router-dom";

export default function UsersManager() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>ניהול משתמשים</h1>

      {/* כפתור שמעביר לדף AddUserForm */}
      <button onClick={() => navigate("/add-user")}>
        הוסף משתמש חדש
      </button>

      <UsersList />
      <UserDetailsModal />
    </div>
  );
}