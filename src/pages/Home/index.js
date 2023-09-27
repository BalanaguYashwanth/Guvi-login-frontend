import { useEffect, useState } from "react";
import { HOMEPAGE, VALIDATE_DATE_REGEX } from "../../utils/constants";
import styles from "./Home.module.scss";
import {
  getDetailsFromToken,
  updateUserDetails,
  userDetails,
} from "../../utils/api.action";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { getErrorNotification } from "../../utils/helpers";

const Homepage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState(HOMEPAGE);
  const updateFormFields = ({ field, value }) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = async () => {
    const { age, gender, dob, phone, name, email } = form;
    if (age && gender && dob && phone && name && email) {
      if (dob.match(VALIDATE_DATE_REGEX)) {
        try {
          form.age = parseInt(age);
          form.gender = parseInt(gender);
          await updateUserDetails(form);
          toast.success("Successfully updated");
        } catch (err) {
          getErrorNotification(err);
        }
      } else {
        toast.error("Please enter valid date");
      }
    } else {
      toast.error("Please fill all inputs");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/login");
  };

  const getUserDetailsFromDB = async () => {
    try {
      const response = await userDetails();
      return response?.data || [];
    } catch (err) {
      getErrorNotification(err);
    }
  };

  const getUserDetails = async () => {
    try {
      let response;
      response = await getUserDetailsFromDB();
      if (response.length) {
        setForm(...response);
      } else {
        response = await getDetailsFromToken();
        const { name, email } = response.data;
        form.name = name;
        form.email = email;
        setForm({ ...form });
      }
    } catch (err) {
      getErrorNotification(err);
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    } else {
      getUserDetails();
    }
  }, []);

  const customSelect = (key) => {
    return (
      <section>
        <select
          value={form.gender}
          onChange={(e) =>
            updateFormFields({ field: `${key}`, value: e.target.value })
          }
        >
          <option value={1}>Male</option>
          <option value={2}>Female</option>
          <option value={3}>Not prefer to say</option>
        </select>
      </section>
    );
  };

  const customInput = (key) => {
    const handlePlaceholder = key === "dob" ? "mm/dd/yyyy" : key;
    return (
      <input
        value={form[key]}
        placeholder={handlePlaceholder}
        onChange={(e) =>
          updateFormFields({ field: `${key}`, value: e.target.value })
        }
        disabled={key == "email"}
      />
    );
  };

  return (
    <main className={styles.container}>
      <div>
        <Toaster />
      </div>
      <h1>Homepage</h1>
      {Object.keys(HOMEPAGE).map((key, index) => (
        <article key={index}>
          {key == "gender" ? customSelect(key) : customInput(key)}
        </article>
      ))}
      <button onClick={handleSubmit}>submit</button>
      <button onClick={handleLogout}>logout</button>
    </main>
  );
};

export default Homepage;
