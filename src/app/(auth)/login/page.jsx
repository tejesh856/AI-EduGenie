import LoginForm from "@/components/Auth/LoginForm";
import CardWrapper from "@/components/Auth/CardWrapper";
//import Header from "@/components/Auth/Header";
function Login() {
  return (
    <div className="flex flex-grow justify-center items-center">
      <CardWrapper
        label={"Log in to EduGenie Account"}
        title={"Login"}
        backbuttonlabel={"Not a user?"}
        backbuttonhref={"/register"}
        children={<LoginForm />}
      />
    </div>
  );
}
export default Login;
