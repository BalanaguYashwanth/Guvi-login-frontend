import { useState } from "react";
import {
  REGISTRATION_FORM_FIELDS,
  VALIDATE_EMAIL_REGEX,
} from "../../utils/constants";
import styles from "./Register.module.scss";
import { registerUser } from "../../utils/api.action";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const Registration = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState(REGISTRATION_FORM_FIELDS);

  const updateFormFields = ({ field, value }) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = async () => {
    const { name, email, password, confirmpassword } = form;
    if (name && email && password && confirmpassword) {
      if (password.length > 4) {
        if (password == confirmpassword) {
          if (email.match(VALIDATE_EMAIL_REGEX)) {
            try {
              await registerUser(form);
              navigate("/login");
            } catch (err) {
              const response =
                err?.response?.data.message ||
                "something went wrong please try again";
              toast.error(response);
            }
          } else {
            toast.error("Enter valid email address");
          }
        } else {
          toast.error("Password and confirm password are not match");
        }
      } else {
        toast.error("Password should be more than 4 characters");
      }
    } else {
      toast.error("please fill all inputs");
    }
  };

  return (
    <main className={styles.container}>
      <div>
        <Toaster />
      </div>
      <h1> Registration</h1>
      <input
        placeholder="Name"
        onChange={(e) =>
          updateFormFields({ field: "name", value: e.target.value })
        }
      />
      <input
        placeholder="Email"
        onChange={(e) =>
          updateFormFields({ field: "email", value: e.target.value })
        }
      />
      <input
        placeholder="Password"
        onChange={(e) =>
          updateFormFields({ field: "password", value: e.target.value })
        }
        type="password"
      />
      <input
        placeholder="Confirm Password"
        onChange={(e) =>
          updateFormFields({ field: "confirmpassword", value: e.target.value })
        }
        type="password"
      />
      <button onClick={handleSubmit}>submit</button>
      <Link to="/login"> Login{">>"} </Link>
    </main>
  );
};

export default Registration;
