import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {getAuth, createUserWithEmailAndPassword} from "firebase/auth";

const CreateAccountPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const createAccount = async () => {
    try {
      if (password !== confirmPassword) {
        setError("Password and Confirm Password does not match.");
        return;
      }
      await createUserWithEmailAndPassword(getAuth(), email, password);
      navigate("/articles");
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <>
      <h1 className="font-bold text-center text-2xl p-2 mb-6">
        Create Account
      </h1>
      {error && <p>{error}</p>}
      <input
        className="m-2 p-2 mr-8 border-2 border-black"
        placeholder="Enter email"
        value={email}
        onChange={(elem) => setEmail(elem.target.value)}
      />
      <input
        className="m-2 p-2 mr-8 border-2 border-black"
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(elem) => setPassword(elem.target.value)}
      />
      <input
        className="m-2 p-2 mr-8 border-2 border-black"
        type="password"
        placeholder="Enter Confirm Password"
        value={confirmPassword}
        onChange={(elem) => setConfirmPassword(elem.target.value)}
      />
      <button
        className="mx-4 p-2 px-4 rounded-md cursor-pointer text-white bg-black hover:bg-blue-600"
        onClick={createAccount}
      >
        Create Account
      </button>
      <Link className="mx-4  p-4 text-blue-600" to={"/login"}>
        Already have a account!
      </Link>
    </>
  );
};
export default CreateAccountPage;
