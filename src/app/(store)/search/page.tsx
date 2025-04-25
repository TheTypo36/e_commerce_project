import React from "react";

interface SearchPageProps {
  searchParams?: Record<string, string | string[] | undefined>;
}

async function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams?.query ?? ""; // safe fallback

  return <div>SearchPage {query}</div>;
}

export default SearchPage;
