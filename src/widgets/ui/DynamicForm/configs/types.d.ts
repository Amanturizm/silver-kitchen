export type FieldDef = {
  name: string;
  label: string;
  type?: FieldType;
  required?: boolean;
  span?: number;
  options?: Option[];
  isDynamicChain?: boolean;
  getNextOptions?: (value: string, currentOptions?: TreeNode[]) => Option[];
  getChainValue?: (formValues: any) => string | null;
};

export type FieldType =
  | 'text'
  | 'password'
  | 'textarea'
  | 'textEditor'
  | 'number'
  | 'select'
  | 'file'
  | 'files'
  | 'map'
  | 'date';

export interface Option {
  label: string;
  value: string;
}

export interface TreeNode {
  id: number;
  name: string;
  children?: TreeNode[];
}
