import React from 'react';

const FeaturesShow = (props) => {
  const { property, record } = props;

  let features = [];

  try {
    features = JSON.parse(record.params[property.name]);
  } catch (e) {
    features = [];
  }

  if (!features || !features.length) {
    return <p>Нет фич</p>;
  }

  return (
    <ul>
      {features.map((feature, index) => (
        <li key={index}>✅ {feature}</li>
      ))}
    </ul>
  );
};

export default FeaturesShow;
