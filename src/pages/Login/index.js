import { useState } from "react";
import styles from "./Login.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { LOGIN_FIELD } from "../../utils/constants";
import toast, { Toaster } from "react-hot-toast";
import { loginUser } from "../../utils/api.action";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState(LOGIN_FIELD);

  const updateFormFields = ({ field, value }) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = async () => {
    const { email, password } = form;
    if (email && password) {
      try {
        const response = await loginUser(form);
        const accessToken = response?.data?.accessToken || "";
        localStorage.setItem("accessToken", accessToken);
        navigate("/");
      } catch (err) {
        const response =
          err?.response?.data.message ||
          "something went wrong please try again";
        toast.error(response);
      }
    } else {
      toast.error("please fill all fields");
    }
  };

  return (
    <main className={styles.container}>
      <div>
        <Toaster />
      </div>
      <h1> Login </h1>
      <input
        placeholder="Email"
        onChange={(e) =>
          updateFormFields({ field: "email", value: e.target.value })
        }
      />
      <input
        placeholder="Password"
        type="password"
        onChange={(e) =>
          updateFormFields({ field: "password", value: e.target.value })
        }
      />
      <button onClick={handleSubmit}>submit</button>
      <Link to="/register">  {"<<"} Register{''}  </Link>
    </main>
  );
};

export default Login;
