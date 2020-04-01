<table class="doc-table">
    <thead class="doc-thead">
      <tr class="doc-tr">
        <th class="doc-th">Attribute</th>
        <th class="doc-th">Type</th>
        <th class="doc-th">Description</th>
        <th class="doc-th">Default</th>
        <th class="doc-th">Possible Values</th>
        <th class="doc-th">Required</th>
      </tr>
    </thead>
    <tbody class="doc-tbody">
      <tr class="doc-tr">
        <td class="doc-td" data-column="Attribute">mfaDescription</td>
        <td class="doc-td" data-column="Type">string</td>
        <td class="doc-td" data-column="Description">description of MFA for your users</td>
        <td class="doc-td" data-column="Default">AWS Multi-Factor Authentication (MFA) adds an extra layer of protection on top of your user name and password.</td>
        <td class="doc-td" data-column="Possible Values">N/A</td>
        <td class="doc-td" data-column="Required">no</td>
      </tr>
      <tr class="doc-tr">
        <td class="doc-td" data-column="Attribute">mfaTypes</td>
        <td class="doc-td" data-column="Type">array</td>
        <td class="doc-td" data-column="Description">an array of MFA types which will result in a radio button selection</td>
        <td class="doc-td" data-column="Default">[]</td>
        <td class="doc-td" data-column="Possible Values">‘SMS’, ‘TOTP’, ‘None’</td>
        <td class="doc-td" data-column="Required">no</td>
      </tr>
      <tr class="doc-tr">
        <td class="doc-td" data-column="Attribute">tokenInstructions</td>
        <td class="doc-td" data-column="Type">string</td>
        <td class="doc-td" data-column="Description">instructions for decoding the QR code used with TOTP</td>
        <td class="doc-td" data-column="Default">‘Scan the QR Code with your phone camera or authentication app to get the MFA code.’	</td>
        <td class="doc-td" data-column="Possible Values">N/A</td>
        <td class="doc-td" data-column="Required">no</td>
      </tr>
      <tr class="doc-tr">
        <td class="doc-td" data-column="Attribute">smsDescription</td>
        <td class="doc-td" data-column="Type">string</td>
        <td class="doc-td" data-column="Description">label for SMS radio button</td>
        <td class="doc-td" data-column="Default">‘SMS text messaging (receive a code on your mobile device)’</td>
        <td class="doc-td" data-column="Possible Values">N/A</td>
        <td class="doc-td" data-column="Required">no</td>
      </tr>
      <tr class="doc-tr">
        <td class="doc-td" data-column="Attribute">totpDescription</td>
        <td class="doc-td" data-column="Type">string</td>
        <td class="doc-td" data-column="Description">label for TOTP radio button</td>
        <td class="doc-td" data-column="Default">‘One-time password (use a QR code and MFA app to save a token on your mobile device)’</td>
        <td class="doc-td" data-column="Possible Values">N/A</td>
        <td class="doc-td" data-column="Required">no</td>
      </tr>
      <tr class="doc-tr">
        <td class="doc-td" data-column="Attribute">noMfaDescription</td>
        <td class="doc-td" data-column="Type">string</td>
        <td class="doc-td" data-column="Description">label for None radio button</td>
        <td class="doc-td" data-column="Default">‘Do not enable MFA’</td>
        <td class="doc-td" data-column="Possible Values">N/A</td>
        <td class="doc-td" data-column="Required">no</td>
      </tr>
      <tr class="doc-tr">
          <td class="doc-td" data-column="Attribute">cancelHandler</td>
          <td class="doc-td" data-column="Type">function</td>
          <td class="doc-td" data-column="Description">function called when user clicks on ‘Cancel’ button</td>
          <td class="doc-td" data-column="Default">N/A</td>
          <td class="doc-td" data-column="Possible Values">N/A</td>
          <td class="doc-td" data-column="Required">no</td>
        </tr>
    </tbody>
  </table>