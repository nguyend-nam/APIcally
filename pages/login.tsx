import { Card } from "../components/Card";
import { Image } from "antd";
import { Logo } from "../components/Logo";
import { Text } from "../components/Text";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { useIsMobile } from "../hooks/mobile";

const LoginPage = () => {
  const isMobile = useIsMobile();

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-slate-100 p-4 sm:p-0"
      style={{
        backgroundImage: "url(img/bg-particle.png)",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "top right",
        backgroundSize: "cover",
      }}
    >
      <Card className="flex flex-col sm:flex-row h-[470px] sm:h-[450px] w-[670px] bg-white">
        <Card
          borderRadius={isMobile ? "topRight" : "bottomLeft"}
          className="bg-primary text-white overflow-hidden w-full sm:w-1/2 relative"
          hasShadow={!isMobile}
        >
          <Image
            preview={false}
            className="relative z-20"
            src="img/login-modal-bg.png"
          />
          <div className="absolute top-0 z-50 w-full h-full flex flex-col items-start p-8 sm:items-center justify-center">
            {!isMobile && <Text className="text-xl">Welcome to</Text>}
            <Logo
              size={isMobile ? "md" : "lg"}
              hasText
              textTheme="light"
              className="mb-0 sm:mb-12"
            />
          </div>
        </Card>
        <form
          className="w-full sm:w-1/2 p-8"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <label className="text-center">
            <h1 className="text-3xl sm:font-semibold mt-0 mb-5">Login</h1>
          </label>
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
