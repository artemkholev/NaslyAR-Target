import React from "react";
import { useTranslation } from "react-i18next";

interface Goal {
  id: number;
  text: string;
  icon: string;
  amount: number;
}

const GoalCard = ({ goal }: { goal: Goal }) => {
  return (
    <div
      className={`
        flex flex-col justify-between p-6 h-56
        border border-[var(--main-stroke)] rounded-2xl
        bg-white shadow-regular
        hover:shadow-medium
        transition-shadow duration-200
      `}>
      <div className='flex justify-between items-start'>
        <span className='text-xl font-semibold text-[var(--text-primary)]'>{goal.text}</span>
        <span className='text-3xl'>{goal.icon}</span>
      </div>

      <div className='mt-auto pt-4'>
        <span className='block text-sm text-[var(--text-secondary)] mb-1'>Количество</span>
        <span className='text-2xl font-bold text-[var(--text-primary)]'>{goal.amount}</span>
      </div>
    </div>
  );
};

export const GoalsList = () => {
  const { t } = useTranslation();

  const goals: Goal[] = [
    { id: 0, text: t("home_page.goals.goal_1"), icon: "⚡", amount: 310 },
    { id: 1, text: t("home_page.goals.goal_2"), icon: "🔥", amount: 537 },
    { id: 2, text: t("home_page.goals.goal_3"), icon: "😱", amount: 159 },
    { id: 3, text: t("home_page.goals.goal_4"), icon: "😢", amount: 213 },
  ];

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl'>
      {goals.map((goal) => (
        <GoalCard key={goal.id} goal={goal} />
      ))}
    </div>
  );
};
