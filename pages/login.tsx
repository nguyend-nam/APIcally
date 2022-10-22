import { Card } from "../components/Card";
import { Image } from "antd";
import { Logo } from "../components/Logo";
import { Text } from "../components/Text";
import { Input } from "../components/Input";
import { Button } from "../components/Button";

const LoginPage = () => {
  return (
    <div
      className="flex justify-center items-center h-screen bg-slate-100"
      style={{
        backgroundImage: "url(img/bg-particle.png)",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "top right",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
      }}
    >
      <Card className="flex h-[450px] w-[670px] bg-white">
        <Card
          borderRadius="bottomLeft"
          className="bg-primary text-white overflow-hidden w-1/2 relative"
        >
          <Image
            preview={false}
            className="relative z-20"
            src="img/login-modal-bg.png"
          />
          <div className="absolute top-0 z-50 w-full flex flex-col items-center pt-10">
            <Text className="text-xl">Welcome to</Text>
            <Logo size="lg" hasText textTheme="light" />
          </div>
        </Card>
        <form
          className="w-1/2 p-8"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className="text-center">
            <h1 className="text-3xl font-semibold mb-5">Login</h1>
          </div>
          <label htmlFor="username-input" className="text-lg text-primary">
            Username
          </label>
          <Input
            type="text"
            id="username-input"
            fullWidth
            placeholder="Enter username..."
            className="mt-1 mb-4"
          />
          <label htmlFor="password-input" className="text-lg text-primary">
            Password
          </label>
          <Input
            type="password"
            id="password-input"
            fullWidth
            placeholder="Enter password..."
            className="mt-1"
          />
          <div className="w-full text-center mt-5">
            <Button label="Login" className="p-1 text-lg w-[125px]" />
          </div>
        </form>
      </Card>
    </div>
  );
};

export default LoginPage;
