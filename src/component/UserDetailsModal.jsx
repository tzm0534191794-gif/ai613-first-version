import { useDispatch, useSelector } from "react-redux";
import { updateUser, resetPassword, changeStatus } from "../store/usersSlice";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function UserDetailsModal() {
  const { id } = useParams();
  const navigate = useNavigate(); 

  const user = useSelector((state) =>
    state.users.users.find((u) => String(u.id) === String(id))
  );

  const currentUser = useSelector((state) => state.users.currentUser);
  const dispatch = useDispatch();

  const [editMode, setEditMode] = useState(false);

  const groups = ["מתכנת", "מתכונים", "מעצב", "פעילויות"];

  const [form, setForm] = useState({
    name: "",
    email: "",
    group: "",
    role: "user",
    isDeveloper: true,
    status: "active"
  });

  const [pendingStatus, setPendingStatus] = useState(null);
  const [showMessageForm, setShowMessageForm] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    if (user) {
      setForm({
        ...user,
        role: user.role || "user",
        status: user.status || "active",
        isDeveloper: user.isDeveloper ?? true
      });
    }
  }, [user]);

  if (!user) return <div>משתמש לא נמצא</div>;


  const handleUpdate = () => {
    if (currentUser.role !== "Admin") return alert("אין לך הרשאה לבצע פעולה זו");
    dispatch(updateUser(form));
    alert("פרטי המשתמש עודכנו");
    setEditMode(false);
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

    if (!pendingStatus) {
      alert("בחר סטטוס חדש לפני שינוי");
      return;
    }

    dispatch(changeStatus({ id: user.id, newStatus: pendingStatus }));
    setForm((prev) => ({ ...prev, status: pendingStatus }));

    setShowMessageForm(true);
  };

  const handleSendMessage = () => {
    alert(`הודעה נשלחה למשתמש:\n${user.email}`);

    setShowMessageForm(false);
    setPendingStatus(null);
    setStatusMessage("");
  };

  return (
    <div style={{ background: "#ddd", padding: 20 }}>
      <h2>פרטי משתמש</h2>

      {/* מצב תצוגה */}
      {!editMode && (
        <>
          <p><strong>שם:</strong> {form.name}</p>
          <p><strong>אימייל:</strong> {form.email}</p>
          <p><strong>קבוצה:</strong> {form.group}</p>
          <p><strong>סטטוס:</strong> {form.status}</p>
          <p><strong>מפתח:</strong> {form.isDeveloper ? "כן" : "לא"}</p>

          <hr />

          <button>ניהול מודלים למשתמש</button>
          <br /><br />

          <button>ניהול פיצ'רים למשתמש</button>
          <br /><br />

          <button onClick={() => setEditMode(true)}>עדכון פרטים</button>
          <br /><br />

          <button onClick={() => navigate(-1)}>חזור</button>
        </>
      )}

      {/* מצב עריכה */}
      {editMode && (
        <>
          <label>שם:</label>
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <br />

          <label>אימייל:</label>
          <input
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <br />

          <label>קבוצה:</label>
          <select
            value={form.group}
            onChange={(e) => setForm({ ...form, group: e.target.value })}
          >
            {groups.map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
          <br />

          <label>מפתח:</label>
          <input
            type="checkbox"
            checked={form.isDeveloper}
            onChange={(e) => setForm({ ...form, isDeveloper: e.target.checked })}
          />
          <br />

          <label>סטטוס חדש:</label>
          <select
            value={pendingStatus || form.status}
            onChange={(e) => setPendingStatus(e.target.value)}
          >
            <option value="active">פעיל</option>
            <option value="inactive">לא פעיל</option>
            <option value="blocked">חסום</option>
          </select>

          <button onClick={handleChangeStatus}>שינוי סטטוס</button>

          <br /><br />

          <button onClick={handleUpdate}>שמור שינויים</button>
          <button onClick={handleResetPassword}>איפוס סיסמה</button>
          <button onClick={() => setEditMode(false)}>חזור</button>
        </>
      )}

      {showMessageForm && (
        <div style={{
          marginTop: 20,
          padding: 20,
          background: "#fff",
          border: "1px solid #aaa",
          borderRadius: 6
        }}>
          <h3>שינית את הסטטוס, נא שלח סיבה למשתמש</h3>

          <textarea
            style={{ width: "100%", height: 120 }}
            value={statusMessage}
            onChange={(e) => setStatusMessage(e.target.value)}
            placeholder="כתוב הסבר למשתמש..."
          />

          <br /><br />

          <button onClick={handleSendMessage}>שלח הודעה</button>
          <button onClick={() => setShowMessageForm(false)}>ביטול</button>
        </div>
      )}
    </div>
  );
}
