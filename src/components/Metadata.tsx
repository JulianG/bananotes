import * as React from 'react';
import { Layout, Row, Col, Typography, Input, Button, Card, Icon, Tag } from 'antd';
import { Metadata, makeMetadata } from '../core/Types';

import fakeList from './fake-data.json';

async function loadMetadataFromURL(url: string): Promise<Metadata> {
  console.log('loading', url);
  const response = await fetch(`./.netlify/functions/open-graph/?url=${url}`)
    .then(response => {
      return response.json();
    })
    .then(response => {
      if (response.url)
        return (response);
      else
        throw ('error!');
    });
  return response;
};

export function MetadataComponent() {

  const fl = (fakeList || []) as Metadata[];
  const [entries, setEntries] = React.useState<Metadata[]>(fakeList);
  const inputSearchRef = React.useRef(null);

  const loadMetadata = async (url: string = '') => {
    const metadata = await loadMetadataFromURL(url);
    setEntries([...entries, metadata]);
  };

  React.useLayoutEffect(() => {
    if (inputSearchRef.current) {
      const s = inputSearchRef.current! as { input: Input };
      console.log(s.input.setState({ value: '' }));
    }
  }, [entries]);

  return (
    <Layout.Content style={{ padding: '0 50px' }}>
      <Space />
      {entries.map((m: Metadata) => <MetadataCard key={m.url} metadata={m} />)}
      <Input.Search
        ref={inputSearchRef}
        placeholder="type in something or paste a URL"
        onSearch={loadMetadata}
        enterButton={<Icon type="plus" title="Add" />}
      />
      <Space />
      <pre style={{ color: '#cccccc' }}>{JSON.stringify(entries, null, 2)}</pre>
    </Layout.Content>
  );
}

function MetadataCard({ metadata }: { metadata: Metadata }) {

  const hostname = getHostname(metadata.url);

  return (
    <Card
      size="small"
      title={<a href={metadata.url} target="_blank">{metadata.title}</a>}
      bordered={true}
      hoverable={true}
      loading={!metadata.url}
      // actions={[
      //   <Icon theme="filled" type="edit" />,
      //   <Icon theme="filled" type="tag" />,
      //   <Icon type="sync" spin={false} />,
      //   <Icon theme="filled" type="delete" />
      // ]}
      extra={<><Icon type="zoom-in" /> <Icon type="zoom-out" /></>}
      bodyStyle={{ overflow: 'hidden' }}
      style={{ marginBottom: '0.5rem' }}
    >
      <div style={{ display: 'flex' }}>
        <div style={{flexGrow: 1}}>
        <a href={metadata.url} target="_blank">
          <img
            style={{
              width: '7rem',
              float: 'left',
              marginRight: '1rem'
            }}
            src={metadata.image}
            title={`${metadata.title} | ${hostname}`}
          />
        </a>
        </div>
        <div style={{flexGrow: 20}}>{metadata.description}</div>
      </div>
      <div style={{marginTop: '1rem', lineHeight: '2'}}>
        <Tag color="magenta">magenta</Tag>
        <Tag color="red">red</Tag>
        <Tag color="volcano">volcano</Tag>
        <Tag color="orange">orange</Tag>
        <Tag color="gold">gold</Tag>
        <Tag color="lime">lime</Tag>
        <Tag color="green">green</Tag>
        <Tag color="cyan">cyan</Tag>
        <Tag color="blue">blue</Tag>
        <Tag color="geekblue">geekblue</Tag>
        <Tag color="purple">purple</Tag>
      </div>
    </Card>
  );
}

function Space() {
  return <Typography.Text>&nbsp;</Typography.Text>;
}

function getHostname(url: string): string {
  const matches = url.match(/:\/\/(.[^/]+)/);
  const hostname = (matches && matches.length >= 2) ? matches[1] : '';
  return (hostname.substr(0, 4) === 'www.')
    ? hostname.substr(4)
    : hostname;
}
