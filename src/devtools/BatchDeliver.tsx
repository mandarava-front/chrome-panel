/*
 * @Description:
 * @Version: 1.0
 * @Author: changfeng
 * @Date: 2024-09-09 20:15:37
 * @LastEditors: changfeng
 * @LastEditTime: 2024-09-09 21:43:57
 */
import { Form, Input, Button } from "antd";

import "./index.css";

const BatchExport = () => {
  const [form] = Form.useForm();
  const handleDeliver = () => {
    console.log("批量发货");
    const formValues = form.getFieldsValue();
    console.log("form>>>>", formValues);
  };
  return (
    <div className="formContainer">
      <Form form={form} layout="vertical">
        <Form.Item label="订单表" name="orderInfo">
          <Input.TextArea />
        </Form.Item>
        <Form.Item label="订单号所在行" name="orderId">
          <Input />
        </Form.Item>
        <Form.Item label="物流公司所在行" name="company">
          <Input />
        </Form.Item>
        <Form.Item label="物流单号所在行" name="deliveryId">
          <Input />
        </Form.Item>
        <Button onClick={handleDeliver}>批量发货</Button>
      </Form>
    </div>
  );
};

export default BatchExport;
