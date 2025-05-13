import React from 'react';

const BooleanIcon = ({ record, property }) => {
  const value = record.params[property.path];

  return (
    <span style={{ fontSize: '1.2rem' }}>
      {value ? '✅' : '❌'}
    </span>
  );
};

export default BooleanIcon;
