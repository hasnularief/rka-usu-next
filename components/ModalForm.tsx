import { Modal, Spin, Space, Form, Button, FormInstance } from "antd";
import React, { MouseEvent, ReactChildren, useState } from "react";

type ModalFormProps = {
  isOpen: boolean,
  isLoading?: boolean,
  formTitle: string,
  form?: FormInstance,
  onSubmit: (e: React.MouseEvent<HTMLElement>) => void,
  onCancel: (e: React.MouseEvent<HTMLElement>) => void,
  onValueChange?: (changedValue: any) => void
};

const ModalForm: React.FC<ModalFormProps> = (
  {children, isOpen, isLoading, formTitle, form, onSubmit, onCancel, onValueChange}
) => {
  return(
    <Modal visible={isOpen} title={formTitle} onCancel={onCancel}
      footer={[
        <Button key="back" onClick={onCancel}>Cancel</Button>,
        <Button form="edit-form" key="submit" disabled={isLoading} htmlType="submit" type="primary">
          Submit
        </Button>
      ]}
    >
      <Spin size="large" spinning={isLoading}>
        <Form onFinish={onSubmit} onValuesChange={onValueChange} name="edit-form" id="edit-form" form={form}>{children}</Form>
      </Spin>
    </Modal>
  );
}

export default ModalForm;