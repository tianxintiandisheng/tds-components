import React, { useState, useEffect } from 'react';
import { __BoxItem } from '../../interface';
import RndItem from '../RndItem';
import ss from './index.scss';

interface __ImgEditProps {
  /**
   * 类名
   * @description       类名
   * @description.zh-CN 还支持不同的 locale 后缀来实现多语言描述
   * @default           支持定义默认值
   */
  className?: string; // 支持识别 TypeScript 可选类型为非必选属性
  /**
   * label
   * @description       label
   * @description.zh-CN 还支持不同的 locale 后缀来实现多语言描述
   * @default           支持定义默认值
   */
  imgSrc: string;
  setBoxArray: Function;
  boxArray: __BoxItem[];
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
/**
 * @function 获取热区序号
 * */
const calculateNum = (boxArray: __BoxItem[] = []) => {
  let maxNum = 0;
  if (boxArray.length > 0) {
    boxArray.forEach((item) => {
      const { orderNum } = item || {};
      if (orderNum && maxNum < item.orderNum) {
        maxNum = item.orderNum;
      }
    });
  }
  // eslint-disable-next-line consistent-return
  return maxNum + 1;
};

function ImgEdit(props: __ImgEditProps) {
  // const refElem = useRef(null) // 使用ref获取容器位置
  const [canDraw, setCanDraw] = useState(false);
  const [canAdd, setCanAdd] = useState(true);
  const [originX, setOriginX] = useState(0); // 绘制矩形左侧定位
  const [originY, setOriginY] = useState(0); // 绘制矩形顶部定位
  const [x, setX] = useState(0); // 绘制矩形左侧定位
  const [y, setY] = useState(0); // 绘制矩形顶部定位
  const [width, setWidth] = useState(0); // 绘制矩形宽度
  const [height, setHeight] = useState(0); // 绘制矩形高度
  const [contentTop, setContentTop] = useState(0); // 容器盒子距离顶部距离
  const [contentLeft, setcontentLeft] = useState(0); // 容器盒子距离左侧距离
  const [contentWidth, setcontentWidth] = useState(0); // 容器盒子宽度
  const [contentHeight, setcontentHeight] = useState(0); // 容器盒子高度

  const { imgSrc, setBoxArray, boxArray, curSelectItemUuid, setCurSelectItemUuid } = props;

  useEffect(() => {
    // 监听content位置变化
    const timer = setInterval(() => {
      setContentRect();
    }, 50);
    return () => {
      clearInterval(timer);
    };
  }, []);
  /**
   * @function 初始化盒子绘制数据
   * */
  function initDrawBoxData() {
    setOriginX(0);
    setOriginY(0);
    setX(0);
    setY(0);
    setWidth(0);
    setHeight(0);
    // setContentTop(0);
    // setcontentLeft(0);
  }
  const handleMouseDown = (e: any) => {
    if (canAdd) {
      const { pageX, pageY } = e; // 是鼠标在页面上的位置,从页面左上角开始,即是以页面为参考点,不随滑动条移动而变化。
      setOriginX(pageX);
      setOriginY(pageY);
      setX(pageX - contentLeft);
      setY(pageY - contentTop);
      setCanDraw(true);
    }
  };
  //   console.log('boxArray',boxArray);

  const handleMouseMove = (e: any) => {
    // console.log("handleMouseMove-canDraw", canDraw);
    // console.log("handleMouseMove-nativeEvent", e.nativeEvent);

    if (canDraw) {
      const { pageX, pageY } = e;
      // console.log("down", e);
      if (pageX > originX) {
        setWidth(pageX - originX);
        // setX(originX-contentLeft);
      } else {
        setWidth(originX - pageX);
        setX(pageX - contentLeft);
      }
      if (pageY > originY) {
        setHeight(pageY - originY);
        // setY(originY-contentTop);
      } else {
        setHeight(originY - pageY);
        setY(pageY - contentTop);
      }
    }
  };

  const handleMouseUp = () => {
    endDraw();
  };
  const handleMouseEnter = () => {};

  const handleMouseLeave = () => {
    endDraw();
  };

  const setContentRect = () => {
    let elem = document.querySelector('#content');
    let rect = elem.getBoundingClientRect();
    const { top, left } = rect;
    setcontentWidth(rect.width);
    setcontentHeight(rect.height);
    setContentTop(top);
    setcontentLeft(left);
  };

  /**
   * @function 结束绘制
   *
   */
  function endDraw() {
    setCanDraw(false);
    if (width > 20 && height > 20) {
      const uuid = new Date().getTime();
      const newBoxItem: __BoxItem = {
        uuid,
        orderNum: calculateNum(boxArray),
        x: x / contentWidth,
        y: y / contentHeight,
        width: width / contentWidth,
        height: height / contentHeight,
      };
      setBoxArray([...boxArray, newBoxItem]);
      setCurSelectItemUuid(uuid);
    }
    initDrawBoxData();
  }

  const renderBoxArray = () => {
    if (boxArray.length === 0) {
      return null;
    }
    return boxArray.map((i) => {
      return (
        <RndItem
          key={i.uuid}
          uuid={i.uuid}
          orderNum={i.orderNum}
          className={ss.boxItem}
          setCanAdd={setCanAdd}
          setBoxArray={setBoxArray}
          boxArray={boxArray}
          xInit={i.x}
          yInit={i.y}
          widthInit={i.width}
          heightInit={i.height}
          contentWidth={contentWidth}
          contentHeight={contentHeight}
          curSelectItemUuid={curSelectItemUuid}
          setCurSelectItemUuid={setCurSelectItemUuid}
        >
          1
        </RndItem>
      );
    });
  };
  // const rect=refElem.current?refElem.current.getBoundingClientRect():{};
  // useEffect(() => {
  //   const width = refElem.current ? refElem.current.offsetWidth : 0;
  //   const height = refElem.current ? refElem.current.offsetHeight : 0;
  //   setcontentWidth(rect.width)
  //   setcontentHeight(rect.height)
  //   setContentTop(rect.top)
  //   setcontentLeft(rect.left)
  //   console.log('refElem-位置-rect',rect );
  // }, [rect.width,rect.height,rect.top,rect.left]);

  return (
    <div className={ss.root}>
      <div
        id="content"
        // style={{ width:contentWidth, height:contentHeight }}
        // ref={refElem}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {renderBoxArray()}
        {/* {renderBoxItem()} */}
        <div
          className={ss.boxEdit}
          style={{ position: 'absolute', top: y, left: x, width, height }}
        >
          {/* cover */}
        </div>
        <img className={ss.image} src={imgSrc}></img>
      </div>
    </div>
  );
}

export default ImgEdit;
