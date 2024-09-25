// Pattern adopted from the following blog post:
// https://tkdodo.eu/blog/effective-react-query-keys

// Something like this
export const demoKeys = {
  all: ["todos"] as const,
  list: (params?: unknown) => [...demoKeys.all, "list", params],
  details: (id: string) => [...demoKeys.all, "details", id],
};
