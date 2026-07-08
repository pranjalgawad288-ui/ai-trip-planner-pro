import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { validateEmail } from "../utils/validators";

export default function Login() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async ({ email, password }) => {
    try {
      const { error } = await signIn(email, password);
      if (error) throw error;
      toast.success("Welcome back!");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.message || "Login failed");
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
        <h1 className="text-2xl font-bold font-poppins mb-2 text-white">Welcome back</h1>
        <p className="text-white/80 text-sm mb-8">Log in to continue planning your trips.</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && <p className="text-danger text-xs mt-1">{errors.password.message}</p>}
          </div>

          <div className="flex justify-end">
            <Link to="/forgot-password" className="text-sm text-white/90 hover:underline">
              Forgot password?
            </Link>
          </div>

          <button type="submit" disabled={isSubmitting} className="btn-primary w-full !bg-white !text-primary">
            {isSubmitting ? "Logging in..." : "Log in"}
          </button>
        </form>

        <p className="text-white/80 text-sm text-center mt-6">
          Don&apos;t have an account?{" "}
          <Link to="/signup" className="font-semibold text-white hover:underline">
            Sign up
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
