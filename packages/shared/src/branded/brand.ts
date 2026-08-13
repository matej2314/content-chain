export type Brand<K, T> = K & { readonly __brand: T };
export type UnBrand<B> = B extends Brand<infer K, unknown> ? K : B;

/**
 * Niskopoziomowy cast do branded type.
 * Preferuj createXxx / isXxx na granicach HTTP — zakaz surowego brand() w controllerach.
 * Źródło: docs/brand_types.md
 */
export const brand = <B>(value: UnBrand<B>): B => value as B;
export const unbrand = <B>(value: B): UnBrand<B> => value as UnBrand<B>;
