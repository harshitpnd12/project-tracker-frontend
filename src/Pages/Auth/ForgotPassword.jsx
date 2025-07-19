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
import { useNavigate } from "react-router-dom";
import "./Auth.css";

const ForgotPassword = () => {
  const form = useForm({
    mode: "onTouched",
    defaultValues: {
      email: "",
    },
  });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(
        `${API_BASE_URL}/auth/forgot-password`,
        data
      );
      toast.success(res?.data?.message || "Reset link sent!");
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        "Failed to send reset link.";
      toast.error(msg);
    }
  };

  return (
    <div className="loginContainer">
      <div className="box h-[26rem] w-[25rem]">
        <div className="minContainer login">
          <div className="loginBox w-full px-10 space-y-5">
            <h1 className="text-white text-2xl font-semibold text-center">
              Forgot Password
            </h1>

            <Form {...form}>
              <p className="text-sm text-gray-300 text-center -mt-3">
                We'll send a reset link to your email.
              </p>

              <form
                className="space-y-5"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <FormField
                  control={form.control}
                  name="email"
                  rules={{
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Enter a valid email address",
                    },
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          className="border w-full border-gray-700 py-5 px-5"
                          placeholder="Email..."
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full mt-2">
                  Send Reset Link
                </Button>

                <Button
                  type="button"
                  variant="ghost"
                  className="w-full text-white hover:underline"
                  onClick={() => navigate("/")}
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

export default ForgotPassword;
