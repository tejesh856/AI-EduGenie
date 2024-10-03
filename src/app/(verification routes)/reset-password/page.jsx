import CardWrapper from "@/components/Auth/CardWrapper";
import ResetPasswordForm from "@/components/Auth/ResetPasswordForm";
export default function ResetPassword() {
  return (
    <div className="flex flex-grow justify-center items-center">
      <CardWrapper
        label={"Create New Password"}
        title={"Reset Password"}
        backbuttonlabel={"Go to"}
        backbuttonhref={"/login"}
        ChildComponent={ResetPasswordForm}
      />
    </div>
  );
}
