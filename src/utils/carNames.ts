const BRANDS = [
  'Tesla',
  'BMW',
  'Mercedes',
  'Audi',
  'Toyota',
  'Ford',
  'Honda',
  'Porsche',
  'Ferrari',
  'Lamborghini',
  'Chevrolet',
  'Nissan',
  'Mazda',
  'Subaru',
  'Volkswagen',
  'Hyundai',
  'Kia',
  'Volvo',
  'Jaguar',
  'Lexus',
];

const MODELS = [
  'Roadster',
  'Model S',
  'Mustang',
  'Civic',
  'Camry',
  'X5',
  'A4',
  'GT',
  'Supra',
  'Outback',
  'Aventador',
  'Cayenne',
  '911',
  'F-150',
  'Corolla',
  'Golf',
  'Accord',
  'Wrangler',
  'Impreza',
  'Rav4',
];

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function randomCarName(): string {
  return `${pickRandom(BRANDS)} ${pickRandom(MODELS)}`;
}
