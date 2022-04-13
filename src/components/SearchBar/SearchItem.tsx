export function SearchItem({ hit, components }) {
  return (
    <a href={hit.slug} className="aa-ItemLink">
      <div className="aa-ItemContent">
        <span className="aa-SourceHeaderTitle page-subcategory">
          {hit.subcategory}
        </span>
        <div className="aa-ItemContentBody">
          <span className="aa-ItemContentTitle">{hit.title}</span>
          <div className="aa-ItemContentDescription">
            <components.Snippet hit={hit} attribute="text" />
          </div>
        </div>
      </div>
    </a>
  );
}
