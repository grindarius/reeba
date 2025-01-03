export function useRequiredErrorMessage(field: string): string {
  return `Body should have required property '${field}'.`
}
