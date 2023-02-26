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
import Head from "next/head";
import { useAuthContext } from "../context/auth";
import { Parallax } from "react-scroll-parallax";
import { ROUTES } from "../constants/routes";

const supplier = [
  { href: "https://nextjs.org/", img: "img/nextjs-logo.png", height: 25 },
  {
    href: "https://github.com/suren-atoyan/monaco-react",
    img: "img/monaco-editor-logo.svg",
    height: 25,
  },
  { href: "https://go.dev/", img: "img/golang-logo.png", height: 22 },
  { href: "https://nodejs.org/en/", img: "img/nodejs-logo.png", height: 30 },
  { href: "https://aws.amazon.com/", img: "img/aws-logo.png", height: 25 },
  { href: "https://www.mongodb.com/", img: "img/mongodb-logo.png", height: 25 },
  { href: "https://www.python.org/", img: "img/python-logo.png", height: 30 },
  { href: "https://swr.vercel.app/", img: "img/swr-logo.jpeg", height: 35 },
  {
    href: "https://axios-http.com/docs/intro",
    img: "img/axios-logo.png",
    height: 15,
  },
];

const steps = [
  {
    title: "Provide your algorithm",
    description: "Implement your algorithm in Python.",
    img: "img/how-to-first.png",
  },
  {
    title: "Submit and let us generate the API",
    description:
      "Test whether your algorithm runs correctly, then submit to generate the API.",
    img: "img/how-to-second.png",
  },
  {
    title: "Utilize, serve and so on",
    description:
      "Developers can grant access to anyone who subscribes to the API. As a non-tech user, you can subscribe to utilize the resource.",
    img: "img/how-to-third.png",
  },
];

const types = [
  {
    name: "JSON",
    img: "img/json.png",
    nameClassName:
      "!mt-2 md:!mt-4 text-center text-lg md:text-xl font-medium text-primary",
  },
  {
    name: "Images",
    img: "img/image.png",
    nameClassName:
      "!mt-2 md:!mt-4 text-center text-lg md:text-xl font-medium text-primary",
  },
  {
    name: "Other types might be added in future enhancement",
    img: "img/not-known-yet.png",
    nameClassName:
      "!mt-2 md:!mt-4 text-center text-base md:text-lg font-normal text-slate-600 max-w-xs",
  },
];

