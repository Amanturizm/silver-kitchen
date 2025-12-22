import { useMemo } from 'react';
import { FieldDef, TreeNode } from './types';
import { getLevel } from '@/widgets/ui/DynamicForm/configs/utils';
import { findPath } from '@/shared/constants';

const buildNextOptions =
  (tree: TreeNode[] | undefined, categoryId?: string, isCategoriesChains?: boolean) =>
  (val: string) => {
    const path = findPath(tree || [], Number(val));
    const lastNode = path?.[path.length - 1];
    return (
      lastNode?.children
        ?.filter((c) => !isCategoriesChains || String(c.id) !== categoryId)
        .map((c) => ({ label: c.name, value: String(c.id) })) || []
    );
  };

export const useDynamicChainSelect = (
  fields: FieldDef[],
  chainNodes: TreeNode[],
  targetFieldName: string,
  rootTree?: TreeNode[],
  categoryId?: string,
  isCategoriesChains?: boolean,
): FieldDef[] => {
  return useMemo(() => {
    if (!chainNodes || !chainNodes.length) return fields;

    if (isCategoriesChains || chainNodes[chainNodes.length - 1].children?.length) {
      chainNodes.push({ id: 0, name: '', children: chainNodes[chainNodes.length - 1].children });
    }
    return fields.flatMap((f) => {
      if (f.name !== targetFieldName) return f;

      if (!rootTree) {
        return {
          ...f,
          name: targetFieldName,
          options: chainNodes.map((n) => ({ label: n.name, value: String(n.id) })),
          isDynamicChain: true,
          getNextOptions: buildNextOptions(chainNodes),
        };
      }

      return chainNodes.map((node, i) => {
        const fieldName = i === 0 ? targetFieldName : `${targetFieldName}_${i}`;
        const level = getLevel(fieldName);
        const baseLabel = f.label.replace(/уровень\s*\d+$/, '').trim();
        const siblings = i === 0 ? rootTree : chainNodes[i - 1].children || [];

        return {
          ...f,
          name: fieldName,
          label: level > 0 ? `${baseLabel} уровень ${level}` : baseLabel,
          options: siblings
            .filter((c) => !isCategoriesChains || String(c.id) !== categoryId)
            .map((n) => ({ label: n.name, value: String(n.id) })),
          isDynamicChain: true,
          getNextOptions: buildNextOptions(rootTree, categoryId),
        };
      });
    });
  }, [fields, chainNodes, targetFieldName, rootTree, categoryId, isCategoriesChains]);
};

export const useDynamicPlainSelect = (
  fields: FieldDef[],
  nodes: any[],
  targetFieldName: string,
): FieldDef[] => {
  return useMemo(() => {
    if (!nodes?.length) return fields;

    const options = nodes.map((n) => ({
      label: n.name,
      value: String(n.id),
    }));

    return fields.map((f) =>
      f.name === targetFieldName ? { ...f, options, isDynamicChain: false } : f,
    );
  }, [fields, nodes, targetFieldName]);
};
