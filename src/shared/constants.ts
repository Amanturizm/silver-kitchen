export const BASE_URL = process.env.NEXT_PUBLIC_TEST_API

export const buildQueryString = <T extends Record<string, string | number | null | undefined>>(paramsObj: T): string => {
  const params = new URLSearchParams();

  Object.entries(paramsObj).forEach(([key, value]) => {
    if (value != null) {
      params.append(key, String(value));
    }
  });

  return params.toString();
};