import { get } from "./_api";

async function findMany(query, cancelToken) {
  return get("analytics", query, null, cancelToken);
}

export default {
  findMany,
};
