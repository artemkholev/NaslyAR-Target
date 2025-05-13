// admin/components/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import { Box, H2, Table, TableRow, TableCell, Badge } from '@adminjs/design-system';

const Dashboard = () => {
  const [data, setData] = useState({ notifications: [], unreadCount: 0 });

  useEffect(() => {
    fetch('/admin/api/dashboard-notifications')
      .then((res) => res.json())
      .then(setData);
  }, []);

  return (
    <Box>
      <H2>Последние уведомления</H2>
      <Box variant="white" boxShadow="card" padding="xl">
        <p>Непрочитанных: <strong>{data.unreadCount}</strong></p>
        <Table>
          <thead>
            <TableRow>
              <TableCell>Заголовок</TableCell>
              <TableCell>Статус</TableCell>
              <TableCell>Дата</TableCell>
            </TableRow>
          </thead>
          <tbody>
            {data.notifications.map((n) => (
              <TableRow key={n.id}>
                <TableCell>{n.title}</TableCell>
                <TableCell>
                  <Badge>{n.status || '—'}</Badge>
                </TableCell>
                <TableCell>{new Date(n.created_at).toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default Dashboard;
