import React from "react";

async function SearchPage({
  searchParams,
}: {
  searchParams: { query: string };
}) {
  const { query } = searchParams;
  return <div>SearchPage {query}</div>;
}

export default SearchPage;
