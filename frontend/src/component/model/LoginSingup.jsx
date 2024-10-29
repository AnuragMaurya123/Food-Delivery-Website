import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { GrFacebookOption, GrGithub, GrGooglePlus } from "react-icons/gr";
import { AuthContext } from "../../context/AuthProvider";
import { Link, useNavigate } from "react-router-dom";

const LoginSingup = () => {
  const { googlelogin,login,error,setError,createUser,modalRef,model, setModel } = useContext(AuthContext);
  const navigate=useNavigate()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  
  //function for change models
  const handleModelChange = (modelName) => {
    setModel(modelName);
    setError(null);
    reset();
  };

  //function for login
  const onSubmitLoginForm = async (data) => {
    await login(data.email,data.password)
    navigate("/")
    
  };

  //function for Signup
  const onSubmitSignupForm = async (data) => {
    await createUser(data.email,data.password)
    navigate("/") 
  };

  //function for Google Login
  const handleGoogleLogin = async () => {
      await googlelogin();
      navigate("/") 
  };

  return (
    <dialog ref={modalRef} id={model === "login" ? "login" : "signup"} className="modal">
      <div className="modal-box">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 bg-slate-300 top-2">✕</button>
        </form>

        <div className="flex flex-col items-center justify-center gap-7">
          <h3 className="font-bold text-lg">{model === "login" ? "Please Login" : "Please Signup"}</h3>
          <form onSubmit={model === "login" ? handleSubmit(onSubmitLoginForm) : handleSubmit(onSubmitSignupForm)} className="">
            <div className="flex flex-col gap-2">
            <h1 className="mt-2">Email</h1>
              <label className="input input-bordered flex items-center gap-3">
                <input
                  type="email"
                  name="email"
                  autoComplete="on"
                  className="grow"
                  placeholder="Enter Email"
                  {...register("email", { required: "Email is required" })}
                />
              </label>
              {errors.email && <p className="text-red text-sm">{errors.email.message}</p>}
            </div>

            <div className="flex flex-col gap-2">
            <h1 className="mt-4">Password</h1>
              <label className="input input-bordered flex items-center gap-3">
                
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  autoComplete="on"
                  className="grow"
                  {...register("password", { required: "Password is required" })}
                />
              </label>
              {errors.password && <p className="text-red text-sm">{errors.password.message}</p>}
            </div>

            {error && <p className="text-red font-semibold text-sm mt-3">{error}</p>}
           {model==="login" ?  <p className="text-sm mt-4"><Link to="">Forget Password?</Link></p>:null}

            <button type="submit" className="btn bg-green w-full text-white mt-5">
              {model === "login" ? "Login" : "Signup"}
            </button>

            <p className="mt-5 text-textColor text-center">
           {model === "login" ? " Don't have an account? " : "Have an Account? "}
              <span className="text-red  underline  font-medium ml-1 cursor-pointer" onClick={() => handleModelChange(model === "login" ? "signup" : "login")}>
               {model === "login" ? "Signup" : "Login"}
              </span>
            </p>
          </form>

          <div className="flex items-center justify-center gap-4">
            <div className="text-2xl rounded-full px-3 py-3 bg-slate-200 hover:bg-green hover:text-white" onClick={handleGoogleLogin}>
              <GrGooglePlus />
            </div>
            <div className="text-2xl rounded-full px-3 py-3 bg-slate-200 hover:bg-green hover:text-white">
              <GrFacebookOption />
            </div>
            <div className="text-2xl rounded-full px-3 py-3 bg-slate-200 hover:bg-green hover:text-white">
              <GrGithub />
            </div>
          </div>
        </div>
      </div>
    </dialog>
  );
};

export default LoginSingup;
