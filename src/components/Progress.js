import React from 'react';

export default ({label, progress}) => (
  <div>
    {label + ' ' + progress * 100}
  </div>
);
