import { Modal, Spin, Form, Button, FormInstance } from "antd";
import React, { useEffect } from "react";

type ModalFormProps = {
  isOpen: boolean,
  isLoading?: boolean,
  formTitle: string,
  formData?: Object,
  onSubmit: (e: React.MouseEvent<HTMLElement>) => void,
  onCancel: (e: React.MouseEvent<HTMLElement>) => void,
  onValueChange?: (changedValue: any) => void
};

const ModalForm: React.FC<ModalFormProps> = (
  {children, isOpen, isLoading, formTitle, formData, onSubmit, onCancel, onValueChange}
) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(formData);
  }, [formData]);

  const handleCancel = (e: React.MouseEvent<HTMLElement>) => {
    form.resetFields();
    onCancel(e);
  };

  const handleSubmit = (formValues: any) => {
    form.setFieldsValue(formValues);
    onSubmit(formValues);
  }

  return(
    <Modal visible={isOpen} title={formTitle} onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>Cancel</Button>,
        <Button form="edit-form" key="submit" disabled={isLoading} htmlType="submit" type="primary">
          Submit
        </Button>
      ]}
    >
      <Spin size="large" spinning={isLoading}>
        <Form onFinish={handleSubmit} onValuesChange={onValueChange} name="edit-form" id="edit-form" form={form}>
          {children}
        </Form>
      </Spin>
    </Modal>
  );
}

export default ModalForm;