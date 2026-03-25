import { useForm } from "react-hook-form";
import api from "../components/axios";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function SignUp() {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const  [errMsg, seterrMsg] = useState("");

  const onSubmit = async (data) => {
   try {
  const res = await api.post("/signup", data);
  
  dispatch(login(res.data));
  navigate("/todo");

} catch (err) {
  if (err.response.status === 400) {
    seterrMsg(err.response.data);
    return; 
  }
  seterrMsg("Something went wrong. Please try again.");
}
  };

  return (
    <div className="p-5">
      <h2>Signup</h2>

      <p className="text-red-500">{errMsg}</p>

      <form onSubmit={handleSubmit(onSubmit)}>

        <input
          type="text"
          placeholder="Full Name"
          {...register("name")}
        />
         <input
          type="text"
          placeholder="Username"
          {...register("username")}
        />

        <input
          type="email"
          placeholder="Email"
          {...register("email")}
        />

        <input
          type="password"
          placeholder="Password"
          {...register("password")}
        />
        <input 
          type="number"
          placeholder="Age"
          {...register("age")}
        />

        <button className="bg-blue-600 x-12 y-6" type="submit">Signup</button>

      </form>
    </div>
  );
}

export default SignUp;