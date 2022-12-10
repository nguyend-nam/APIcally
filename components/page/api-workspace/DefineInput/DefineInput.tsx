import {
  Modal,
  Form,
  Row,
  Col,
  Select,
  notification,
  FormInstance,
} from "antd";
import { multipleStates, variableTypes } from "../../../../constants/python";
import { dataSourceType } from "../../../../pages/api-workspace/documentation";
import { checkPythonVarNameFormat } from "../../../../utils";
import { Button } from "../../../Button";
import { Input } from "../../../Input";

interface Props {
  isOpen: boolean;
  onCancel: () => void;
  onOk?: () => void;
  form: FormInstance<any>;
  setDataSource: any;
  dataSource: dataSourceType[];
}

export const DefineInput = (props: Props) => {
  const { isOpen, onCancel, form, onOk, dataSource, setDataSource } = props;

  return (
    <Modal
      open={isOpen}
      onCancel={onCancel}
      footer={[
        <Button
          key="cancel"
          appearance="outline"
          label="Cancel"
          onClick={onCancel}
          className="p-2 py-1 mr-2"
        />,
        <Button key="add" label="Add" onClick={onOk} className="p-2 py-1" />,
      ]}
    >
      <Form
        form={form}
        className="pr-4 w-[90%]"
        onFinish={(values: dataSourceType) => {
          const exist = dataSource.find((d) => d.name === values.name);
          const valid = checkPythonVarNameFormat(values.name);

          if (!exist && valid) {
            setDataSource([...dataSource, values]);
            onCancel();
            form.resetFields();
          } else {
            if (exist) {
              notification.error({ message: "Variable name already exist!" });
            }
            if (!valid) {
              notification.error({ message: "Invalid variable name!" });
            }
          }
        }}
      >
        <Row className="flex items-center">
          <Col span={8}>
            <label htmlFor="name-input" className="text-lg text-primary mr-4">
              Variable name
            </label>
          </Col>
          <Col span={16}>
            <Form.Item
              name="name"
              rules={[{ required: true, message: "Please provide input name" }]}
              className="!m-0"
            >
              <Input
                type="text"
                id="name-input"
                placeholder="Enter variable name..."
                className="mt-1"
              />
            </Form.Item>
          </Col>
        </Row>

        <Row className="flex items-center mt-4">
          <Col span={8}>
            <label className="text-lg text-primary mr-4">Type</label>
          </Col>
          <Col span={16}>
            <Form.Item
              name="type"
              rules={[{ required: true, message: "Please provide input type" }]}
              className="!m-0"
            >
              <Select
                defaultValue={variableTypes["int"]}
                style={{ width: "100%" }}
                placeholder="Select type..."
                options={Object.keys(variableTypes).map((k) => ({
                  key: k,
                  value: k,
                  label: variableTypes[k as keyof typeof variableTypes],
                }))}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row className="flex items-center mt-4">
          <Col span={8}>
            <label className="text-lg text-primary mr-4">Multiple state</label>
          </Col>
          <Col span={16}>
            <Form.Item
              name="multipleState"
              rules={[
                {
                  required: true,
                  message: "Please provide input multiple state",
                },
              ]}
              className="!m-0"
            >
              <Select
                defaultValue={multipleStates["none"]}
                style={{ width: "100%" }}
                placeholder="Select multiple state..."
                options={Object.keys(multipleStates).map((k) => ({
                  key: k,
                  value: k,
                  label: multipleStates[k as keyof typeof multipleStates],
                }))}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};
