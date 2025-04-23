import { type SchemaTypeDefinition } from "sanity";

import { blockContentType } from "./blockContentType";
import { categoryType } from "./categoryType";
import { productTypes } from "./productTypes";
import { orderTypes } from "./orderType";
import { salesType } from "./saleType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContentType, categoryType, orderTypes, productTypes, salesType],
};
