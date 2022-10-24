import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { Logo } from "../components/Logo";
import { Text } from "../components/Text";
import { Dropdown, Image, Menu } from "antd";
import Link from "next/link";
import { useIsMobile } from "../hooks/mobile";
import { MenuOutlined } from "@ant-design/icons";

const Home = () => {
  const [isSSR, setIsSSR] = useState<boolean>(true);
  useEffect(() => setIsSSR(false), []);
  const { push } = useRouter();
  const isMobile = useIsMobile();

  return (
    !isSSR && (
      <div
        className="flex justify-center items-center min-h-screen bg-slate-100 p-4 md:p-0"
        style={{
          backgroundImage: "url(img/banner.png)",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "top center",
          backgroundSize: "cover",
        }}
      >
        <div className="w-full absolute top-0">
          <div className="z-50 fixed top-0 backdrop-blur-md bg-white/40 md:bg-white/30 py-2 px-4 md:px-12 w-full flex items-center justify-between">
            <Logo size={isMobile ? "xs" : "sm"} />
            <div>
              {!isMobile ? (
                <>
                  <Button
                    appearance="link"
                    className="text-lg mr-4"
                    label="Login"
                    onClick={() => push("/login")}
                  />
                  <Button
                    appearance="outline"
                    className="text-lg px-2.5 py-1 bg-white/0"
                    label="Register"
                    onClick={() => push("/login")}
                  />
                </>
              ) : (
                <Dropdown
                  overlay={
                    <Menu
                      style={{
                        borderRadius: "8px",
                        marginTop: 4,
                      }}
                      items={[
                        {
                          key: 1,
                          label: (
                            <Button
                              appearance="link"
                              className="text-lg w-full text-right"
                              label="Login"
                              onClick={(e) => {
                                e.preventDefault();
                                push("/login");
                              }}
                            />
                          ),
                        },
                        {
                          key: 2,
                          label: (
                            <Button
                              appearance="link"
                              className="text-lg w-full text-right"
                              label="Register"
                              onClick={(e) => {
                                e.preventDefault();
                                push("/login");
                              }}
                            />
                          ),
                        },
                      ]}
                    />
                  }
                  placement="bottomRight"
                  trigger={["click"]}
                  className="shadow-md"
                >
                  <Button
                    appearance="link"
                    className="!p-2 !px-3"
                    label={
                      <MenuOutlined
                        className="h-max text-lg"
                        style={{ color: "#FFF" }}
                      />
                    }
                  />
                </Dropdown>
              )}
            </div>
          </div>

          <div className="min-h-screen bg-gradient-to-b from-white/0 via-white/10 to-white pt-[74px] pb-4 px-4 md:pt-36 md:px-36 flex flex-col justify-between md:block">
            <Card className="w-max p-4 md:p-8 backdrop-blur-md bg-white/[0.85] md:bg-white/80 max-w-full md:max-w-lg">
              <Text className="text-xl md:text-3xl font-medium text-slate-400 m-0">
                Welcome to
              </Text>
              <Text className="text-4xl md:text-6xl tracking-[1px] font-bold text-primary m-0 mb-2 md:mb-6">
                APIcally
              </Text>
              <Text className="text-lg md:text-2xl font-medium text-slate-700 m-0 mb-2 md:mb-6">
                Where APIs get into work.
              </Text>
              <Text className="text-md md:text-xl font-normal text-slate-700 m-0">
                A platform to run, host and visualize you API. Provide your
                algorithm, let us do the rest.
              </Text>
            </Card>
            <div className="flex space-x-6 mt-6 justify-end md:justify-start">
              <Link href="https://github.com/suren-atoyan/monaco-react">
                <a target="_blank">
                  <Image
                    height={27}
                    preview={false}
                    src="img/monaco-editor-logo.svg"
                  />
                </a>
              </Link>
              <Link href="https://www.python.org/">
                <a target="_blank">
                  <Image
                    height={27}
                    preview={false}
                    src="img/python-logo.png"
                  />
                </a>
              </Link>
              <Link href="https://nodejs.org/en/">
                <a target="_blank">
                  <Image
                    height={27}
                    preview={false}
                    src="img/nodejs-logo.png"
                  />
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default Home;
