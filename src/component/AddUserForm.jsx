import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../store/usersSlice";
import { useNavigate } from "react-router-dom";

export default function AddUserForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector(state => state.users.currentUser);

  const groups = ["מתכנת", "מתכונים", "מעצב", "פעילויות"];

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    group: groups[0],
    role: "User",
    status: "active"
  });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleAddUser = () => {
    if (currentUser.role !== "Admin") return alert("אין לך הרשאה לבצע פעולה זו");
    if (!form.password) return alert("יש להזין סיסמה");

    dispatch(addUser(form));
    alert("המשתמש נוסף בהצלחה");

    navigate("/"); 
  };

  return (
    <div>
      <h2>הוספת משתמש חדש</h2>

      <label>שם:</label>
      <input name="name" value={form.name} onChange={handleChange} />
      <br />

      <label>אימייל:</label>
      <input name="email" value={form.email} onChange={handleChange} />
      <br />

      <label>סיסמה:</label>
      <input type="password" name="password" value={form.password} onChange={handleChange} />
      <br />

      <label>קבוצה:</label>
      <select name="group" value={form.group} onChange={handleChange}>
        {groups.map(g => (
          <option key={g} value={g}>{g}</option>
        ))}
      </select>
      <br /><br />

      <button onClick={handleAddUser}>הוסף</button>
      <button onClick={() => navigate("/")}>ביטול</button>
    </div>
  );
}