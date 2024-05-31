export const ReferenceTable = ({ options }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Option</th>
          <th>Required</th>
          <th>Type</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {options.map((option) => {
          let type;
          if (Array.isArray(option.type)) {
            type = option.type.map((t, idx) => {
              return (
                <>
                  {idx > 0 ? ' or ' : ''}
                  <code>{t}</code>
                </>
              );
            });
          } else {
            type = <code>{option.type}</code>;
          }
          return (
            <tr key={option.option}>
              <td>
                <code>{option.option}</code>
              </td>
              <td>{option.required}</td>
              <td>{type}</td>
              <td>{option.description}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
