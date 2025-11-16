import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addPrompt, approvePrompt, selectPrompt } from "../store/promptsSlice";

export default function PromptManager() {
  const dispatch = useDispatch();
  const prompts = useSelector(state => state.prompts.prompts);
  const currentUser = useSelector(state => state.users.currentUser);

  const [newPrompt, setNewPrompt] = useState({ text: "", topic: "" });

  const canManage = currentUser?.role === "Admin";

  return (
    <div>
      <h1>ניהול פרומפטים</h1>

      {canManage && (
        <div style={{ marginBottom: 20 }}>
          <h3>הצעת פרומפט חדש</h3>
          <input
            placeholder="טקסט הפרומפט"
            value={newPrompt.text}
            onChange={e => setNewPrompt({ ...newPrompt, text: e.target.value })}
          />
          <input
            placeholder="תחום הפרומפט"
            value={newPrompt.topic}
            onChange={e => setNewPrompt({ ...newPrompt, topic: e.target.value })}
          />
          <button onClick={() => {
            dispatch(addPrompt(newPrompt));
            setNewPrompt({ text: "", topic: "" });
          }}>שלח הצעה</button>
        </div>
      )}

      <h2>רשימת פרומפטים</h2>
      <ul>
        {prompts.map(p => (
          <li key={p.id}>
            <strong>{p.topic}:</strong> {p.text} 
            {p.approved ? " ✅" : " ❌"}
            {canManage && !p.approved && (
              <button onClick={() => dispatch(approvePrompt(p.id))}>אשר שימוש</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}