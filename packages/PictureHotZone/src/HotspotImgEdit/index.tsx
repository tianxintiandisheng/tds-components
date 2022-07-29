import React, { useState } from 'react';
import useDeepCompareEffect from 'use-deep-compare-effect';
import { Form, Modal, Popover } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import classname from 'classnames';
import Icon from '@/components/IconItem';
import { __BoxItem } from './interface';
import ImgEdit from './components/ImgEdit';
import HotspotList from './components/HotspotList';
import ss from './index.scss';

interface __Props {
  /**
   * label
   * @description       label
   * @default           支持定义默认值
   */
  label: string;
  /**
   * value
   * @description       图片地址
   * @default           ""
   */
  value: string;
  /**
   * onChange
   * @description       onChange
   * @default           支持定义默认值
   */
  onChange: Function;
  /**
   * onChange
   * @description       热区列表
   * @default           支持定义默认值
   */
  extraValue: __BoxItem[];
  /**
   * otherPorps
   * @description       透传参数
   * @default           支持定义默认值
   */
  otherPorps: any;
  /**
   * @description      图片格式说明
   * @default           支持定义默认值
   */
  tip: number;
  /**
   * @description      不知道干嘛用的
   * @default           0
   */
  typeComp: string;
}
const deepClone = (item: any) => {
  return JSON.parse(JSON.stringify(item));
};
function HotspotImgEdit(props: __Props) {
  const [boxArray, setBoxArray] = useState<__BoxItem[]>([]);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [curSelectItemUuid, setCurSelectItemUuid] = useState<number>(0); // 当前选中热区的uuid
  const [form] = Form.useForm();

  const { label, value = '', extraValue = [], onChange, otherPorps, tip, typeComp } = props;
  const { FileUpload } = otherPorps.ModalComponents || {};
  const showModal = () => {
    setCurSelectItemUuid(0); // 重置当前选中
    setIsModalVisible(true);
  };

  const handleOk = () => {
    onChange(value, {
      dataSource: deepClone(boxArray),
    });
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setBoxArrayDeepClone([...extraValue]);

    setIsModalVisible(false);
  };

  useDeepCompareEffect(() => {
    form.setFieldsValue({ imageSrc: value });
    setBoxArrayDeepClone([...extraValue]);
    setTimeout(() => {
      form.validateFields();
    }, 100);
  }, [value, extraValue]);
  // 表单变化
  function onValuesChange(current = {}) {
    onChange(current.imageSrc);
  }

  const setBoxArrayDeepClone = (item: __BoxItem[]) => {
    setBoxArray(deepClone(item));
  };

  const renderPreviewHotspot = (list: __BoxItem[]) => {
    if (list.length > 0) {
      return list.map((i: __BoxItem) => {
        return (
          <div
            key={i.uuid}
            className={ss.hotspotItem}
            style={{
              position: 'absolute',
              top: i.y * 100 + '%',
              left: i.x * 100 + '%',
              width: i.width * 100 + '%',
              height: i.height * 100 + '%',
            }}
          >
            <div className={ss.orderNum}>{i.orderNum}</div>
          </div>
        );
      });
    }
    return null;
  };

  const renderDes = () => {
    return (
      <div>
        <span>如何框选和配置热区：</span>
        <br />
        <span>1. 点击“编辑”，进入框选热区模式；</span>
        <br />
        <span>2. 拖拽鼠标框选热区；</span>
        <br />
        <span>3. 点击“添加跳转”配置跳转内容</span>
        <br />
        <span>4. 点击“保存”完成当前编辑</span>
        <br />
      </div>
    );
  };
  return (
    <div className={ss.root}>
      <div className={ss.tipArea}>
        <div className={ss.title}>{label}</div>
        <div className={ss.tip}>{tip}</div>
      </div>
      <Form className={ss.form} form={form} onValuesChange={onValuesChange}>
        <Form.Item
          name="imageSrc"
          label=""
          className={ss.upload}
          rules={[{ required: true, message: '请上传图片' }]}
        >
          {/* <AvatorUpload
            data={{ path: "AD" }}
            accept=".png,.jpg,.jpeg,.gif"
            imageSize={5}
            {...otherPorps}
          /> */}
          <FileUpload
            accept=".png,.jpg,.jpeg,.gif"
            imgSize={5}
            fileType="image"
            selectionMode="single"
          />
        </Form.Item>
      </Form>
      <div className={classname(ss.preBox, { [ss.hidden]: value === '' })}>
        <div className={ss.titlePre}>
          <div className={ss.titleLeft}>
            <span style={{ color: '#262626' }}>热区示意</span>
            <Popover placement="bottom" content={renderDes()}>
              <QuestionCircleOutlined style={{ margin: '0 2px', color: '#B4B4B4' }} />
            </Popover>
            <span>:</span>
          </div>
          <div className={ss.titleRight} onClick={showModal}>
            <Icon
              type="icon-bianji"
              color="#2f54eb"
              width={14}
              height={14}
              className="iconbianji"
            />
            <span>编辑</span>
          </div>
        </div>
        <div className={ss.imgBox}>
          <img src={value} className={ss.img}></img>
          {renderPreviewHotspot(extraValue)}
        </div>
      </div>

      <Modal
        title="全屏编辑"
        width="80vw"
        maskClosable={false}
        getContainer={false}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className={ss.modalContent}>
          <div className={ss.leftContent}>
            <ImgEdit
              imgSrc={value}
              boxArray={boxArray}
              setBoxArray={setBoxArrayDeepClone}
              curSelectItemUuid={curSelectItemUuid}
              setCurSelectItemUuid={setCurSelectItemUuid}
            ></ImgEdit>
          </div>
          <div className={ss.rightContent}>
            <HotspotList
              typeComp={typeComp}
              boxArray={boxArray}
              otherPorps={otherPorps}
              setBoxArray={setBoxArray}
              curSelectItemUuid={curSelectItemUuid}
              setCurSelectItemUuid={setCurSelectItemUuid}
            ></HotspotList>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default HotspotImgEdit;
