
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function UsersManager() {
  const users = useSelector((state) => state.users.users);
  const navigate = useNavigate();

  // ⭐ שינוי — פונקציה שמנווטת לדף פרטי המשתמש
  const handleOpenUser = (id) => {
    navigate(`/user/${id}`);
  };

  return (
    <div>
      <h2>ניהול משתמשים</h2>

      {users.map((u) => (
        <div key={u.id} style={{ border: "1px solid #ccc", padding: 10, marginBottom: 10 }}>
          <strong>{u.name}</strong> — {u.email}
          <br />

          {/* ⭐ שינוי — במקום setSelectedUser, עוברים לדף אחר */}
          <button onClick={() => handleOpenUser(u.id)}>פרטים</button>
        </div>
      ))}
      <button onClick={() => navigate("/add-user")}>
        הוסף משתמש חדש
      </button>
    </div>
  );
}