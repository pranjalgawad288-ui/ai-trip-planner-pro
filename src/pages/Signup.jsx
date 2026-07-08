import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { validateEmail, validatePassword, validateConfirmPassword } from "../utils/validators";

export default function Signup() {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const password = watch("password");

  const onSubmit = async ({ fullName, email, password }) => {
    try {
      const { error } = await signUp(email, password, fullName);
      if (error) throw error;
      toast.success("Account created! Check your email to verify.");
      navigate("/login");
    } catch (err) {
      toast.error(err.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 gradient-bg">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="glass rounded-3xl p-10 w-full max-w-md"
      >
        <h1 className="text-2xl font-bold font-poppins mb-2 text-white">Create your account</h1>
        <p className="text-white/80 text-sm mb-8">Start planning smarter trips with AI.</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Full name"
              className="input-field bg-white/90"
              {...register("fullName", { required: "Full name is required" })}
            />
            {errors.fullName && <p className="text-danger text-xs mt-1">{errors.fullName.message}</p>}
          </div>

          <div>
            <input
              type="email"
              placeholder="Email address"
              className="input-field bg-white/90"
              {...register("email", { required: "Email is required", validate: validateEmail })}
            />
            {errors.email && <p className="text-danger text-xs mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              className="input-field bg-white/90"
              {...register("password", { required: "Password is required", validate: validatePassword })}
            />
            {errors.password && <p className="text-danger text-xs mt-1">{errors.password.message}</p>}
          </div>

          <div>
            <input
              type="password"
              placeholder="Confirm password"
              className="input-field bg-white/90"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: validateConfirmPassword(password),
              })}
            />
            {errors.confirmPassword && <p className="text-danger text-xs mt-1">{errors.confirmPassword.message}</p>}
          </div>

          <button type="submit" disabled={isSubmitting} className="btn-primary w-full !bg-white !text-primary">
            {isSubmitting ? "Creating account..." : "Sign up free"}
          </button>
        </form>

        <p className="text-white/80 text-sm text-center mt-6">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-white hover:underline">
            Log in
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
