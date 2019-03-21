import * as React from 'react';

import { Layout, Typography } from 'antd';
import { MetadataComponent } from './components/Metadata';

import './App.css';

function App() {
  return (
    <Layout style={{ background: '#ECECEC' }}>
      <Layout.Header>
        <Typography.Title style={{ color: 'white', paddingTop: '0.5rem' }}>Bananotes</Typography.Title>
      </Layout.Header>
      <MetadataComponent />
      <Layout.Footer style={{ textAlign: 'center' }}>
        Some footer notes.
      </Layout.Footer>
    </Layout >
  );
}

export default App;
