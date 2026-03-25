import { useState } from "react";
import api from "../components/axios";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (event) => {  // event click enter or submit button 
    event.preventDefault(); // submit k bad data loss na ho bcz it redirect when you submit

    try {
      const res = await api.post("/login", { email, password });
      dispatch(login(res.data));
      navigate("/todo");
    } catch (err) {
      if (err.response.status === 400) {
        setErrMsg(err.response.data); // backend say jo response aya same show kry ga
      } else {
        setErrMsg("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="p-5 text-white">
      <h2>Login</h2>
      <p className="text-red-500">{errMsg}</p>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="bg-blue-600 px-4 py-2" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;