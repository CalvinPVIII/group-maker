import UserForm from "./UserForm";
import "../css/UserPage.css";

export default function UserPage() {
  return (
    <div className="user-page">
      <div className="login">
        <UserForm type="login" />
      </div>
      <div className="register">
        <UserForm type="register" />
      </div>
    </div>
  );
}
