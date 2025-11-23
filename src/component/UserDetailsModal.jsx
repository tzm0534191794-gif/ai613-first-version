import { useDispatch, useSelector } from "react-redux";
import { updateUser, clearSelectedUser, resetPassword, changeStatus } from "../store/usersSlice";
import { useState, useEffect } from "react";

export default function UserDetailsModal() {
  const user = useSelector(state => state.users.selectedUser);
  const currentUser = useSelector(state => state.users.currentUser);
  const dispatch = useDispatch();

  const groups = [
  "מתכנת",
  "מתכונים",
  "מעצב",
  "פעילויות"
];

  const [form, setForm] = useState({
    name: "",
    email: "",
    group: "",
    role: "user",
    isDeveloper: false,
    status: "active"   
  });

  const [showMessageForm, setShowMessageForm] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [pendingStatus, setPendingStatus] = useState(null);

  useEffect(() => {
    if (user) {
      setForm({
        ...user,
        status: user.status || "active"

      });
    }
  }, [user]);

  if (!user) return null;

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

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

    // בודק אם המשתמש בחר סטטוס חדש בטופס
    if (!pendingStatus) {
      alert("בחר סטטוס חדש לפני שינוי");
      return;
    }

    dispatch(changeStatus({ id: user.id, newStatus: pendingStatus }));
    setForm(prev => ({ ...prev, status: pendingStatus }));


    // פותח טופס הודעה
    setShowMessageForm(true);
  };

  const handleSendMessage = () => {
    alert(`הודעה נשלחה למשתמש:\n${user.email}`);

    // איפוס הטופס
    setShowMessageForm(false);
    setStatusMessage("");
    setPendingStatus(null);
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
      <select name="group" value={form.group} onChange={handleChange}>
        {groups.map(g => (
          <option key={g} value={g}>{g}</option>
        ))}
      </select>

      <label>תפקיד:</label>
      <select name="role" value={form.role} onChange={handleChange}>
        <option value="user">משתמש רגיל</option>
        {currentUser.role === "Admin" && <option value="Admin">מנהל</option>}
      </select>
      <br />

      {/* סטטוס חדש */}
      <label>סטטוס:</label>
      <select
        value={pendingStatus || form.status}
        onChange={(e) => setPendingStatus(e.target.value)}
      >
        <option value="active">פעיל</option>
        <option value="inactive">לא פעיל</option>
        <option value="blocked">חסום</option>
      </select>
      <br /><br />

      <button onClick={handleUpdate}>שמור שינויים</button>
      <button onClick={handleResetPassword}>איפוס סיסמה</button>
      <button onClick={handleChangeStatus}>שינוי סטטוס</button>
      <button onClick={() => dispatch(clearSelectedUser())}>סגור</button>


      {/* טופס הודעה שמופיע רק לאחר שינוי סטטוס */}
      {showMessageForm && (
        <div style={{
          marginTop: 20,
          padding: 20,
          background: "#fff",
          border: "1px solid #aaa",
          borderRadius: 6
        }}>
          <h3>שינית את הסטטוס, נא שלח סיבה לשינוי</h3>

          <textarea
            style={{ width: "100%", height: 120 }}
            value={statusMessage}
            onChange={(e) => setStatusMessage(e.target.value)}
            placeholder="כתוב הסבר למשתמש על שינוי הסטטוס..."
          />

          <br />

          <button onClick={handleSendMessage}>שלח הודעה</button>
          <button onClick={() => setShowMessageForm(false)}>ביטול</button>
        </div>
      )}
    </div>
  );
}