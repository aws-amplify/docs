export function ProductItem({ hit, components }) {
  console.log('SLUG', hit.slug);
  const topLevel = hit.slug.split('/')[1].toUpperCase();
  return (
    <a href={hit.slug} className="aa-ItemLink">
      <span className="aa-SourceHeaderTitle">{topLevel}</span>
      <div className="aa-SourceHeaderLine" />
      <div className="aa-ItemContent">
        <span className="aa-ItemContentTitle">{hit.heading}</span>
        <div className="aa-ItemTitle">
          <components.Highlight hit={hit} attribute="title" />
        </div>
      </div>
    </a>
  );
}
