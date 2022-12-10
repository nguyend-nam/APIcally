import { Button } from "../../components/Button";
import { Layout } from "../../components/Layout";
import { Typography } from "antd";
import { Card } from "../../components/Card";
import { Input } from "../../components/Input";
import { useRouter } from "next/router";

const CodeEditorPage = () => {
  const { push } = useRouter();

  return (
    <Layout>
      <div className="flex flex-col items-center">
        <Typography.Title level={4}>
          Select an API to utilize or create your own
        </Typography.Title>
        <div className="flex gap-4 lg:gap-8 mt-4 justify-center flex-wrap lg:flex-nowrap">
          <Card
            shadowSize="md"
            className="bg-white p-8 w-full lg:w-[330px] h-max lg:h-[400px] flex flex-col items-center justify-between gap-20"
            style={{
              backgroundImage: "url(img/api-workspace-create.png)",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center right",
              backgroundSize: "cover",
            }}
          >
            <div className="flex flex-col items-center">
              <Typography.Text className="!text-primary font-semibold text-xl mb-4 text-center">
                Create your own API
              </Typography.Text>
              <div className="text-lg text-slate-600 text-center">
                Implement your algorithms in Python, then submit to the server
                to generate the API.
              </div>
            </div>
            <Button
              label="Start creating"
              className="text-lg py-1 px-2"
              onClick={() => push("/api-workspace/code-editor")}
            />
          </Card>
          <Card
            shadowSize="md"
            className="bg-white p-8 w-full lg:w-[330px] h-max lg:h-[400px] flex flex-col items-center justify-between gap-20"
            style={{
              backgroundImage: "url(img/api-workspace-utilize.png)",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center right",
              backgroundSize: "cover",
            }}
          >
            <div className="flex flex-col items-center">
              <Typography.Text className="!text-primary font-semibold text-xl mb-4 text-center">
                Utilize your subscribed APIs
              </Typography.Text>
              <Input
                type="text"
                id="home-search-input"
                placeholder="Search subscribed APIs..."
              />
            </div>
            <Button label="Search" className="text-lg py-1 px-2" />
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default CodeEditorPage;
