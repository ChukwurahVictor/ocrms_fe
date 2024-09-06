import axios from "@/services/axios";
import { DataType, PageEdge } from "../types";
interface Item {
  id: string;
}

interface BaseParams {
  page?: number;
  cursor?: string;
  direction?: string;
  term?: string;
  paginationType?: string;
}

export const cleanedParams = <T>(queryParams: T) => {
  const params: any = {};
  if (queryParams) {
    const keys = Object.keys(queryParams) as Array<keyof T>;
    keys.forEach(key => {
      if (!(queryParams[key] === undefined || queryParams[key] === "")) {
        params[key] = queryParams[key];
      }
    });
  }
  return params;
};

export const reformData = <T>(data: DataType<T>): T[] =>
  data?.pageEdges?.map((d: PageEdge<T>) => ({ ...d.node })) || [];

interface LoadOptionsProps<Params, T> {
  url: string;
  params: Params;
  cursorBased?: boolean;
  // Can be a single path or a nested path for an object. Eg "title", "employee.name".
  // Can also be a function that returns the label as a string.
  labelOrLabelPath: string | ((item: T) => string);
  valueOrValuePath: string | ((item: T) => string);
}

export const loadOptions = async <Params extends BaseParams, T extends Item>({
  url,
  params,
  cursorBased,
  labelOrLabelPath,
  valueOrValuePath,
}: LoadOptionsProps<Params, T>) => {
  const res = await axios({
    url,
    params: cleanedParams(params),
  });

  let reformedOptions;
  let meta;
  const getLabelAndValue = (item: T) => ({
    label:
      typeof labelOrLabelPath === "string"
        ? _.get(item, labelOrLabelPath)
        : labelOrLabelPath(item),
    value:
      typeof valueOrValuePath === "string"
        ? _.get(item, valueOrValuePath)
        : valueOrValuePath(item),
  });
  if (cursorBased) {
    reformedOptions = reformData<T>(res.data.data).map(item =>
      getLabelAndValue(item)
    );
  } else {
    meta = res?.data?.data?.pageMeta;
    reformedOptions = res?.data.data.pageItems.map((item: T) =>
      getLabelAndValue(item)
    );
  }

  if (cursorBased) {
    return {
      options: reformedOptions,
      hasMore: false,
    };
  }
  return {
    options: reformedOptions,
    hasMore: meta.currentPage < meta.totalPages,
    additional: {
      page: (params.page! + 1) as number,
    },
  };
};
