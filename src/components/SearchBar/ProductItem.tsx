export function ProductItem({ hit, components }) {
  return (
    <a href={hit.slug} className="aa-ItemLink">
      <div className="aa-ItemContent">
        <span className="aa-SourceHeaderTitle">{hit.subcategory}</span>
        <div className="aa-ItemContentBody">
          <span className="aa-ItemContentTitle">{hit.title}</span>
          <div className="aa-ItemContentDescription">
            <components.Highlight hit={hit} attribute="description" />
          </div>
        </div>
      </div>
    </a>
  );
}
