export function formatCurrency(
  number: number,
  locale?: string,
  options?: Intl.NumberFormatOptions
) {
  return `${Intl.NumberFormat(locale, options).format(number)}đ`;
}
