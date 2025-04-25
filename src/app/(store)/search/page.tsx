import React from "react";

type SearchPageProps = {
  searchParams?: { [key: string]: string | string[] | undefined };
};

async function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams?.query ?? "";

  return <div>SearchPage {query}</div>;
}

export default SearchPage;
