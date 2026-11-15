// src/data/inventory.ts
// Inventario de la demo. Generado desde site-spec.json (pages[/catalogo].sections[0].items).
// En producción este listado vive en WordPress; aquí es un snapshot del catálogo actual.

export interface Vehicle {
  slug: string;
  name: string;
  brand: string;
  year: number;
  priceCOP: number;
  km: number;
  image: string;
}

export const inventory: Vehicle[] = [
  { slug: "toyota-corolla-se-g", name: "Toyota Corolla SE-G", brand: "Toyota", year: 2022, priceCOP: 102800000, km: 42300, image: "car-toyota-corolla-se-g.jpg" },
  { slug: "mercedes-benz-glc-300e", name: "Mercedes-Benz GLC 300e", brand: "Mercedes-Benz", year: 2022, priceCOP: 204900000, km: 22100, image: "car-mercedes-benz-glc-300e.jpg" },
  { slug: "volvo-ex30-extended-range-core", name: "Volvo EX30 Extended Range Core", brand: "Volvo", year: 2024, priceCOP: 173500000, km: 6100, image: "car-volvo-ex30-extended-range-core.jpg" },
  { slug: "bmw-325i-cabrio", name: "BMW 325i Cabrio", brand: "BMW", year: 2011, priceCOP: 74900000, km: 84400, image: "car-bmw-325i-cabrio.jpg" },
  { slug: "mazda-cx-30-touring-at-3", name: "Mazda CX-30 Touring AT", brand: "Mazda", year: 2025, priceCOP: 117900000, km: 6100, image: "car-mazda-cx-30-touring-at-3.jpg" },
  { slug: "toyota-corolla-seg", name: "Toyota Corolla SE-G", brand: "Toyota", year: 2022, priceCOP: 105900000, km: 43400, image: "car-toyota-corolla-seg.jpg" },
  { slug: "mercedes-benz-cla-35-amg", name: "Mercedes-Benz CLA 35 AMG", brand: "Mercedes-Benz", year: 2023, priceCOP: 198600000, km: 12400, image: "car-mercedes-benz-cla-35-amg.jpg" },
  { slug: "mazda-2-grand-touring-lx", name: "Mazda 2 Grand Touring LX", brand: "Mazda", year: 2020, priceCOP: 69700000, km: 49500, image: "car-mazda-2-grand-touring-lx.jpg" },
  { slug: "land-rover-freelander-2-hse", name: "Land Rover Freelander 2 HSE", brand: "Land Rover", year: 2014, priceCOP: 71900000, km: 76000, image: "car-land-rover-freelander-2-hse.jpg" },
  { slug: "bmw-m240i", name: "BMW M240i", brand: "BMW", year: 2024, priceCOP: 241900000, km: 4200, image: "car-bmw-m240i.jpg" },
  { slug: "mini-jhon-cooper-works", name: "MINI John Cooper Works", brand: "Mini", year: 2022, priceCOP: 157200000, km: 36000, image: "car-mini-jhon-cooper-works.jpg" },
  { slug: "mazda-cx-30-touring-at-2", name: "Mazda CX-30 Touring AT", brand: "Mazda", year: 2022, priceCOP: 94600000, km: 11600, image: "car-mazda-cx-30-touring-at-2.jpg" },
  { slug: "mazda-cx-30-grand-touring-lx", name: "Mazda CX-30 Grand Touring LX", brand: "Mazda", year: 2022, priceCOP: 103500000, km: 56000, image: "car-mazda-cx-30-grand-touring-lx.jpg" },
  { slug: "mazda-cx-30-touring-at", name: "Mazda CX-30 Touring AT", brand: "Mazda", year: 2021, priceCOP: 93400000, km: 39000, image: "car-mazda-cx-30-touring-at.jpg" },
  { slug: "toyota-fortuner-street", name: "Toyota Fortuner Street", brand: "Toyota", year: 2017, priceCOP: 136800000, km: 890000, image: "car-toyota-fortuner-street.jpg" },
  { slug: "toyota-fortuner-sr5", name: "Toyota Fortuner SR5", brand: "Toyota", year: 2012, priceCOP: 84600000, km: 151000, image: "car-toyota-fortuner-sr5.jpg" },
  { slug: "toyota-fortuner-sr", name: "Toyota Fortuner SR", brand: "Toyota", year: 2022, priceCOP: 213900000, km: 48000, image: "car-toyota-fortuner-sr.jpg" },
  { slug: "toyota-fortuner-street-2", name: "Toyota Fortuner Street", brand: "Toyota", year: 2019, priceCOP: 173700000, km: 106000, image: "car-toyota-fortuner-street-2.jpg" },
  { slug: "mazda-3-sport-touring-at", name: "Mazda 3 Sport Touring AT", brand: "Mazda", year: 2017, priceCOP: 69900000, km: 37500, image: "car-mazda-3-sport-touring-at.jpg" },
];

export const brands = [...new Set(inventory.map((v) => v.brand))].sort((a, b) => a.localeCompare(b, 'es'));
