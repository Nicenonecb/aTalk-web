import React, { useRef } from 'react';
import { Modal, Form, Input, Select } from 'antd';


const { TextArea } = Input;
const Session_Modal: React.FC = (
  props,
) => {
  const { open, onCancel, onFinish, form } = props;
  // const formRef = useRef(null);
  // const [form] = Form.useForm();
  const onOk = () => {
    form.submit();
  };
  const options = [
    { value: 'zh', label: '中文' },
    { label: '英文', value: 'en' },
    { label: '日文', value: 'jp' },
  ];


  return (

    <Modal title='创建新对话' open={open} onOk={onOk} onCancel={onCancel} okText='确定' cancelText='取消'
           closeIcon={false}>
      <Form layout='vertical' form={form} onFinish={onFinish}>

        <Form.Item label='语言选择' rules={[{ required: true, message: '请选择!' }]} name='Language'>
          <Select
            options={options}
          />
        </Form.Item>

        <Form.Item label='对话名称' name='Name'>
          <Input />
        </Form.Item>

        <Form.Item label='对话场景描述' name='Scene'>
          <TextArea maxLength={200} />
        </Form.Item>


      </Form>
    </Modal>

  );
};

export default Session_Modal;