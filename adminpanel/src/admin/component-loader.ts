import { ComponentLoader } from 'adminjs';

const componentLoader = new ComponentLoader();

const StatusBadge = componentLoader.add('StatusBadge', '../components/status-badge.js');
const BooleanIcon = componentLoader.add('BooleanIcon', '../components/boolean-icon.js');
const Dashboard = componentLoader.add('Dashboard', '../components/dashboard.js');

// Можно подключать больше компонентов здесь по мере необходимости:
export const components = {
  StatusBadge,
  BooleanIcon,
  Dashboard,
  // AnotherComponent: componentLoader.add('Another', './admin/components/another.tsx')
};

export default componentLoader;
