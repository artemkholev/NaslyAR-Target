// import { useTranslation } from "react-i18next";

interface Goal {
  id: number;
  text: string;
  icon: string;
  amount: number;
}

const GoalListComponent = ({ goals }: { goals: Goal[] }) => {
  // return goals.map((goal) => (
  //   <div
  //     key={goal.id}
  //     className='rounded-[40px] h-60 flex items-center justify-center p-4'
  //     style={{ backgroundColor: goal.id % 2 ? "#DFE6EF" : "#F3F3F3" }}>
  //     <div className='text-2xl z-[13] flex flex-col gap-2'>
  //       <span className='typography__title--medium-plus'>{goal.text}</span>
  //       <span className='w-14 bg-white rounded-full text-center text-lg'>
  //         {goal.icon}
  //         {goal.amount}
  //       </span>
  //     </div>
  //   </div>
  // ));
};

export const GoalsList = () => {
  // const { t } = useTranslation("library");

  // const goals: Goal[] = [
  //   { id: 0, text: t("home_page.goals.goal_1"), icon: "⚡", amount: 310 },
  //   { id: 1, text: t("home_page.goals.goal_2"), icon: "🔥", amount: 537 },
  //   { id: 2, text: t("home_page.goals.goal_3"), icon: "😱", amount: 159 },
  //   { id: 3, text: t("home_page.goals.goal_4"), icon: "😢", amount: 213 },
  // ];

  // return <GoalListComponent goals={goals} />;
};
