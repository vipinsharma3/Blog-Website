import {Link, useNavigate} from "react-router-dom";
import useUser from "./hooks/useUser";
import {getAuth, signOut} from "firebase/auth";

const Navbar = () => {
  const navigate = useNavigate();
  const {user} = useUser();
  return (
    <div className="flex justify-around text-xl font-semibold p-8 border-b-4 border-black">
      <ul className="flex gap-16 justify-center basis-3/4">
        <li className="text-2xl hover:text-3xl transition-all">
          <Link to={"/"}>Home</Link>
        </li>
        <li className="text-2xl hover:text-3xl transition-all">
          <Link to={"/about"}>About</Link>
        </li>
        <li className="text-2xl hover:text-3xl transition-all">
          <Link to={"/articles"}>Articles</Link>
        </li>
      </ul>
      <div className="transition p-1 px-4 rounded-md cursor-pointer text-white ease-in-out delay-150 bg-black hover:-translate-y-1 hover:scale-110 hover:bg-slate-500 duration-100" >
        {user ? (
          <button
            onClick={() => {
              signOut(getAuth());
            }}
          >
            Log Out
          </button>
        ) : (
          <button
            onClick={() => {
              navigate("/login");
            }}
          >
            Log In
          </button>
        )}
      </div>
    </div>
  );
};
export default Navbar;
