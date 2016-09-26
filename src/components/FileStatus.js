import React from 'react';

export default ({file, label, reset}) => {
  const onClick = e => {
    e.preventDefault();
    reset();
  };
  if (file !== undefined) {
    return (
      <div>
        {label + file.name} (V)
        <button onClick={onClick}>Сбросить</button>
      </div>
    );
  }
  else {
    return (
      <div>
        {label} Empty
      </div>
    );
  }
};
