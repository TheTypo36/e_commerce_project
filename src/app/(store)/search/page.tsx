import React from "react";

async function SearchPage({ searchParams }: any) {
  const { query } = await searchParams;
  return <div>SearchPage {query}</div>;
}

export default SearchPage;
