import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { validatePassword, validateConfirmPassword } from "../utils/validators";

export default function ResetPassword() {
  const { updatePassword } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const password = watch("password");

  const onSubmit = async ({ password }) => {
    try {
      const { error } = await updatePassword(password);
      if (error) throw error;
      toast.success("Password updated. Please log in.");
      navigate("/login");
    } catch (err) {
      toast.error(err.message || "Could not update password");
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
        <h1 className="text-2xl font-bold font-poppins mb-2 text-white">Set a new password</h1>
        <p className="text-white/80 text-sm mb-8">Choose a new password for your account.</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <input
              type="password"
              placeholder="New password"
              className="input-field bg-white/90"
              {...register("password", { required: "Password is required", validate: validatePassword })}
            />
            {errors.password && <p className="text-danger text-xs mt-1">{errors.password.message}</p>}
          </div>
          <div>
            <input
              type="password"
              placeholder="Confirm new password"
              className="input-field bg-white/90"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: validateConfirmPassword(password),
              })}
            />
            {errors.confirmPassword && <p className="text-danger text-xs mt-1">{errors.confirmPassword.message}</p>}
          </div>
          <button type="submit" disabled={isSubmitting} className="btn-primary w-full !bg-white !text-primary">
            {isSubmitting ? "Updating..." : "Update password"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
