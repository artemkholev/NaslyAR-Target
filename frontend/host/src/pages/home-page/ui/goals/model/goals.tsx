import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface Goal {
  id: number;
  text: string;
  icon: string;
  amount: number;
}

const GoalCard = ({ goal, onClick }: { goal: Goal; onClick: (goal: Goal) => void }) => {
  return (
    <div
      onClick={() => onClick(goal)}
      className={`
        flex flex-col justify-between p-6 h-56 cursor-pointer
        border border-[var(--main-stroke)] rounded-2xl
        bg-white shadow-regular hover:shadow-medium
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

const getGoalDescription = (goal: Goal) => {
  switch (goal.id) {
    case 0:
      return `
        Цель "${goal.text}" отражает количество успешно завершённых действий, таких как звонки, заявки или другие ключевые шаги, приводящие к результату.
        Этот показатель говорит о нашей эффективности и способности доводить дела до конца. 
        На данный момент вы достигли этой цели уже ${goal.amount} раз — это отличный результат, который говорит о вашем вкладе и активности.
      `;
    case 1:
      return `
        "${goal.text}" — это метрика, показывающая количество интенсивных, высокоэнергичных взаимодействий.
        Сюда могут входить срочные задачи, инициативные предложения, участие в обсуждениях или быстрые реакции на события.
        ${goal.amount} раз вы проявили активность, стремление к улучшению и неравнодушие — это важно для общего развития команды.
      `;
    case 2:
      return `
        Цель "${goal.text}" отслеживает нестандартные ситуации — моменты, которые вызывают удивление, требуют пересмотра подходов или ведут к новым открытиям.
        Эти ${goal.amount} раз — показатель того, как часто вы сталкивались с неожиданностями и как успешно адаптировались.
        Это важный индикатор гибкости и готовности учиться на новых ситуациях.
      `;
    case 3:
      return `
        "${goal.text}" — это чувствительная, но крайне значимая метрика. Она отражает количество случаев, когда возникали сложности, недовольство или ошибки.
        Такие данные помогают улучшать процессы, предотвращать повторения и делать сервис или продукт лучше.
        ${goal.amount} раз — значит, вы не боитесь признавать проблемы и стремитесь к качественным изменениям. Это делает вашу работу зрелой и ориентированной на результат.
      `;
    default:
      return `Цель "${goal.text}" была достигнута ${goal.amount} раз. Это ценный вклад в общее дело.`;
  }
};

export const GoalsList = () => {
  const { t } = useTranslation();

  const goals: Goal[] = [
    { id: 0, text: t("home_page.goals.goal_1"), icon: "⚡", amount: 310 },
    { id: 1, text: t("home_page.goals.goal_2"), icon: "🔥", amount: 537 },
    { id: 2, text: t("home_page.goals.goal_3"), icon: "😱", amount: 159 },
    { id: 3, text: t("home_page.goals.goal_4"), icon: "😢", amount: 213 },
  ];

  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);

  const handleClose = () => setSelectedGoal(null);

  return (
    <>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl'>
        {goals.map((goal) => (
          <GoalCard key={goal.id} goal={goal} onClick={setSelectedGoal} />
        ))}
      </div>

      <Dialog
        open={!!selectedGoal}
        onClose={handleClose}
        fullWidth
        maxWidth='sm'
        PaperProps={{
          className: "rounded-2xl !bg-white !p-6",
          style: {
            backgroundColor: "var(--component-bg)",
            color: "var(--text-primary)",
          },
        }}>
        <DialogTitle className='flex items-start justify-between gap-4 text-2xl font-semibold'>
          {selectedGoal?.icon} {selectedGoal?.text}
          <IconButton onClick={handleClose} className='ml-auto'>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent className='typography__text text-[var(--text-secondary)] text-base'>
          <p>{selectedGoal && getGoalDescription(selectedGoal)}</p>
        </DialogContent>
      </Dialog>
    </>
  );
};
