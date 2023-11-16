import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {getAuth, signInWithEmailAndPassword} from "firebase/auth";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const logIn = async () => {
    try {
      await signInWithEmailAndPassword(getAuth(), email, password);
      navigate("/articles");
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <>
      <h1 className="font-bold text-center text-2xl p-2 mb-6">Login Page</h1>
      {error && <p>{error}</p>}
      <input
        className="m-2 p-2 mr-8 border-2 border-black"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="m-2 mr-8 p-2 border-2 border-black"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
      />
      <button
        className="mx-4 p-2 px-4 rounded-md cursor-pointer text-white bg-black hover:bg-blue-600"
        onClick={logIn}
      >
        Log In
      </button>
      <Link className="mx-4  p-4 text-blue-600" to={"/create-account"}>Don't have account?Create one here</Link>
    </>
  );
};
export default LoginPage;
