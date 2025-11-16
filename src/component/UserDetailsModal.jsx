import { useDispatch, useSelector } from "react-redux";
import { updateUser, clearSelectedUser, resetPassword, changeStatus } from "../store/usersSlice";
import { useState, useEffect } from "react";

export default function UserDetailsModal() {
  const user = useSelector(state => state.users.selectedUser);
  const currentUser = useSelector(state => state.users.currentUser);
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    name: "",
    email: "",
    group: "",
    role: "user",
    isDeveloper: false,
    isActive: true
  });

  useEffect(() => {
    if (user) setForm(user);
  }, [user]);

  if (!user) return null;

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleUpdate = () => {
    if (currentUser.role !== "Admin") return alert("אין לך הרשאה לבצע פעולה זו");
    dispatch(updateUser(form));
    alert("פרטי המשתמש עודכנו");
  };

  const handleResetPassword = () => {
    if (currentUser.role !== "Admin") return alert("אין לך הרשאה לבצע פעולה זו");
    if (!window.confirm("האם אתה בטוח?")) return;
    const newPassword = Math.random().toString(36).slice(-8);
    dispatch(resetPassword({ id: user.id, newPassword }));
    alert(`סיסמה חדשה נשלחה למייל: ${user.email}\nסיסמה: ${newPassword}`);
  };

  const handleChangeStatus = () => {
    if (currentUser.role !== "Admin") return alert("אין לך הרשאה לבצע פעולה זו");
    const newStatus = !user.isActive;
    dispatch(changeStatus({ id: user.id, newStatus }));
    const reason = prompt("סיבה לשינוי הסטטוס:");
    alert(`סטטוס המשתמש שונה ל-${newStatus ? "פעיל" : "חסום"}\nסיבה: ${reason}`);
  };

  return (
    <div style={{ background: "#ddd", padding: 20 }}>
      <h2>פרטי משתמש</h2>

      <label>שם:</label>
      <input name="name" value={form.name} onChange={handleChange} />
      <br />

      <label>אימייל:</label>
      <input name="email" value={form.email} onChange={handleChange} />
      <br />

      <label>קבוצה:</label>
      <input name="group" value={form.group} onChange={handleChange} />
      <br />

      <label>תפקיד:</label>
      <select name="role" value={form.role} onChange={handleChange}>
        <option value="user">משתמש רגיל</option>
        {currentUser.role === "Admin" && <option value="Admin">מנהל</option>}
      </select>
      <br />

      <button onClick={handleUpdate}>שמור שינויים</button>
      <button onClick={handleResetPassword}>איפוס סיסמה</button>
      <button onClick={handleChangeStatus}>שינוי סטטוס</button>
      <button onClick={() => dispatch(clearSelectedUser())}>סגור</button>
    </div>
  );
}