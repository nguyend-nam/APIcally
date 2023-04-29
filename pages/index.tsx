import { useRouter } from "next/router";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { Logo } from "../components/Logo";
import { Text } from "../components/Text";
import { Image } from "antd";
import Link from "next/link";
import { useIsMobile } from "../hooks/useIsMobile";
import {
  AimOutlined,
  BuildOutlined,
  CodeOutlined,
  FieldTimeOutlined,
  GithubOutlined,
} from "@ant-design/icons";
import Head from "next/head";
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
    description: "Implement your main logic in Python and upload models.",
    img: "img/how-to-first.png",
    bgColor: "#6366F1",
    textColor: "#FFF",
    buttonClassName: "!text-white !ring-white",
  },
  {
    title: "Submit and let us generate the API",
    description:
      "Submit files to generate the API. When the API is generated, you can provide documentation and define inputs required in the payload.",
    img: "img/how-to-second.png",
    bgColor: "#373E58",
    textColor: "#FFF",
    buttonClassName: "!text-white !ring-white",
  },
  {
    title: "Subscribe, utilize and so on",
    description:
      "Developers can grant access to anyone who subscribes to the API. As a non-tech user, you can subscribe to utilize the resource.",
    img: "img/how-to-third.png",
    bgColor: "#F6F7FD",
    textColor: "#334",
    buttonClassName: "",
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
        "capitalize text-3xl md:text-[40px] max-w-max mx-auto font-semibold text-slate-700 text-center mb-12 md:mb-16",
        className
      )}
    >
      {children}
    </Text>
  );
};

const SectionTitleDivider = ({
  color = "rgb(203 213 225)",
  icon,
}: {
  color?: string;
  icon: React.ReactElement;
}) => {
  return (
    <div className="!mt-2 h-6 max-w-full mx-auto flex justify-center items-center">
      <div
        className={cx("!h-[1px] w-full !my-2")}
        style={{ backgroundColor: color }}
      />
      <div className="h-[24px] flex justify-center items-center p-2">
        {icon}
      </div>
      <div
        className={cx("!h-[1px] w-full !my-2")}
        style={{ backgroundColor: color }}
      />
    </div>
  );
};

