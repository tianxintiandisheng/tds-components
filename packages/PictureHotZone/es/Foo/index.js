import React from 'react';
import { Button } from 'antd';
export default (function (_ref) {
  var title = _ref.title;
  return /*#__PURE__*/ React.createElement(
    'div',
    null,
    /*#__PURE__*/ React.createElement(
      Button,
      {
        type: 'primary',
      },
      'Primary Button',
    ),
    /*#__PURE__*/ React.createElement(Button, null, 'Default Button'),
    /*#__PURE__*/ React.createElement(
      Button,
      {
        type: 'dashed',
      },
      'Dashed Button',
    ),
    /*#__PURE__*/ React.createElement('br', null),
    /*#__PURE__*/ React.createElement(
      Button,
      {
        type: 'text',
      },
      'Text Button',
    ),
    /*#__PURE__*/ React.createElement(
      Button,
      {
        type: 'link',
      },
      'Link Button',
    ),
  );
});
