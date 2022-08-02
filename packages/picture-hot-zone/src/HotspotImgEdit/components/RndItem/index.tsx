import React, { useState, useEffect } from 'react';
import { Rnd } from 'react-rnd';
import classnames from 'classnames';
import { __BoxItem } from '../../interface';
import './index.less';

const prefixCls = 'tds-picture-hot-zone';
const componentName = 'rnd-item';

/**
 * @function 将含有px的字符串转为数字
 * */
const changeStyleToNum = (str: string): number => {
  // debugger
  if (str.indexOf('px') !== -1) {
    // str.substring(0,str.length-2);
    return Number(str.substring(0, str.length - 2));
  }
  return Number(str);
};

function RndItem(props: any) {
  const {
    uuid,
    orderNum,
    widthInit = 20,
    heightInit = 20,
    xInit = 40,
    yInit = 40,
    setCanAdd,
    contentWidth,
    contentHeight,
    setBoxArray,
    boxArray,
    curSelectItemUuid,
    setCurSelectItemUuid,
  } = props;
  const [width, setWidth] = useState<number>(widthInit);
  const [height, setHeight] = useState<number>(heightInit);
  const [x, setX] = useState<number>(xInit);
  const [y, setY] = useState<number>(yInit);
  useEffect(() => {
    setX(xInit * contentWidth);
    setY(yInit * contentHeight);
    setWidth(widthInit * contentWidth);
    setHeight(heightInit * contentHeight);
  }, [contentWidth, contentHeight, xInit, yInit, widthInit, heightInit]);
  const handleMouseEnter = () => {
    setCanAdd(false);
  };
  const handleMouseLeave = () => {
    setCanAdd(true);
  };
  function updateBoxArray(tempX: number, tempY: number, tempWidth: number, tempHeight: number) {
    const newList = boxArray.map((i: __BoxItem) => {
      if (i.uuid === uuid) {
        return {
          ...i,
          x: tempX / contentWidth,
          y: tempY / contentHeight,
          width: tempWidth / contentWidth,
          height: tempHeight / contentHeight,
        };
      }

      return i;
    });
    setBoxArray([...newList]);
  }
  return (
    <div
      className={classnames(`${prefixCls}-${componentName}`)}
      onClick={() => setCurSelectItemUuid(uuid)}
    >
      <Rnd
        //  className={ss.root}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        size={{ width, height }}
        position={{ x, y }}
        onDragStop={(e, d) => {
          setX(d.x);
          setY(d.y);
          updateBoxArray(d.x, d.y, width, height);
        }}
        onResizeStop={(e, direction, ref, delta, position) => {
          setWidth(changeStyleToNum(ref.style.width));
          setHeight(changeStyleToNum(ref.style.height));
          setX(position.x);
          setY(position.y);
          updateBoxArray(
            position.x,
            position.y,
            changeStyleToNum(ref.style.width),
            changeStyleToNum(ref.style.height),
          );
        }}
        // className="rndElement"
        className={uuid === curSelectItemUuid ? 'rndElementCur' : 'rndElement'}
        bounds="#content"
        minWidth={20}
        minHeight={20}
      >
        <div className={uuid === curSelectItemUuid ? 'orderNumCur' : 'orderNum'}>{orderNum}</div>
      </Rnd>
    </div>
  );
}

export default RndItem;
