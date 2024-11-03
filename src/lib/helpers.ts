export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
  }).format(value);
}

export function getRandomId(): number {
  // random id between 10000 and 99999999
  return Math.floor(Math.random() * 99999999) + 10000;
}
