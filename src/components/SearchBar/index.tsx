import {Search} from "./styles";

export default function SearchBar() {
  return (
    <Search>
      <div>
        <div>
          <input
            id="amplify-docs-search-input"
            className="three-dee-effect"
            type="search"
            placeholder="Search"
          />
          <img src="/search.svg" alt="search" />
        </div>
      </div>
    </Search>
  );
}
