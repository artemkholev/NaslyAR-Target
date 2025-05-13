import express from 'express';
import { Notification } from '../models/notification.entity.js';

const router = express.Router();

router.get('/dashboard-notifications', async (req, res) => {
  const notifications = await Notification.findAll({
    limit: 5,
    order: [['created_at', 'DESC']],
  });

  const unreadCount = await Notification.count({
    where: { is_read: false },
  });

  res.json({ notifications, unreadCount });
});

export default router;
