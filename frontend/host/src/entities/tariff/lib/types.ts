export interface Tariff {
    id: string;               // UUID
    name: string;             // Название тарифа
    description: string;      // Описание тарифа
    price: number;            // Цена тарифа
    mainPageShow: boolean;    // Флаг отображения на главной странице
    createdAt: string;        // Дата создания (ISO строка)
    updatedAt: string;        // Дата обновления (ISO строка)
  }
  