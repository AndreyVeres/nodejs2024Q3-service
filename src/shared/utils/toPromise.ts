export const toPromise = <T>(data: T) => new Promise<T>((res) => setTimeout(() => res(data), 333));
