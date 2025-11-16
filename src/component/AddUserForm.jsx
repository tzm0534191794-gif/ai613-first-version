import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../store/usersSlice";

export default function AddUserForm({ onCancel }) {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.users.currentUser);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    group: "לא משוייך",
    role: "user",
    isDeveloper: false,
    isActive: true
  });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleAddUser = () => {
    if (currentUser.role !== "Admin") return alert("אין לך הרשאה לבצע פעולה זו");
    if (!form.password) return alert("יש להזין סיסמה");
    dispatch(addUser(form));
    alert("המשתמש נוסף בהצלחה");
    onCancel();
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
      <input name="group" value={form.group} onChange={handleChange} />
      <br />

      <label>תפקיד:</label>
      <select name="role" value={form.role} onChange={handleChange}>
        <option value="user">משתמש רגיל</option>
        {currentUser.role === "Admin" && <option value="Admin">מנהל</option>}
      </select>
      <br /><br />

      <button onClick={handleAddUser}>הוסף</button>
      <button onClick={onCancel}>ביטול</button>
    </div>
  );
}