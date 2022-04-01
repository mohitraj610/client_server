import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import GoogleLogin from "react-google-login";

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const onSuccess = async (responce) => {
	  const info = {
      email: responce.profileObj.email.toString(),
      password: "Wiingy@123",
      country: "India",
      }
      
      try{
        const url = "https://wiingy-server-uploading.herokuapp.com/api/users";
        const { data: res } =  await axios.post(url, info);
      }
      catch (error)
      {
        console.log('Already have an account')
      }
      window.location = `http://wiinblock.wiingy.com/`;
  };

  var clientId="389681026604-oqsvf31fu8i5okatgsk22kjrdt17qken.apps.googleusercontent.com"

  const onFailure = (res) => {
    console.log(res);
  };

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "https://wiingy-server-uploading.herokuapp.com/api/auth";
      const { data: res } = await axios.post(url, data);
      localStorage.setItem("token", res.data);
      window.location = `http://wiinblock.wiingy.com/`;
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
      <div className={styles.login_container}>
        <div className={styles.login_form_container}>
          <div className={styles.left}>
            <form className={styles.form_container} onSubmit={handleSubmit}>
              <h1>Login</h1>
              <input
                placeholder="Email or Phone"
                name="email"
                onChange={handleChange}
                value={data.email}
                required
                className={styles.input}
              />
              <input
                type="password"
                placeholder="Password"
                name="password"
                onChange={handleChange}
                value={data.password}
                required
                className={styles.input}
              />
              {error && <div className={styles.error_msg}>{error}</div>}
              <button type="submit" className={styles.green_btn}>
                Sign In
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
            <Link to="/signup">
              <button type="button" className={styles.white_btn}>
                New Here? Sign Up
              </button>
            </Link>
            <button type="button" className={styles.white_btn}>
              Forgot Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
