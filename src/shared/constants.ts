import { TreeNode } from '@/widgets/ui/DynamicForm/configs/types';

export const BASE_URL = process.env.NEXT_PUBLIC_TEST_API;

export const buildQueryString = <T extends Record<string, string | number | null | undefined>>(
  paramsObj: T,
): string => {
  const params = new URLSearchParams();

  Object.entries(paramsObj).forEach(([key, value]) => {
    if (value != null) {
      params.append(key, String(value));
    }
  });

  return params.toString();
};

export const buildFormData = (body: any) => {
  const formData = new FormData();

  const appendValue = (key: string, value: any) => {
    if (value === null || value === undefined) return;

    if (value instanceof File || value instanceof Blob) {
      formData.append(key, value);
    } else if (Array.isArray(value)) {
      value.forEach((v) => appendValue(key, v));
    } else if (typeof value === 'object') {
      Object.keys(value).forEach((k) => {
        appendValue(`${key}[${k}]`, value[k]);
      });
    } else {
      formData.append(key, String(value));
    }
  };

  Object.keys(body).forEach((key) => appendValue(key, body[key]));

  return formData;
};

export function findPath(
  tree: TreeNode[] | undefined | null,
  targetId: number,
  path: TreeNode[] = [],
) {
  if (!Array.isArray(tree) || tree.length === 0) return null;

  for (const node of tree) {
    const newPath = [...path, node];

    if (node.id === targetId) return newPath;

    if (Array.isArray(node.children) && node.children.length) {
      const res = findPath(node.children, targetId, newPath);
      if (res) return res;
    }
  }

  return null;
}

export const scrollToMain = () => {
  requestAnimationFrame(() => {
    const el = document.getElementById('main');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
};
