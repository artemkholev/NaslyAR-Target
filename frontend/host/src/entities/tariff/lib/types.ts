export interface TariffFeature {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface Tariff {
  id: string;
  title: string;
  price: number;
  oldPrice?: number | null;
  description?: string | null;
  showOnMainPage: boolean;
  features: TariffFeature[];
  createdAt: string;
  updatedAt: string;
}
