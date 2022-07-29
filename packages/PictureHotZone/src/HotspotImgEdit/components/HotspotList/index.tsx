import React from 'react';
// import RelatedSimple from '@/components/RelatedSimple';
import { Popconfirm } from 'antd';
import { __BoxItem } from '../../interface';
import ss from './index.less';

interface __HotspotListProps {
  /**
   * @description      距离顶部距离
   * @default           0
   */
  boxArray: __BoxItem[]; // 支持识别 TypeScript 可选类型为非必选属性
  otherPorps: any;
  typeComp: string;
  setBoxArray: Function;
  /**
   * @description      当前选中热区的uuid
   * @default           0
   */
  curSelectItemUuid: number;
  /**
   * @description      设置当前选中热区
   * @default           0
   */
  setCurSelectItemUuid: Function;
}

function HotspotList(props: __HotspotListProps) {
  const { boxArray, otherPorps, typeComp, setBoxArray, curSelectItemUuid, setCurSelectItemUuid } =
    props;

  function updateBoxArray(action: string, uuid: number, dataItem?: any) {
    let newList = [];
    switch (action) {
      case 'update':
        newList = boxArray.map((i: __BoxItem) => {
          if (i.uuid === uuid) {
            return {
              ...i,
              link: dataItem,
            };
          }
          return i;
        });
        break;
      case 'delete':
        newList = boxArray.filter((i) => i.uuid !== uuid);
        break;
      default:
        newList = boxArray;
        break;
    }
    setBoxArray([...newList]);
  }
  const renderList = () => {
    if (boxArray.length > 0) {
      return boxArray.map((item) => {
        return (
          <div
            key={item.uuid}
            onClick={() => setCurSelectItemUuid(item.uuid)}
            className={item.uuid === curSelectItemUuid ? ss.itemContentCur : ss.itemContent}
          >
            <div className={ss.itemContentLeft}>
              <div>{`【${item.orderNum}】`}</div>
              {/* <RelatedSimple
                value={item.link}
                onChange={(dataItem: any) => updateBoxArray('update', item.uuid, dataItem)}
                typeComp={typeComp}
                otherPorps={otherPorps}
              /> */}
            </div>
            <Popconfirm
              title="确认删除热区包括跳转链接吗?"
              onConfirm={() => updateBoxArray('delete', item.uuid)}
              // onCancel={cancel}
              okText="确认"
              cancelText="取消"
            >
              <a className={ss.actionButton}>删除</a>
            </Popconfirm>
          </div>
        );
      });
    }
    return null;
  };

  return (
    <div className={ss.root}>
      <div className={ss.title}>
        <div className={ss.titleLeft}>热区列表：</div>
        <Popconfirm
          title="确认清空所有热区吗?"
          onConfirm={() => setBoxArray([])}
          // onCancel={cancel}
          okText="确认"
          cancelText="取消"
        >
          <a className={ss.actionButton}>清空</a>
        </Popconfirm>
      </div>
      <div className={ss.content}>{renderList()}</div>
    </div>
  );
}

export default HotspotList;
