import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

export default function App(props) {
  return (
    <BrowserRouter>
      <Grid padded>
        <Grid.Column>...</Grid.Column>
      </Grid>
    </BrowserRouter>
  );
}
