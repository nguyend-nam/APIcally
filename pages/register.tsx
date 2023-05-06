import { Card } from "../components/Card";
import { Form, Image, notification } from "antd";
import { Logo } from "../components/Logo";
import { Text } from "../components/Text";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { useIsMobile } from "../hooks/useIsMobile";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Head from "next/head";
import { LOGIN_REDIRECTION_KEY, useAuthContext } from "../context/auth";
import Link from "next/link";
import { ROUTES } from "../constants/routes";
import { useIsSSR } from "../hooks/useIsSSR";
import { client } from "../libs/api";

const RegisterPage = () => {
  const isMobile = useIsMobile();
  const { push } = useRouter();
  const isSSR = useIsSSR();

  const { isAuthenticated } = useAuthContext();

  useEffect(() => {
    if (isAuthenticated) {
      const redirectUrl = window.localStorage.getItem(LOGIN_REDIRECTION_KEY);

      push(redirectUrl || ROUTES.HOME).then(() => {
        window.localStorage.removeItem(LOGIN_REDIRECTION_KEY);
      });
    }
  }, [push, isAuthenticated]);

  const onSubmit = async (values: { username: string; password: string }) => {
    try {
      const res = await client.register(values.username, values.password);

      console.log(res);
      if (res?.data) {
        notification.success({ message: "Created new account successfully" });
        push(ROUTES.LOGIN);
      }
    } catch (error) {
      notification.error({
        message: String(error) || "Could not create account",
      });
    }
  };

  return (
    !isSSR && (
      <>
        <Head>
          <title>Register | APIcally</title>
        </Head>

        <div
          className="flex justify-center items-center min-h-screen bg-slate-100 p-4 sm:p-0"
          style={{
            backgroundImage: "url(img/bg-particle.png)",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center right",
            backgroundSize: "cover",
          }}
        >
          <Card className="flex flex-col sm:flex-row h-[550px] sm:h-[470px] w-[670px] bg-white">
            <Card
              borderRadius={isMobile ? "topRight" : "bottomLeft"}
              className="bg-primary text-white overflow-hidden w-full sm:w-1/2 relative min-h-[136px]"
              hasShadow={!isMobile}
            >
              <Image
                preview={false}
                className="relative z-20"
                src="img/login-modal-bg.png"
              />
              <div className="absolute top-0 z-40 w-full h-full flex flex-col items-start p-6 sm:p-8 sm:items-center justify-center">
                {!isMobile && <Text className="text-xl">Welcome to</Text>}
                <Link href={ROUTES.HOME}>
                  <a>
                    <Logo
                      size={isMobile ? "sm" : "md"}
                      hasText={!isMobile}
                      textTheme="light"
                      className="mb-0 sm:mb-12"
                    />
                  </a>
                </Link>
              </div>
            </Card>
            <div className="w-full sm:w-1/2 p-4 sm:p-8 flex flex-col gap-4 justify-between">
              <Form className="mb-2" onFinish={onSubmit}>
                <label className="text-center">
                  <h1 className="text-3xl sm:font-semibold mt-0 mb-5">
                    Register
                  </h1>
                </label>
                <label
                  htmlFor="username-input"
                  className="text-lg text-primary"
                >
                  Username
                </label>
                <Form.Item
                  name="username"
                  rules={[{ required: true, message: "Required" }]}
                  className="mt-1 mb-4"
                >
                  <Input
                    type="text"
                    id="username-input"
                    fullWidth
                    placeholder="Enter username..."
                  />
                </Form.Item>

                <label
                  htmlFor="password-input"
                  className="text-lg text-primary"
                >
                  Password
                </label>
                <Form.Item
                  name="password"
                  rules={[{ required: true, message: "Required" }]}
                  className="mt-1"
                >
                  <Input
                    type="password"
                    id="password-input"
                    fullWidth
                    placeholder="Enter password..."
                  />
                </Form.Item>
                <div className="flex justify-center mt-2">
                  <Text className="text-base text-center m-0 text-slate-500">
                    Already have an account?{" "}
                    <Link passHref href={ROUTES.LOGIN}>
                      <Text as="span" className="!text-primary cursor-pointer">
                        Log in
                      </Text>
                    </Link>{" "}
                    and start using.
                  </Text>
                </div>

                <div className="w-full text-center mt-5">
                  <Button label="Login" className="w-[125px]" type="submit" />
                </div>
              </Form>
              <div className="flex justify-center mt-2">
                <Text className="text-base m-0 text-slate-500">
                  &copy; 2022 APIcally team.
                </Text>
              </div>
            </div>
          </Card>
        </div>
      </>
    )
  );
};

export default RegisterPage;
