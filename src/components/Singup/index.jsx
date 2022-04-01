import { useState, useMemo } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import countryList from "react-select-country-list";
import Select from "react-select";
import GoogleLogin from "react-google-login";
var validator = require("email-validator");

const Signup = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
    country: "India",
  });

  const onSuccess = async(responce) => {
    const info = {
      email: responce.profileObj.email.toString(),
      password: "Wiingy@123",
      country: "India",
      }
  
      console.log(info);
      const url = "https://wiingy-server-uploading.herokuapp.com/api/users";
      const { data: res } =  await axios.post(url, info);
      window.location = `http://wiinblock.wiingy.com/`;
  };

  var clientId="389681026604-oqsvf31fu8i5okatgsk22kjrdt17qken.apps.googleusercontent.com"
  
  const onFailure = (res) => {
    console.log(res);
  };

  const options = useMemo(() => countryList().getData(), []);

  const [error, setError] = useState("");

  const [dropdown, setDropdown] = useState("India");

  const handleChangeEmail = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value.toString() });
  };

  const handleChangePassword = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value.toString() });
  };

  const handleDropdown = (event) => {
    setDropdown(event);
    setData({ ...data, country: event.label.toString() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if(validator.validate(data.email) || !isNaN(data.email))
      {
          const url = "https://wiingy-server-uploading.herokuapp.com/api/users";
          const { data: res } = await axios.post(url, data);
          window.location = `http://wiinblock.wiingy.com/`;
          console.log(res.message);
      }
      else
      {
          setError('Invalid Email or Phone');
      }
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <div>
      <nav className={styles.navbar}>
        <h1>Wiingy</h1>
      </nav>
      <div className={styles.signup_container}>
        <div className={styles.signup_form_container}>
          <div className={styles.right}>
            <form className={styles.form_container} onSubmit={handleSubmit}>
              <h1>Create Account</h1>
              <div className={styles.dropdown}>
                <Select
                  name="country"
                  options={options}
                  value={dropdown}
                  onChange={handleDropdown}
                  placeholder="Select Your Country"
                />
              </div>
              <input
                placeholder="Email or Phone"
                name="email"
                onChange={handleChangeEmail}
                value={data.email}
                required
                className={styles.input}
              />
              <input
                type="password"
                placeholder="Password"
                name="password"
                onChange={handleChangePassword}
                value={data.password}
                required
                className={styles.input}
              />
              {error && <div className={styles.error_msg}>{error}</div>}
              <button type="submit" className={styles.green_btn}>
                Sign Up
              </button>
            </form>
            <div className={styles.space}>
            <GoogleLogin
              clientId={clientId}
              buttonText="Sign In With Google"
              onSuccess={onSuccess}
              onFailure={onFailure}
              cookiePolicy={"single_host_origin"}
            />
            </div>
            <Link to="/login">
              <button type="button" className={styles.white_btn}>
                Already a member! Sign in
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
