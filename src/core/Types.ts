
export type Metadata = {
  url: string,
  title: string,
  description: string,
  image: string,
};

export function makeMetadata(): Metadata {
  // return {
  //   url: '',
  //   title: '',
  //   description: '',
  //   image: '',
  // }
  // return {
  //   url: "https://www.youtube.com/watch?v=oStaJTHgHMU",
  //   title: "The Tooth Brushing Song - The Tooth Brushing Badge - Hey Duggee Series 3 - Hey Duggee",
  //   image: "https://i.ytimg.com/vi/oStaJTHgHMU/maxresdefault.jpg",
  //   description: "Toothbrushes at the ready Squirrels! It’s time to brush your teeth for two whole minutes! 🐾 SUBSCRIBE TO THE SQUIRREL CLUB: http://bit.ly/SubscribeToHeyDugge..."
  // }
  return {
    url: "http://www.theguardian.com/technology/2019/mar/16/five-of-the-best-noise-cancelling-headphones",
    title: "Five of the best noise-cancelling headphones",
    image: "https://i.guim.co.uk/img/media/5086e14a7a02a9bcb56a60bfc78eed36b243f61d/0_0_3000_1800/master/3000.jpg?width=1200&height=630&quality=85&auto=format&fit=crop&overlay-align=bottom%2Cleft&overlay-width=100p&overlay-base64=L2ltZy9zdGF0aWMvb3ZlcmxheXMvdGctZGVmYXVsdC5wbmc&s=46690a714657832e8b3d9bc289b736ad",
    description: "Blocking out annoying sounds on flights or the commute with these options priced from £80"
  };
}