import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "../../components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import { API_BASE_URL } from "../../config/api";
import { useNavigate, useParams } from "react-router-dom";
import "./Auth.css";

const ResetPassword = () => {
  const { token } = useParams(); // ✅ Get token from URL path

  const form = useForm({
    mode: "onTouched",
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    if (data.newPassword !== data.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      const res = await axios.post(`${API_BASE_URL}/auth/reset-password`, {
        token,
        newPassword: data.newPassword,
      });

      toast.success(res?.data?.message || "Password has been reset!");
      navigate("/");
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        "Failed to reset password.";
      toast.error(msg);
    }
  };

  return (
    <div className="loginContainer">
      <div className="box h-[30rem] w-[25rem]">
        <div className="minContainer login">
          <div className="loginBox w-full px-10 space-y-5">
            <h1 className="text-white text-2xl font-semibold text-center">
              Reset Password
            </h1>

            <Form {...form}>
              <p className="text-sm text-gray-300 text-center -mt-3">
                Enter your new password below.
              </p>

              <form
                className="space-y-5"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <FormField
                  control={form.control}
                  name="newPassword"
                  rules={{ required: "New Password is required" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          type="password"
                          className="border w-full border-gray-700 py-5 px-5"
                          placeholder="New Password..."
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="confirmPassword"
                  rules={{ required: "Please confirm your password" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          type="password"
                          className="border w-full border-gray-700 py-5 px-5"
                          placeholder="Confirm Password..."
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full mt-2">
                  Reset Password
                </Button>

                <Button
                  type="button"
                  variant="ghost"
                  className="w-full text-white hover:underline"
                  onClick={() => navigate("/Login")}
                >
                  Back to Login
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
