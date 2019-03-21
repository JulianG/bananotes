
export type Metadata = {
  url: string,
  title: string,
  description: string,
  image: string,
};

export function makeMetadata(): Metadata {
  return {
    url: '',
    title: '',
    description: '',
    image: '',
  }
}