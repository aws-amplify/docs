<table class="doc-table">
    <thead class="doc-thead">
      <tr class="doc-tr">
        <th class="doc-th">Attribute</th>
        <th class="doc-th">Type</th>
        <th class="doc-th">Description</th>
        <th class="doc-th">Default</th>
        <th class="doc-th">Required</th>
      </tr>
    </thead>
    <tbody class="doc-tbody">
      <tr class="doc-tr">
        <td class="doc-td" data-column="Attribute">bot</td>
        <td class="doc-td" data-column="Type">string</td>
        <td class="doc-td" data-column="Description">the name of the chatbot as defined in your Amplify configuration under “aws_bots_config.name”</td>
        <td class="doc-td" data-column="Default">N/A</td>
        <td class="doc-td" data-column="Required">yes</td>
      </tr>
      <tr class="doc-tr">
        <td class="doc-td" data-column="Attribute">clearComplete</td>
        <td class="doc-td" data-column="Type">boolean</td>
        <td class="doc-td" data-column="Description">specifies whether the chat messages clear out at the end of the chat session</td>
        <td class="doc-td" data-column="Default">true</td>
        <td class="doc-td" data-column="Required">no</td>
      </tr>
      <tr class="doc-tr">
        <td class="doc-td" data-column="Attribute">botTitle</td>
        <td class="doc-td" data-column="Type">string</td>
        <td class="doc-td" data-column="Description">the name of the chatbot component in your frontend app</td>
        <td class="doc-td" data-column="Default">'Chatbot'</td>
        <td class="doc-td" data-column="Required">no</td>
      </tr>
      <tr class="doc-tr">
        <td class="doc-td" data-column="Attribute">conversationModeOn</td>
        <td class="doc-td" data-column="Type">boolean</td>
        <td class="doc-td" data-column="Description">turns voice conversation mode on/off</td>
        <td class="doc-td" data-column="Default">false</td>
        <td class="doc-td" data-column="Required">no</td>
      </tr>
      <tr class="doc-tr">
        <td class="doc-td" data-column="Attribute">voiceConfig</td>
        <td class="doc-td" data-column="Type">object</td>
        <td class="doc-td" data-column="Description">modifies the silence detection parameters</td>
        <td class="doc-td" data-column="Default">{
          silenceDetectionConfig: {
              time: 2000,
              amplitude: 0.2
          }   
        }</td>
        <td class="doc-td" data-column="Required">no</td>
      </tr>
      <tr class="doc-tr">
        <td class="doc-td" data-column="Attribute">voiceEnabled</td>
        <td class="doc-td" data-column="Type">boolean</td>
        <td class="doc-td" data-column="Description">turns user voice input on/off</td>
        <td class="doc-td" data-column="Default">false</td>
        <td class="doc-td" data-column="Required">no</td>
      </tr>
      <tr class="doc-tr">
        <td class="doc-td" data-column="Attribute">textEnabled</td>
        <td class="doc-td" data-column="Type">boolean</td>
        <td class="doc-td" data-column="Description">turns user text input on/off</td>
        <td class="doc-td" data-column="Default">true</td>
        <td class="doc-td" data-column="Required">no</td>
      </tr>
    </tbody>
</table>