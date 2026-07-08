import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { validateEmail } from "../utils/validators";

export default function ForgotPassword() {
  const { resetPassword } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm();

  const onSubmit = async ({ email }) => {
    try {
      const { error } = await resetPassword(email);
      if (error) throw error;
      toast.success("Password reset link sent to your email");
    } catch (err) {
      toast.error(err.message || "Something went wrong");
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
        <h1 className="text-2xl font-bold font-poppins mb-2 text-white">Reset your password</h1>
        <p className="text-white/80 text-sm mb-8">
          Enter your email and we&apos;ll send you a link to reset your password.
        </p>

        {isSubmitSuccessful ? (
          <div className="bg-white/90 rounded-xl p-4 text-sm text-slate-700">
            Check your inbox for the reset link.
          </div>
        ) : (
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
            <button type="submit" disabled={isSubmitting} className="btn-primary w-full !bg-white !text-primary">
              {isSubmitting ? "Sending..." : "Send reset link"}
            </button>
          </form>
        )}

        <p className="text-white/80 text-sm text-center mt-6">
          <Link to="/login" className="font-semibold text-white hover:underline">
            Back to login
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