const Home = () => {
  const [isSSR, setIsSSR] = useState<boolean>(true);
  useEffect(() => setIsSSR(false), []);
  const { push } = useRouter();
  const isMobile = useIsMobile();
  const { isAuthenticated } = useAuthContext();

  return (
    !isSSR && (
      <>
        <Head>
          <title>APIcally</title>
        </Head>
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
              className="z-50 fixed top-0 backdrop-blur-md bg-white md:bg-white/50 p-3.5 md:px-12 w-full flex items-center justify-between shadow-sm md:shadow-md"
            >
              <Logo size={isMobile ? "xs" : "sm"} />
              {isAuthenticated ? (
                <div>
                  <Button
                    className="text-base md:text-lg bg-white/0"
                    label="Go to console"
                    onClick={() => push(ROUTES.HOME)}
                  />
                </div>
              ) : (
                <div>
                  <Button
                    appearance="link"
                    className="text-base md:text-lg mr-3 md:mr-4"
                    label="Login"
                    onClick={() => push(ROUTES.LOGIN)}
                  />
                  <Button
                    appearance="outline"
                    className="text-base md:text-lg bg-white/0"
                    label="Register"
                    onClick={() => push(ROUTES.LOGIN)}
                  />
                </div>
              )}
            </Card>

            <div className="min-h-screen bg-gradient-to-b from-white/0 via-white/5 to-white pt-[86px] pb-4 px-4 md:pt-36 md:px-36 flex flex-col justify-between md:block">
              <Parallax
                speed={8}
                style={{
                  position: "relative",
                  zIndex: 20,
                }}
              >
                <Card className="w-max p-4 md:p-8 backdrop-blur-md bg-white/90 max-w-full md:max-w-lg mt-6 md:mt-2">
                  <Text className="text-lg text-slate-400 m-0 hidden md:block">
                    Welcome to
                  </Text>
                  <Text className="text-4xl md:text-5xl tracking-[1px] font-bold text-primary m-0 mb-2 md:mb-6">
                    APIcally
                  </Text>
                  <Text className="text-xl md:text-2xl font-medium text-slate-700 m-0 mb-2 md:mb-6">
                    Where APIs get into work
                  </Text>
                  <Text className="text-base md:text-lg font-normal text-slate-700 m-0">
                    A platform to run, host and utilize APIs. Provide your
                    algorithm, let us do the rest.
                  </Text>
                  <Button
                    className="text-lg md:text-xl mt-2 md:mt-4"
                    label="Get started"
                    onClick={() =>
                      push(isAuthenticated ? ROUTES.HOME : ROUTES.LOGIN)
                    }
                  />
                </Card>
              </Parallax>
              <Parallax speed={4}>
                <div className="sticky max-w-fit md:max-w-sm bottom-3 flex-wrap flex items-center gap-x-4 md:gap-x-6 mt-1 mb-[24px] justify-end md:justify-start md:mr-0">
                  {supplier.slice(0, 7).map((s) => (
                    <Link key={s.href} href={s.href}>
                      <a className="mb-1" target="_blank">
                        <Image height={s.height} preview={false} src={s.img} />
                      </a>
                    </Link>
                  ))}
                </div>
              </Parallax>
            </div>

            <div className="p-4 pb-16 pt-32">
              <Text className="text-2xl md:text-4xl font-semibold text-slate-700 text-center mb-12 md:mb-16">
                How APIcally works
              </Text>
              <div className="flex flex-wrap xl:flex-nowrap justify-center items-start max-w-full">
                {steps.map((s) => (
                  <Card
                    key={s.title}
                    className="p-4 mx-0 md:mx-2 mb-4 md:mb-0 last-of-type:mb-0 flex flex-col items-center space-y-4 max-w-full md:max-w-[30%] overflow-hidden bg-slate-50"
                    hasShadow={false}
                  >
                    <div className="max-w-full overflow-hidden flex justify-center">
                      <Image
                        height={250}
                        width={375}
                        className="object-cover"
                        preview={false}
                        src={s.img}
                      />
                    </div>
                    <Text className="text-center text-lg md:text-xl font-medium text-slate-600">
                      {s.title}
                    </Text>
                    <div className="text-center text-base md:text-lg text-slate-600 whitespace-pre-line max-w-sm md:max-w-fit">
                      {s.description}
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            <div className="p-4 pb-16 pt-16">
              <Text className="text-2xl md:text-4xl font-semibold text-primary text-center mb-12 md:mb-16">
                How the delivery goes
              </Text>
              <div className="flex items-center md:items-start justify-evenly flex-col md:flex-row gap-8">
                <div className="w-full md:w-96 flex flex-col items-center gap-4">
                  <Image
                    height={isMobile ? 200 : 260}
                    className="object-contain"
                    preview={false}
                    src="img/developer-art.svg"
                  />
                  <div className="max-h-max max-w-md mt-4 lg:mt-0 text-center md:text-left">
                    <Text
                      as="h4"
                      className="text-lg md:text-xl font-semibold text-slate-600"
                    >
                      As a <u>Developer</u>
                    </Text>
                    <Text
                      as="span"
                      className="text-slate-600 text-base md:text-lg font-normal !m-0"
                    >
                      Researchs and gives solutions via algorithms, provides
                      documentations and pricing plans.
                    </Text>
                  </div>
                </div>
                <div className="w-full md:w-96 flex flex-col items-center gap-4">
                  <Image
                    height={isMobile ? 200 : 260}
                    className="object-contain"
                    preview={false}
                    src="img/non-tech-art.svg"
                  />
                  <div className="max-h-max max-w-md mt-4 lg:mt-0 text-center md:text-left">
                    <Text
                      as="h4"
                      className="text-lg md:text-xl font-semibold text-slate-600"
                    >
                      As a <u>Domain-specialized user</u>
                    </Text>
                    <Text
                      as="span"
                      className="text-slate-600 text-base md:text-lg font-normal !m-0"
                    >
                      Subscribes to get access to the APIs that fit your usage
                      based on the data you have.
                    </Text>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-16 px-4">
              <Text className="text-2xl md:text-4xl font-semibold text-slate-700 text-center mb-12 md:mb-16">
                What APIcally can &quot;digests&quot;
              </Text>
              <div className="grid grid-cols-6 items-start max-w-full lg:max-w-[80%] m-auto gap-4">
                {types.map((t) => (
                  <Card
                    key={t.name}
                    className="last-of-type:mb-0 flex flex-col items-center space-y-4 col-span-6 lg:col-span-2"
                    hasShadow={false}
                  >
                    <div className="max-w-fit overflow-hidden flex justify-center">
                      <Image
                        height={100}
                        width={300}
                        className="object-cover rounded-lg rounded-tl-none"
                        preview={false}
                        src={t.img}
                      />
                    </div>
                    <Text className={t.nameClassName}>{t.name}</Text>
                  </Card>
                ))}
              </div>
            </div>

            <div className="p-16 px-4">
              <Text className="text-2xl md:text-4xl font-semibold text-slate-700 text-center mb-12 md:mb-16">
                Made with
              </Text>
              <div className="flex flex-wrap justify-center items-center max-w-lg m-auto">
                {supplier.map((s) => (
                  <Link key={s.href} href={s.href}>
                    <a className="mx-4 my-2 mb-1" target="_blank">
                      <Image
                        height={s.height + 7}
                        preview={false}
                        src={s.img}
                      />
                    </a>
                  </Link>
                ))}
              </div>
            </div>

            <div className="p-4 py-16 md:p-16">
              <div className="text-center text-sm md:text-base flex flex-col md:flex-row items-center md:items-end justify-center space-x-0 md:space-x-2 space-y-2 md:space-y-0">
                <Text as="span" className="text-slate-500">
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
      </>
    )
  );
};

export default Home;
