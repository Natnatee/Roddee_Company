import { useEffect, useState  } from "react";
import Tesla from "../../src/assets/Login/Tesla1.png";
import ShowEye from "../../src/assets/Login/Showpassword.png";
import HideEye from "../../src/assets/Login/Hidepassword.png";
import { loginUser } from '../components/API/API_Users';
import { useNavigate, useLocation } from "react-router-dom";
import { registerUser } from "../components/API/API_Users";
import { FormContext } from "../context_component/Regiscontext";
import { useContext } from "react";




function LoginAndRegister() {
  const [email, setEmail] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(true);
  const [hideConfirmPassword, setHideConfirmPassword] = useState(true);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailErrorRegister, setEmailErrorRegister] = useState("");
  const [passwordErrorRegister, setPasswordErrorRegister] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  // const [isRegistering, setIsRegistering] = useState(false);
  const [loginError, setLoginError] = useState("");
  
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [pnumber, setPnumber] = useState("");

  const { isRegistering, setIsRegistering } = useContext(FormContext);
  const navigate = useNavigate();




  

  useEffect(() => {
    const validateEmail = () => {
      if (email === "") {
        setEmailError("");
        return;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setEmailError("โปรดระบุที่อยู่อีเมลล์ให้ถูกต้อง");
      } else {
        setEmailError("");
      }
    };
    const validatePassword = () => {
      if (password === "") {
        setPasswordError("");
      } else if (password.length < 6) {
        setPasswordError(
          "รหัสผ่านผิด, ต้องมีจำนวนอย่างน้อย 6 ตัว"
        );
      } else {
        setPasswordError("");
      }
    };
    validateEmail();
    validatePassword();
  }, [email, password]);

// ---------------validate for register------------
  useEffect(() => {
    const validateEmailRegister = () => {
      if (registerEmail === "") {
        setEmailErrorRegister("");
        return;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(registerEmail)) {
        setEmailErrorRegister("โปรดระบุที่อยู่อีเมลล์ให้ถูกต้อง");
      } else {
        setEmailErrorRegister("");
      }
    };
    const validatePasswordRegister = () => {
      if (registerPassword === "") {
        setPasswordErrorRegister("");
      } else if (registerPassword.length < 6) {
        setPasswordErrorRegister(
          "รหัสผ่านผิด, ต้องมีจำนวนอย่างน้อย 6 ตัว"
        );
      } else {
        setPasswordErrorRegister("");
      }
    };
    const validateConfirmPassword = () => {
      if (confirmPassword === "") {
        setConfirmPasswordError("");
      } else if (confirmPassword !== registerPassword) {
        setConfirmPasswordError("รหัสผ่านไม่ตรงกัน");
      } else {
        setConfirmPasswordError("");
      }
    };
    validateEmailRegister();
    validatePasswordRegister();
    validateConfirmPassword();
  }, [registerEmail, registerPassword, confirmPassword]);



  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isRegistering) {
      await handleRegister();
    } else {
      await handleLogin();
    }
  };


