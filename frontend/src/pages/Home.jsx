import { Link } from "react-router-dom";


function Home() {
  return (
    <div className="container">
      <h1>Task Manager App</h1>
      <br />
      <Link to="/login">
        <button>Login</button>
      </Link>
      <br /><br />
      <Link to="/register">
        <button>Register</button>
      </Link>
    </div>
  );
}

export default Home;