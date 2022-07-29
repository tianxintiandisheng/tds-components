export interface __BoxItem {
  /**
   * @description      距离顶部距离
   * @default           0
   */
  x: number; // 支持识别 TypeScript 可选类型为非必选属性
  /**
   * @description       距离左侧距离
   * @default           0
   */
  y: number;
  /**
   * @description       宽度
   * @default           0
   */
  width: number;
  /**
   * @description       高度
   * @default           0
   */
  height: number;
  /**
   * @description       唯一值
   * @default           0
   */
  uuid: number;
  /**
   * @description       热区序号
   * @default           无
   */
  orderNum: number;
  /**
   * @description       跳转链接
   * @default           无
   */
  link?: [];
}
