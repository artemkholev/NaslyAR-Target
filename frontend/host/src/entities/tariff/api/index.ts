import baseApi from "@/shared/api/requests";
import { Tariff } from "../lib";

// Получить тарифы для главной страницы (фильтрованные)
export async function fetchMainTariffs(): Promise<Tariff[]> {
  try {
    const { data } = await baseApi.get<Tariff[]>("/api/tariffs/main");
    return data;
  } catch (error) {
    console.error("Failed to fetch main page tariffs", error);
    throw new Error("Failed to fetch main page tariffs");
  }
}

// Получить полный список тарифов
export async function fetchAllTariffs(): Promise<Tariff[]> {
  try {
    const { data } = await baseApi.get<Tariff[]>("/api/tariffs");
    return data;
  } catch (error) {
    console.error("Failed to fetch all tariffs", error);
    throw new Error("Failed to fetch all tariffs");
  }
}

// Получить тариф по ID
export async function fetchTariffById(id: string): Promise<Tariff> {
  try {
    const { data } = await baseApi.get<Tariff>(`/api/tariffs/${id}`);
    return data;
  } catch (error) {
    console.error(`Failed to fetch tariff with id ${id}`, error);
    throw new Error("Failed to fetch tariff");
  }
}
