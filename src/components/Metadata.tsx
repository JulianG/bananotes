import * as React from 'react';
import { Layout, Row, Col, Typography, Input, Button, Card, Icon, Avatar } from 'antd';
import { Metadata, makeMetadata } from '../core/Types';


async function loadMetadataFromURL(url: string): Promise<Metadata> {
  console.log('loading', url);
  const response = await fetch(`./.netlify/functions/open-graph/?url=${url}`)
    .then(response => {
      return response.json();
    })
    .then(response => {
      return (response);
    });
  return response;
};

export function MetadataComponent() {

  const [metadata, setMetadata] = React.useState(makeMetadata());
  const inputRef = React.useRef<Input>(null);

  const loadMetadata = async () => {
    const url = inputRef.current
      ? inputRef.current.state.value
      : '';

    const m = await loadMetadataFromURL(url);
    setMetadata(m);
  };

  return (
    <Layout.Content style={{ padding: '0 50px' }}>
      <Space />
      <Row gutter={8}>
        <Col span={18}>
          <Input
            onPressEnter={loadMetadata}
            ref={inputRef}
            placeholder="paste url here"
            defaultValue="https://www.theguardian.com/technology/2019/mar/16/five-of-the-best-noise-cancelling-headphones"
          />
        </Col>
        <Col span={6}>
          <Button onClick={loadMetadata} type="primary" shape="circle" icon="plus"></Button>
        </Col>
      </Row>
      <Space />
      <MetadataCard metadata={metadata} />
      <pre style={{ color: '#cccccc' }}>{JSON.stringify(metadata, null, 2)}</pre>
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
      extra={<Icon theme="filled" type="edit" />}
      bodyStyle={{ overflow: 'hidden' }}
    >
      <a href={metadata.url} target="_blank">
        <img
          style={{
            minWidth: '10rem',
            width: '25%',
            float: 'left',
            marginRight: '1rem'
          }}
          src={metadata.image}
          title={`${metadata.title} | ${hostname}`}
        />
      </a>
      <p>{metadata.description}</p>
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
