import React, { useState, useEffect } from 'react';

const FeaturesEdit = (props) => {
  const { onChange, property, record } = props;

  // Принимаем initial value из record.params.features
  const initialFeatures = record.params[property.name] ? JSON.parse(record.params[property.name]) : [];

  const [features, setFeatures] = useState(initialFeatures);

  // Сохраняем при изменениях в поле формы AdminJS сериализованным JSON
  useEffect(() => {
    onChange(property.name, JSON.stringify(features));
  }, [features]);

  const addFeature = () => setFeatures([...features, '']);

  const updateFeature = (index, value) => {
    const newFeatures = [...features];
    newFeatures[index] = value;
    setFeatures(newFeatures);
  };

  const removeFeature = (index) => {
    const newFeatures = features.filter((_, i) => i !== index);
    setFeatures(newFeatures);
  };

  return (
    <div>
      {features.map((feature, i) => (
        <div key={i} style={{ marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
          <input
            type="text"
            value={feature}
            onChange={(e) => updateFeature(i, e.target.value)}
            style={{ flexGrow: 1, marginRight: '8px' }}
            placeholder="Введите фичу"
          />
          <button type="button" onClick={() => removeFeature(i)}>
            Удалить
          </button>
        </div>
      ))}
      <button type="button" onClick={addFeature}>
        Добавить фичу
      </button>
    </div>
  );
};

export default FeaturesEdit;

