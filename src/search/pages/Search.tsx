import { FeedContent } from "src/feed/components";
import { Loading, SearchInput } from "src/shared/components";
import { useTypedSelector } from "src/store";
import { searchPosts } from "src/store/post";
import { useSearch } from "src/hooks";
import { PaginatedResponse, PostInfo, QueryParams } from "src/interfaces";
import { useCallback, useEffect } from "react";

export const Search = () => {
  const { searchResults, isLoadingSearch } = useTypedSelector(
    ({ post }) => post
  );

  const onSearchPosts = useCallback(
    (filter: string) =>
      searchPosts({
        search: filter,
        limit: 10,
        page: 1,
      }),
    []
  );

  const { onSearch } = useSearch<
    PaginatedResponse<PostInfo>,
    QueryParams | undefined
  >({
    value: "",
    action: onSearchPosts,
  });

  useEffect(() => {
    document.title = "Buscar publicaciones";
  }, []);

  return (
    <div className="section-content px-4 !pt-12">
      <div className="px-4">
        <h2 className="text-3xl font-semibold mb-4">Buscar publicaciones</h2>

        <SearchInput
          placeholder="Buscar tema de interés"
          onSearch={onSearch}
          backgroundColor="white"
          textColor="black"
          iconClassName="text-gray-400"
        />
      </div>

      {isLoadingSearch ? (
        <div className="loading-container">
          <Loading textClass="text-black" />
        </div>
      ) : (
        <div className="mt-8">
          <FeedContent posts={searchResults} />
        </div>
      )}
    </div>
  );
};
