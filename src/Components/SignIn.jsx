export default function SignIn(props) {
  const handleSignIn = (e) => {
    e.preventDefault();

    props.changeState("home");
  };
  return (
    <>
      <form onSubmit={(e) => handleSignIn(e)}>
        <h1>Sign In</h1>
        <label>
          Email: <input type="text" name="email" />
        </label>
        <br />
        <label>
          Password: <input type="password" name="password" />
        </label>
        <br />
        <input type="submit" value="Sign In" />
      </form>
    </>
  );
}
