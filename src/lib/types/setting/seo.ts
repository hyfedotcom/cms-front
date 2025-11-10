export interface Seo {
  id?: number;

  // Управление индексированием
  is_indexable: boolean;

  // Основные мета-поля
  meta_title?: string;
  meta_description?: string;

  // OG и визуальные данные
  meta_image?: {
    url?: string;
    alt?: string;
  };

  // Robots, canonical и keywords
  meta_robots?: string;
  meta_viewport?: string;
  canonical_URL?: string;
  keywords?: string;

  // JSON-LD / structured data
  structured_data?: string | null;
}
