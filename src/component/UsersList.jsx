import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../store/usersSlice";

export default function UsersList() {
  const users = useSelector(state => state.users.users);
  const dispatch = useDispatch();

  const groups = [
    "מתכנת",
    "מתכונים",
    "מעצב",
    "פעילויות"
  ];

  const statusMap = {
    active: "פעיל",
    inactive: "לא פעיל",
    blocked: "חסום"
  };

  return (
    <div>
      <h2>רשימת משתמשים</h2>
      <table border="1">
        <thead>
          <tr>
            <th>שם</th>
            <th>אימייל</th>
            <th>קבוצה</th>
            <th>תפקיד</th>
            <th>סטטוס</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.group}</td>
              <td>{u.role}</td>
              <td>{statusMap[u.status]}</td>

              <td>
                <button onClick={() => dispatch(selectUser(u))}>פרטים</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}