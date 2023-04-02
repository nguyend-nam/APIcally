import { useRouter } from "next/router";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { Logo } from "../components/Logo";
import { Text } from "../components/Text";
import { Image } from "antd";
import Link from "next/link";
import { useIsMobile } from "../hooks/useIsMobile";
import { GithubOutlined } from "@ant-design/icons";
import Head from "next/head";
import { useAuthContext } from "../context/auth";
import { Parallax } from "react-scroll-parallax";
import { ROUTES } from "../constants/routes";
import { useIsSSR } from "../hooks/useIsSSR";
import { WithChildren } from "../types/common";
import cx from "classnames";

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
    title: "Subscribe, utilize and so on",
    description:
      "Developers can grant access to anyone who subscribes to the API. As a non-tech user, you can subscribe to utilize the resource.",
    img: "img/how-to-third.png",
  },
];

const benefits = [
  {
    name: "Create a centralized API storing platform",
    img: "img/centralize-art.png",
  },
  {
    name: "Optimize resources usage and cost",
    img: "img/stonk-art.png",
  },
  {
    name: "Share your APIs and benefit others",
    img: "img/launcher-art.png",
  },
];

const SectionTitle = (props: WithChildren & { className?: string }) => {
  const { children, className } = props;
  return (
    <Text
      className={cx(
        "capitalize text-3xl md:text-[40px] font-semibold text-slate-700 text-center mb-12 md:mb-16",
        className
      )}
    >
      {children}
    </Text>
  );
};

const Home = () => {
  const { push } = useRouter();
  const isSSR = useIsSSR();
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
              className="z-50 fixed top-0 !backdrop-blur-md bg-white md:bg-white/50 p-3.5 md:px-8 w-full flex items-center justify-between shadow md:shadow-slate-50/0"
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
                    appearance="outline"
                    className="text-base md:text-lg !px-4"
                    label="Login"
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
                <Card className="w-max p-5 md:p-8 backdrop-blur-md bg-white/90 max-w-full md:max-w-lg mt-6 md:mt-2">
                  <Text className="text-lg text-slate-400 m-0 hidden md:block">
                    Welcome to
                  </Text>
                  <Text className="text-4xl md:text-5xl tracking-[1px] font-bold text-primary m-0 mb-4 md:mb-8">
                    APIcally
                  </Text>
                  <Text className="text-base md:text-lg text-slate-700 m-0">
                    An e-commerce platform for your APIs. Provide your
                    algorithms, let us bring them to the community.
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
              <div className="sticky max-w-fit md:max-w-sm bottom-3 flex-wrap flex items-center gap-x-4 md:gap-x-6 mt-4 justify-end md:justify-start md:mr-0">
                {supplier.slice(0, 7).map((s) => (
                  <Link key={s.href} href={s.href}>
                    <a className="mb-1" target="_blank">
                      <Image height={s.height} preview={false} src={s.img} />
                    </a>
                  </Link>
                ))}
              </div>
            </div>

            <div className="p-4 pb-16 pt-32 mt-0 md:mt-4">
              <SectionTitle className="!text-primary !text-center">
                Welcome all types of user
              </SectionTitle>
              <div className="flex items-center md:items-start justify-evenly flex-col md:flex-row gap-8">
                <div className="w-full md:w-96 flex flex-col items-center gap-4">
                  <Image
                    height={isMobile ? 240 : 280}
                    className="object-contain"
                    preview={false}
                    src="img/developer-art.png"
                  />
                  <div className="max-h-max max-w-md mt-4 lg:mt-0 text-center md:text-left">
                    <Text
                      as="h4"
                      className="text-lg md:text-xl font-medium text-slate-600"
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
                    height={isMobile ? 240 : 280}
                    className="object-contain"
                    preview={false}
                    src="img/non-tech-art.png"
                  />
                  <div className="max-h-max max-w-md mt-4 lg:mt-0 text-center md:text-left">
                    <Text
                      as="h4"
                      className="text-lg md:text-xl font-medium text-slate-600"
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

            <div className="p-4 pb-16 pt-16 mt-0 md:mt-4">
              <SectionTitle>How APIcally works</SectionTitle>
              <div className="flex flex-wrap xl:flex-nowrap justify-center items-start max-w-full">
                {steps.map((s) => (
                  <Card
                    key={s.title}
                    className="pb-4 mx-0 md:mx-4 mb-4 md:mb-0 last-of-type:mb-0 flex flex-col items-center space-y-4 w-full md:max-w-[28%] overflow-hidden shadow"
                    hasShadow={false}
                  >
                    <div className="w-full overflow-hidden">
                      <Image
                        height={isMobile ? 200 : 250}
                        width="100%"
                        className="object-cover"
                        preview={false}
                        src={s.img}
                      />
                    </div>
                    <Text className="text-center text-lg md:text-xl font-medium text-slate-600">
                      {s.title}
                    </Text>
                    <div className="px-4 text-center text-base md:text-lg text-slate-600 whitespace-pre-line max-w-sm md:max-w-fit">
                      {s.description}
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            <div className="p-16 px-4 pt-16 mt-0 md:mt-4 bg-indigo-500">
              <SectionTitle className="text-white">Benefits</SectionTitle>
              <div className="grid grid-cols-6 items-start max-w-full lg:max-w-[80%] m-auto gap-8 md:gap-6">
                {benefits.map((b) => (
                  <Card
                    key={b.name}
                    className="flex flex-col items-center space-y-4 col-span-6 lg:col-span-2 bg-indigo-500"
                    hasShadow={false}
                  >
                    <div className="border border-slate-200 aspect-square w-[260px] max-w-full rounded-full flex justify-center">
                      <Image
                        height={240}
                        className="object-cover rounded-lg rounded-tl-none select-none"
                        preview={false}
                        src={b.img}
                      />
                    </div>
                    <Text className="!mt-2 md:!mt-4 font-medium text-center text-lg md:text-xl text-white max-w-xs w-full">
                      {b.name}
                    </Text>
                  </Card>
                ))}
              </div>
            </div>

            <div className="p-16 px-4 pt-16 md:pt-20">
              <SectionTitle>Made with...</SectionTitle>
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
