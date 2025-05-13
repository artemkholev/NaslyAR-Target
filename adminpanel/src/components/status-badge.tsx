import { BasePropertyProps } from 'adminjs';
import { Badge } from '@adminjs/design-system';
import React from 'react';

const StatusBadge: React.FC<BasePropertyProps> = (props) => {
  const { record, property } = props;
  const status = record.params[property.path];

  const colorMap: Record<string, string> = {
    pending: '#999999',
    approved: '#00b300',
    rejected: '#cc0000',
  };

  const labelMap: Record<string, string> = {
    pending: 'В ожидании',
    approved: 'Одобрено',
    rejected: 'Отклонено',
  };

  return (
    <Badge style={{ backgroundColor: colorMap[status] || '#ccc' }}>
      {labelMap[status] || status}
    </Badge>
  );
};

export default StatusBadge;
