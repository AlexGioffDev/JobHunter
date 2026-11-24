import Jobs from "@/components/Home/Jobs";
import SearchForm from "@/components/Search/SearchForm";

import { JobsQuery } from "@/lib/jobicy";
import { Suspense } from "react";

type Params = Promise<JobsQuery>;

export default async function Home({ searchParams }: { searchParams: Params }) {
  return (
    <div className="pb-10">
      <SearchForm />
      <Suspense  fallback="Loading...">
        <Jobs searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
