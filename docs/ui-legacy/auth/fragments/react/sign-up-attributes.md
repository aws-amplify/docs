<table>
  <thead>
    <tr>
      <th>Attribute</th>
      <th>Type</th>
      <th>Description</th>
      <th>Default</th>
      <th>Required</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-column="Attribute">header</td>
      <td data-column="Type">string</td>
      <td data-column="Description">the component header</td>
      <td data-column="Default">'Create a new account'</td>
      <td data-column="Required">no</td>
    </tr>
    <tr>
      <td data-column="Attribute">signUpFields</td>
      <td data-column="Type">array</td>
      <td data-column="Description">see below</td>
      <td data-column="Default">see below</td>
      <td data-column="Required">no</td>
    </tr>
    <tr>
      <td data-column="Attribute">defaultCountryCode</td>
      <td data-column="Type">string</td>
      <td data-column="Description">
        the preselected value in the country code dropdown
      </td>
      <td data-column="Default">'1'</td>
      <td data-column="Required">no</td>
    </tr>
    <tr>
      <td data-column="Attribute">hideAllDefaults</td>
      <td data-column="Type">boolean</td>
      <td data-column="Description">
        determines whether all default signup fields are to be hidden. This
        works in conjunction with the signUpFields attribute
      </td>
      <td data-column="Default">
        if there is no signUpFields attribute, defaults to false
      </td>
      <td data-column="Required">no</td>
    </tr>
    <tr>
      <td data-column="Attribute">hiddenDefaults</td>
      <td data-column="Type">array</td>
      <td data-column="Description">
        determines whether particular default fields are hidden
      </td>
      <td data-column="Default">
        N/A (possible values include 'username', 'password', 'phone_number', and
        'email')
      </td>
      <td data-column="Required">no</td>
    </tr>
  </tbody>
</table>