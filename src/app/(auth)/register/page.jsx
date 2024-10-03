import CardWrapper from "@/components/Auth/CardWrapper";
import RegisterForm from "@/components/Auth/RegisterForm";
//import Header from "@/components/Auth/Header";
function Register() {
  return (
    <div className="flex flex-grow justify-center items-center py-6">
      <CardWrapper
        label={"Create an EduGenie Account"}
        title={"Register"}
        backbuttonlabel={"Already a user?"}
        backbuttonhref={"/login"}
        children={<RegisterForm />}
      />
    </div>
  );
}
export default Register;

/* <div className="flex flex-col min-h-screen dark:bg-neutral-950">
      <Header />
      <div className="flex flex-grow justify-center items-center py-6">
        <CardWrapper
          label={"Create an EduGenie Account"}
          title={"Register"}
          backbuttonlabel={"Already a user?"}
          backbuttonhref={"/login"}
          children={<RegisterForm />}
        />
      </div>
    </div>*/
