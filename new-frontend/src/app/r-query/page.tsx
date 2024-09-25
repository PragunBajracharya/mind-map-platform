"use client";

import { useMockDataList } from "@/hooks/queries/use-mock-data";

export default function TestPage() {
  const { data, isLoading } = useMockDataList();

  if (isLoading) {
    return "Loading...";
  }

  return (
    <div>
      {data?.data.map((d) => (
        <div key={d.id}>{d.name}</div>
      ))}
    </div>
  );
}