const Home = () => {
  const { push } = useRouter();
  const isSSR = useIsSSR();
  const isMobile = useIsMobile();

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
              <Logo size="xs" />
              <div>
                <Button
                  className="text-base md:text-lg bg-white/0"
                  label="Get started"
                  onClick={() => push(ROUTES.HOME)}
                />
              </div>
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
                  <Text className="text-[17px] text-slate-500 m-0 hidden md:block">
                    Welcome to
                  </Text>
                  <Text className="text-4xl md:text-5xl tracking-[1px] font-bold text-primary m-0 mb-4 md:mb-8">
                    APIcally
                  </Text>
                  <Text className="text-base md:text-[17px] m-0">
                    An e-commerce platform for your APIs. Provide your
                    algorithms, let us bring them to the community.
                  </Text>
                  <Button
                    className="text-lg md:text-xl mt-2 md:mt-4"
                    label="Get started"
                    onClick={() => push(ROUTES.HOME)}
                  />
                </Card>
              </Parallax>
              <div className="sticky max-w-fit md:max-w-sm bottom-3 flex-wrap flex items-center gap-x-4 md:gap-x-6 mt-4 justify-end md:justify-start md:mr-0">
                {supplier.slice(0, 7).map((s) => (
                  <Link key={s.href} href={s.href}>
                    <a className="mb-1 max-w-[100px]" target="_blank">
                      <Image
                        height={s.height}
                        preview={false}
                        src={s.img}
                        className="object-contain"
                      />
                    </a>
                  </Link>
                ))}
              </div>
            </div>

            <div className="pb-16 pt-32 mt-0 md:mt-4">
              <SectionTitle>
                How APIcally works
                <SectionTitleDivider
                  icon={<CodeOutlined className="text-lg !text-slate-500" />}
                />
              </SectionTitle>
              <div className="w-full">
                {steps.map((s, i) => (
                  <div
                    key={s.title}
                    className={cx(
                      "w-full flex gap-0 md:gap-12 justify-between px-4 pt-6 md:px-16 md:pt-16",
                      {
                        "!flex-row": !isMobile,
                        "!flex-row-reverse": i % 2 === 1,
                        "!flex-col": isMobile,
                      }
                    )}
                    style={{ backgroundColor: s.bgColor }}
                  >
                    <Card
                      className="mb-6 md:mb-0 last-of-type:mb-0 flex flex-col items-center space-y-4 w-full md:max-w-[40%] overflow-hidden"
                      hasShadow={false}
                      borderRadius={isMobile ? "primary" : "topRight"}
                    >
                      <div className="w-full overflow-hidden">
                        <Image
                          height={isMobile ? 240 : 330}
                          width="100%"
                          className="object-cover inline-block"
                          preview={false}
                          src={s.img}
                        />
                      </div>
                    </Card>

                    <div className="pb-6 flex-1">
                      <Text
                        className={cx(
                          "text-xl md:text-3xl font-medium mb-4 md:mb-6"
                        )}
                        style={{ color: s.textColor }}
                      >
                        {s.title}
                      </Text>
                      <div
                        className={cx(
                          "text-[15px] md:text-lg whitespace-pre-line max-w-sm md:max-w-fit"
                        )}
                        style={{ color: s.textColor }}
                      >
                        {s.description}
                      </div>

                      <Button
                        className={cx(
                          "text-base md:text-lg bg-white/0 mt-4 md:mt-6",
                          s.buttonClassName
                        )}
                        label="Learn more"
                        appearance="outline"
                        onClick={() => push(ROUTES.API_WORKSPACE_CREATE)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 pb-16 pt-16 mt-0 md:mt-4">
              <SectionTitle className="!text-primary !text-center">
                Welcome all types of user
                <SectionTitleDivider
                  icon={<AimOutlined className="text-lg !text-slate-500" />}
                />
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
                      className="text-lg md:text-xl font-medium text-slate-700"
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
                      className="text-lg md:text-xl font-medium text-slate-700"
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

            <div className="p-16 px-4 pt-16 mt-0 md:mt-4 bg-indigo-500">
              <SectionTitle className="text-white">
                Benefits
                <SectionTitleDivider
                  icon={<FieldTimeOutlined className="!text-white text-lg" />}
                />
              </SectionTitle>
              <div className="grid grid-cols-6 items-start max-w-full lg:max-w-[80%] m-auto gap-8 md:gap-6">
                {benefits.map((b) => (
                  <Card
                    key={b.name}
                    className="flex flex-col items-center space-y-4 col-span-6 lg:col-span-2 bg-indigo-500"
                    hasShadow={false}
                  >
                    <div className="border border-slate-200 aspect-square !w-[260px] !h-[260px] max-w-full rounded-full flex justify-center">
                      <Image
                        height={240}
                        className="object-cover rounded-lg rounded-tl-none select-none"
                        preview={false}
                        src={b.img}
                      />
                    </div>
                    <Text className="!mt-2 md:!mt-4 text-center text-lg md:text-xl text-white max-w-xs w-full">
                      {b.name}
                    </Text>
                  </Card>
                ))}
              </div>
            </div>

            <div className="p-16 px-4 pt-16 md:pt-20">
              <SectionTitle>
                Made with...
                <SectionTitleDivider
                  icon={<BuildOutlined className="text-lg !text-slate-500" />}
                />
              </SectionTitle>
              <div className="flex flex-wrap justify-center items-center max-w-lg m-auto">
                {supplier.map((s) => (
                  <Link key={s.href} href={s.href}>
                    <a className="mx-4 my-2 mb-1 max-w-[100px]" target="_blank">
                      <Image
                        height={s.height + 7}
                        preview={false}
                        src={s.img}
                        className="object-contain"
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
