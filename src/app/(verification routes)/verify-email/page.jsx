"use client";
import CardWrapper from "@/components/Auth/CardWrapper";
import VerifyAccountForm from "@/components/Auth/VerifyAccountForm";

function VerifyEmail() {
  return (
    <div className="flex flex-col flex-grow items-center justify-center">
      <div className="flex justify-center w-full h-full items-center py-6 relative">
        <CardWrapper
          label={"Confirming your verification"}
          title={"Verifying Your Account"}
          backbuttonlabel={"Back to"}
          backbuttonhref={"/login"}
          ChildComponent={VerifyAccountForm}
        />
      </div>
    </div>
  );
}
export default VerifyEmail;

/*<div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-grow justify-center items-center">
        <CardWrapper
          label={"Create an Account"}
          title={"Register"}
          backbuttonlabel={"Already a user?"}
          backbuttonhref={"/login"}
          children={<RegisterForm />}
        />
      </div>
    </div>*/
