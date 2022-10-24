import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { Logo } from "../components/Logo";
import { Text } from "../components/Text";
import { Image } from "antd";
import Link from "next/link";
import { useIsMobile } from "../hooks/mobile";
import { GithubOutlined } from "@ant-design/icons";

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
          <Card
            borderRadius={isMobile ? "bottomLeft" : "none"}
            className="z-50 fixed top-0 backdrop-blur-md bg-white md:bg-white/50 p-3.5 md:px-12 w-full flex items-center justify-between shadow-none md:shadow-md shadow-gray-700/5"
          >
            <Logo size={isMobile ? "xs" : "sm"} />
            <div>
              {/* {!isMobile ? ( */}
              {/* <> */}
              <Button
                appearance="link"
                className="text-md md:text-lg mr-3 md:mr-4"
                label="Login"
                onClick={() => push("/login")}
              />
              <Button
                appearance="outline"
                className="text-md md:text-lg px-2.5 py-1 bg-white/0"
                label="Register"
                onClick={() => push("/login")}
              />
              {/* </> */}
              {/* ) : (
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
              )} */}
            </div>
          </Card>

          <div className="min-h-screen bg-gradient-to-b from-white/0 via-white/5 to-white pt-[86px] pb-4 px-4 md:pt-36 md:px-36 flex flex-col justify-between md:block">
            <Card className="w-max p-4 py-3 md:p-8 backdrop-blur-md bg-white/80 max-w-full md:max-w-lg">
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
            <div className="sticky bottom-3 flex-wrap flex items-center space-x-4 md:space-x-6 mt-6 justify-end md:justify-start md:mr-0">
              <Link href="https://github.com/suren-atoyan/monaco-react">
                <a className="mb-1" target="_blank">
                  <Image
                    height={25}
                    preview={false}
                    src="img/monaco-editor-logo.svg"
                  />
                </a>
              </Link>
              <Link href="https://www.python.org/">
                <a className="mb-1" target="_blank">
                  <Image
                    height={25}
                    preview={false}
                    src="img/python-logo.png"
                  />
                </a>
              </Link>
              <Link href="https://nodejs.org/en/">
                <a className="mb-1" target="_blank">
                  <Image
                    height={25}
                    preview={false}
                    src="img/nodejs-logo.png"
                  />
                </a>
              </Link>
              <Link href="https://www.mongodb.com/">
                <a className="mb-1" target="_blank">
                  <Image
                    height={25}
                    preview={false}
                    src="img/mongodb-logo.png"
                  />
                </a>
              </Link>
              <Link href="https://axios-http.com/docs/intro">
                <a className="mb-1" target="_blank">
                  <Image height={15} preview={false} src="img/axios-logo.png" />
                </a>
              </Link>
            </div>
          </div>

          <div className="p-2 pb-12 pt-24 md:pt-24">
            <Text className="text-3xl md:text-5xl font-semibold text-slate-700 text-center">
              How APIcally works
            </Text>
            <div className="flex flex-wrap justify-center items-start max-w-full">
              <Card
                className="p-4 m-2 flex flex-col items-center space-y-4 max-w-full overflow-hidden bg-slate-50"
                hasShadow={false}
              >
                <div className="max-w-full overflow-hidden flex justify-center">
                  <Image
                    height={250}
                    width={375}
                    className="object-cover"
                    preview={false}
                    src="img/how-to-first.png"
                  />
                </div>
                <Text className="text-center text-xl font-medium text-slate-600">
                  Provide your algorithm
                </Text>
                <div className="text-center text-lg text-slate-600 whitespace-pre-line max-w-fit">
                  Implement your algorithm in Python.
                </div>
              </Card>
              <Card
                className="p-4 m-2 flex flex-col items-center space-y-4 max-w-full overflow-hidden bg-slate-50"
                hasShadow={false}
              >
                <div className="max-w-full overflow-hidden flex justify-center">
                  <Image
                    height={250}
                    width={375}
                    className="object-cover"
                    preview={false}
                    src="img/how-to-second.png"
                  />
                </div>
                <Text className="text-center text-xl font-medium text-slate-600">
                  Submit and let us generate the API
                </Text>
                <div className="text-center text-lg text-slate-600 whitespace-pre-line max-w-fit">
                  Test whether your algorithm runs correctly, then submit to
                  generate the API.
                </div>
              </Card>
              <Card
                className="p-4 m-2 flex flex-col items-center space-y-4 max-w-full overflow-hidden bg-slate-50"
                hasShadow={false}
              >
                <div className="max-w-full overflow-hidden flex justify-center">
                  <Image
                    height={250}
                    width={375}
                    className="object-cover"
                    preview={false}
                    src="img/how-to-third.png"
                  />
                </div>
                <Text className="text-center text-xl font-medium text-slate-600">
                  Utilize, share and so on
                </Text>
                <div className="text-center text-lg text-slate-600 whitespace-pre-line max-w-fit">
                  Utilize the API. You can also so choose to share it to anyone
                  to give them access to use the API.
                </div>
              </Card>
            </div>
          </div>

          <div className="p-12">
            <Text className="text-3xl md:text-5xl font-semibold text-slate-700 text-center">
              What APIcally can &lsquo;digest&rsquo;
            </Text>
            <div className="flex flex-wrap justify-center items-start max-w-full">
              <Card
                className="p-4 m-2 flex flex-col items-center space-y-4 max-w-full overflow-hidden"
                hasShadow={false}
              >
                <div className="max-w-full overflow-hidden flex justify-center">
                  <Image
                    height={100}
                    width={300}
                    className="object-cover"
                    preview={false}
                    src="img/json.png"
                  />
                </div>
                <Text className="text-center text-2xl font-medium text-primary">
                  JSON
                </Text>
              </Card>
              <Card
                className="p-4 m-2 flex flex-col items-center space-y-4 max-w-full overflow-hidden"
                hasShadow={false}
              >
                <div className="max-w-full overflow-hidden flex justify-center">
                  <Image
                    height={100}
                    width={300}
                    className="object-cover"
                    preview={false}
                    src="img/image.png"
                  />
                </div>
                <Text className="text-center text-2xl font-medium text-primary">
                  Images
                </Text>
              </Card>
              <Card
                className="p-4 m-2 flex flex-col items-center space-y-4 max-w-full overflow-hidden"
                hasShadow={false}
              >
                <div className="max-w-full overflow-hidden flex justify-center">
                  <Image
                    height={100}
                    width={300}
                    className="object-cover"
                    preview={false}
                    src="img/not-known-yet.png"
                  />
                </div>
                <Text className="text-center text-lg font-normal text-slate-600 max-w-fit">
                  Other types might be added in future enhancement.
                </Text>
              </Card>
            </div>
          </div>

          <div className="p-12">
            <Text className="text-3xl md:text-5xl font-semibold text-slate-700 text-center">
              Made with
            </Text>
            <div className="flex flex-wrap justify-center items-center">
              <Link href="https://github.com/suren-atoyan/monaco-react">
                <a className="mx-4 my-2 mb-1" target="_blank">
                  <Image
                    height={32}
                    preview={false}
                    src="img/monaco-editor-logo.svg"
                  />
                </a>
              </Link>
              <Link href="https://www.python.org/">
                <a className="mx-4 my-2 mb-1" target="_blank">
                  <Image
                    height={32}
                    preview={false}
                    src="img/python-logo.png"
                  />
                </a>
              </Link>
              <Link href="https://nodejs.org/en/">
                <a className="mx-4 my-2 mb-1" target="_blank">
                  <Image
                    height={32}
                    preview={false}
                    src="img/nodejs-logo.png"
                  />
                </a>
              </Link>
              <Link href="https://www.mongodb.com/">
                <a className="mx-4 my-2 mb-1" target="_blank">
                  <Image
                    height={32}
                    preview={false}
                    src="img/mongodb-logo.png"
                  />
                </a>
              </Link>
              <Link href="https://axios-http.com/docs/intro">
                <a className="mx-4 my-2 mb-1" target="_blank">
                  <Image height={22} preview={false} src="img/axios-logo.png" />
                </a>
              </Link>
            </div>
          </div>

          <div className="p-8 py-12 md:p-12">
            <div className="text-center md:text-lg flex flex-col md:flex-row items-center md:items-end justify-center space-x-0 md:space-x-2 space-y-2 md:space-y-0">
              <Logo size="xs" />
              <Text as="span">
                &copy; 2022 APIcally team. All rights reserved.
              </Text>
            </div>
            <div className="flex justify-center mt-4">
              <Link href="https://github.com/API-cally">
                <a
                  className="text-slate-500 text-3xl hover:text-slate-700"
                  target="_blank"
                >
                  <GithubOutlined />
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
