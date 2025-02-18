import React from "react";

export const HomePage: React.FC = () => {
  return (
    <div className="h-full flex flex-col">
      <h1 className="text-2xl font-bold">Главная страница</h1>
      <a href="/admin">Перейти в админку</a>
      <a href="/auth">Перейти на авторизацию</a>
      <a href="/user">Перейти в user</a>
    </div>
  );
};
