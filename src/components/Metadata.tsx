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
      if (response.url)
        return (response);
      else
        throw ('error!');
    });
  return response;
};

export function MetadataComponent() {

  const [entries, setEntries] = React.useState<Metadata[]>([]);
  const inputRef = React.useRef<Input>(null);

  const loadMetadata = async () => {
    const url = inputRef.current
      ? inputRef.current.state.value
      : '';
      
      const metadata = await loadMetadataFromURL(url);

      setEntries([...entries, metadata]);
      inputRef.current!.setState({value: ''})
  };

  React.useLayoutEffect( ()=> {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [entries]);

  return (
    <Layout.Content style={{ padding: '0 50px' }}>
      <Space />
      {entries.map(entry => <MetadataCard key={entry.url} metadata={entry} />)}
      <Row gutter={8}>
        <Col span={23}>
          <Input
            onPressEnter={loadMetadata}
            ref={inputRef}
            placeholder="paste url here"
            allowClear={true}
          />
        </Col>
        <Col span={1} style={{ textAlign: 'right' }}>
          <Button onClick={loadMetadata} type="primary" shape="circle" icon="plus"></Button>
        </Col>
      </Row>
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