// function กดปุ่ม login
//แก้เป็น async เพราะมีการต่อAPI
  const handleLogin = async(e) => {
    setLoginError("");
    // e.preventDefault();
    // if (!emailError && !passwordError) {
    //   alert(
    //     `ล็อคอินสำเร็จ.`
    //   );
    if (!emailError && !passwordError) {
      try {
        const user = await loginUser(email, password);
        if (user && user.access_token) {
          localStorage.setItem("token", user.access_token);
          navigate("/");
          alert(
                `ล็อคอินสำเร็จ.`
              );
          window.location.reload();
        } else {
          setLoginError( <p className="text-red-500 text-[12px]">อีเมลหรือรหัสผ่านไม่ถูกต้อง</p>);
        }
      } catch (error) {
        setLoginError( <p className="text-red-500 text-[12px]">อีเมลหรือรหัสผ่านไม่ถูกต้อง</p>);
        console.error("Login error:", error);
      }
      
      console.log(email, password);
    } else if (emailError && passwordError) {
      alert("Please fix the email address and password errors in the form.");
    } else if (emailError) {
      alert("Please fix the email address error in the form.");
    } else if (passwordError) {
      alert("Please fix the password error in the form.");
    } else {
      console.log("Unknown error, please refresh your browser");
    }
    //ยิง API login
    const user = await loginUser(email, password);
    // Handle successful login
    if (user && user.access_token){
      localStorage.setItem("token", user.access_token)
      navigate("/")
      window.location.reload();
    }
  }
  // function กดปุ่ม Register
  const handleRegister = async () => {
    if (!emailError && !passwordError && registerPassword === confirmPassword) {
      const user = await registerUser(firstName, lastName, registerEmail, registerPassword, confirmPassword, pnumber);
      if (user && user.access_token) {
        localStorage.setItem("token", user.access_token);
        navigate("/");
      } else {
        alert("Please verify your email to complete registration");
        navigate("/");
      }
    } else {
      alert("Please fix the errors in the form or make sure passwords match");
    }
  };


  
  //  function ซ่อน password
  function handleHidePassword(e) {
    e.preventDefault();
    setHidePassword(!hidePassword);
  }

  function handleHideConfirmPassword(e) {
    e.preventDefault();
    setHideConfirmPassword(!hideConfirmPassword);
  }

  // function สลับหน้า login and register
  function handleToggleForm() {
    setIsRegistering(!isRegistering);
  }

 



  return (
    // login form
      
    
    <section>
      
      
      <img
        src={Tesla}
        className="w-full h-[911px] absolute object-cover "
        alt="Loginbg"
      />

      <div className="flex justify-center">
        <div className="w-[1440px] relative flex justify-end ">
          <form
            onSubmit={handleSubmit}
            className={`bg-white h-[772px] w-[456px] absolute mt-[104px] rounded-[10px] shadow-md transition opacity duration-500  
                ${
                  !isRegistering
                    ? "opacity-100 pointer-events-auto"
                    : "opacity-0 pointer-events-none"
                }`}
          >
            <div className="mx-[48px] mt-[128px]">
              <span className="text-[24px] font-bold">ยินดีต้อนรับกลับมา!</span>
              <div className="mt-[24px] mb-[16px]">
                <h3 className="text-[12px] font-medium text-gray-900 mb-[8px]">
                  อีเมล
                </h3>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`bg-gray-100 border border-gray-300 text-gray-900 sm:text-sm rounded-[6px] focus:ring-primary-600 focus:border-primary-600 w-[360px] h-[48px] 
                      ${emailError ? "border-red-500" : ""}`}
                  placeholder="name@company.com  "
                />
                {emailError && email !== "" && (
                  <p className="text-red-500  text-[12px]  ">{emailError}</p>
                )}
              </div>

              <div className="mb-[16px]">
                <h3 className="text-[12px] font-medium text-gray-900 mb-[8px]">
                  รหัสผ่าน
                </h3>
                <div className="flex">
                  <input
                    type={hidePassword ? "password" : "text"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••  "
                    className={`bg-gray-100 border border-gray-300 text-gray-900 sm:text-sm rounded-[6px] relative focus:border-primary-600 w-[360px] h-[48px] ${
                      passwordError ? "border-red-500" : ""
                    }`}
                  />

                  <img
                    onClick={handleHidePassword}
                    src={hidePassword ? ShowEye : HideEye}
                    className=" cursor-pointer absolute place-self-center ml-[328px]"
                    alt={hidePassword ? "hide password" : "show password"}
                  />
                </div>

                {passwordError && password !== "" && (
                  <p className="text-red-500 text-[12px] ">{passwordError}</p>
                )}
              </div>

              <div className="flex place-content-between">
                <div className="flex">
                  <div className="flex items-center">
                    <input
                      id="terms"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-primary-300"
                      required=""
                    />
                  </div>
                  <div className="ml-3 text-[12px] place-self-center">
                    <label htmlfor="terms" />
                    เข้าสู่ระบบตลอดเวลา
                  </div>
                </div>

                <div>
                  <a
                    href="#"
                    className="text-[12px] over:underline text-red-600"
                  >
                    ลืมรหัสผ่าน?
                  </a>
                </div>
              </div>
              {loginError && <p className="error">{loginError}</p>}
              <button
                type="submit"
                className=" text-white bg-[#1E3769] my-[32px] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-[6px] text-sm text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 w-[360px] h-[40px]"
              >
                เข้าสู่ระบบ
              </button>

              <div className="flex ">
                <div className="mb-[32px] flex-grow border-t-[0.5px] border-gray-400"></div>
                <span className="mx-4 -mt-3 text-gray-500 text-sm">หรือ</span>
                <div className="flex-grow border-t-[0.5px] border-gray-400"></div>
              </div>

              <button
                type="button"
                onClick={handleToggleForm}
                className=" text-white bg-[#333333]  mb-[24px] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-[6px] text-sm text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 w-[360px] h-[40px]"
              >
                หรือสมัครสมาชิก
              </button>    
            </div>
          </form>


          {/* -------------------------------------register form ---------------------------------------------*/}

          {/* <div className={`transition-transform duration-500 ${isRegistering ? 'translate-x-0' : 'translate-x-full'}`}> */}

          <form
            onSubmit={handleSubmit}
            className={`bg-white h-auto w-[456px] relative mt-[80px] rounded-[10px] shadow-md transition opacity duration-500  
                ${
                  !isRegistering
                    ? "opacity-0 pointer-events-none"
                    : "opacity-100 pointer-events-auto"
                }`}
            // className={`bg-white h-[772px] w-[456px] relative mt-[104px] rounded-[10px] shadow-md transition-transform duration-500 ${isRegistering ? 'translate-x-20' : 'translate-x-0'}`}
          >
            <div className="mx-[48px] mt-[16px]">
              <span className="text-[24px] font-bold">สร้างบัญชีของคุณ</span>
              <div className="mt-[24px] mb-[16px]">
                <h3 className="text-[12px] font-medium text-gray-900 mb-[4px]">
                  อีเมล
                </h3>
                <input
                  type="email"
                  name="email"
                  value={registerEmail}
                  onChange={(e) => setRegisterEmail(e.target.value)}
                  className={`bg-gray-100 border border-gray-300 text-gray-900 sm:text-sm rounded-[6px] focus:ring-primary-600 focus:border-primary-600 w-[360px] h-[48px] 
                    ${emailErrorRegister ? "border-red-500" : ""}`}
                  placeholder="name@company.com  "
                />
                {emailErrorRegister && registerEmail !== "" && (
                  <p className="text-red-500  text-[12px]">{emailErrorRegister}</p>
                )}
              </div>

              <div className="mb-[16px]">
                <h3 className="text-[12px] font-medium text-gray-900 mb-[8px]">
                  ชื่อจริง
                </h3>
                <input
                  type="name"
                  name="name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="bg-gray-100 border border-gray-300 text-gray-900 sm:text-sm rounded-[6px] focus:ring-primary-600 focus:border-primary-600 w-[360px] h-[48px]"
                  placeholder="   ชื่อจริง  "
                />
              </div>

              <div className="mb-[16px]">
                <h3 className="text-[12px] font-medium text-gray-900 mb-[8px]">
                  นามสกุล
                </h3>
                <input
                  type="surname"
                  name="surname"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="bg-gray-100 border border-gray-300 text-gray-900 sm:text-sm rounded-[6px] focus:ring-primary-600 focus:border-primary-600 w-[360px] h-[48px]"
                  placeholder="   นามสกุล  "
                />
              </div>

              <div className="mb-[16px]">
                <h3 className="text-[12px] font-medium text-gray-900 mb-[8px]">
                  เบอร์
                </h3>
                <input
                  type="phonenumber"
                  value={pnumber}
                  onChange={(e) => setPnumber(e.target.value)}
                  className="bg-gray-100 border border-gray-300 text-gray-900 sm:text-sm rounded-[6px] focus:ring-primary-600 focus:border-primary-600 w-[360px] h-[48px]"
                  placeholder="   ใส่เบอร์ของคุณ "
                />
              </div>

              <div className="mb-[16px]">
                <h3 className="text-[12px] font-medium text-gray-900 mb-[8px]">
                  รหัสผ่าน
                </h3>
                <div className="flex">
                  <input
                    type={hidePassword ? "password" : "text"}
                    value={registerPassword}
                    onChange={(e) => setRegisterPassword(e.target.value)}
                    placeholder="••••••••  "
                    className={`bg-gray-100 border border-gray-300 text-gray-900 sm:text-sm rounded-[6px] relative focus:border-primary-600 w-[360px] h-[48px] ${
                      passwordErrorRegister ? "border-red-500" : ""
                    }`}
                  />

                  <img
                    onClick={handleHidePassword}
                    src={hidePassword ? ShowEye : HideEye}
                    className=" cursor-pointer absolute place-self-center ml-[328px]"
                    alt={hidePassword ? "hide password" : "show password"}
                  />
                </div>

                {passwordErrorRegister && registerPassword !== "" && (
                  <p className="text-red-500 text-[12px] ">{passwordErrorRegister}</p>
                )}
              </div>

{/*------------- confirmPassword -------------------*/}
              <div className="mb-[16px]">
                <h3 className="text-[12px] font-medium text-gray-900 mb-[8px]">
                  ยืนยันรหัสผ่านรหัสผ่าน
                </h3>
                <div className="flex">
                  <input
                    type={hideConfirmPassword ? "password" : "text"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••  "
                    className={`bg-gray-100 border border-gray-300 text-gray-900 sm:text-sm rounded-[6px] relative focus:border-primary-600 w-[360px] h-[48px] ${
                      confirmPasswordError ? "border-red-500" : ""
                    }`}
                  />

                  <img
                    onClick={handleHideConfirmPassword}
                    src={hideConfirmPassword ? ShowEye : HideEye}
                    className=" cursor-pointer absolute place-self-center ml-[328px]"
                    alt={hideConfirmPassword ? "hide password" : "show password"}
                  />
                </div>

                {confirmPasswordError && confirmPassword !== "" && (
                  <p className="text-red-500 text-[12px] ">{confirmPasswordError}</p>
                )}
              </div>

              {/* <div className="flex ">
                <div className="flex">
                  <div className="flex items-center">
                    <input
                      id="terms"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-primary-300"
                      required="true"
                    />
                  </div>
                  <div className="ml-3 text-[12px] place-self-center">
                    ยอมรับ
                  </div>
                </div>

                <div>
                  <a href="#" className="text-[12px]  text-red-600 ">
                    เงื่อนไขสำหรับการสมัครสมาชิกและนโยบายความเป็นส่วนตัว
                  </a>
                </div>
              </div> */}

      
              <button
                type="submit"
                className=" text-white bg-[#1E3769] mt-[16px] mb-[32px] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-[6px] text-sm text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 w-[360px] h-[40px]"
              >
                สมัครสมาชิก
              </button>

              <div className="flex ">
                <div className="mb-[32px] flex-grow border-t-[0.5px] border-gray-400"></div>
                <span className="mx-4 -mt-3 text-gray-500 text-sm">หรือ</span>
                <div className="flex-grow border-t-[0.5px] border-gray-400"></div>
              </div>

              <button
                type="button"
                onClick={handleToggleForm}
                className=" text-white bg-[#333333]  mb-[24px] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-[6px] text-sm text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 w-[360px] h-[40px]"
              >
                หรือเข้าสู่ระบบ
              </button>

             
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default LoginAndRegister;










