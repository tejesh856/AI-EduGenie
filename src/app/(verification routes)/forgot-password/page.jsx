import CardWrapper from "@/components/Auth/CardWrapper";
import ForgotPasswordForm from "@/components/Auth/ForgotPasswordForm";

export default function ForgotPassword() {
  return (
    <div className="flex flex-grow justify-center items-center">
      <CardWrapper
        label={"Reset Password"}
        title={"Forgot Your Password"}
        backbuttonlabel={"Go back to"}
        backbuttonhref={"/login"}
        ChildComponent={ForgotPasswordForm}
      />
    </div>
  );
}
