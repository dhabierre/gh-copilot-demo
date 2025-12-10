export type Album = {
  id: number;
  title: string;
  artist: string;
  price: number;
  image_url: string;
};

export const albums: Album[] = [
  {
    id: 1,
    title: "Hybrid Theory",
    artist: "Linkin Park",
    price: 9.99,
    image_url:
      "https://upload.wikimedia.org/wikipedia/en/0/02/Linkin_Park_Hybrid_Theory_Album_Cover.jpg",
  },
  {
    id: 2,
    title: "Back in Black",
    artist: "AC/DC",
    price: 11.99,
    image_url:
      "https://upload.wikimedia.org/wikipedia/commons/4/45/ACDC_Back_in_Black_%28album_cover%29.jpg",
  },
  {
    id: 3,
    title: "The Dark Side of the Moon",
    artist: "Pink Floyd",
    price: 12.99,
    image_url:
      "https://upload.wikimedia.org/wikipedia/en/3/3b/Dark_Side_of_the_Moon.png",
  },
  {
    id: 4,
    title: "Black Album",
    artist: "Metallica",
    price: 10.99,
    image_url:
      "https://upload.wikimedia.org/wikipedia/en/2/2c/Metallica_-_Metallica_cover.jpg",
  },
  {
    id: 5,
    title: "Nevermind",
    artist: "Nirvana",
    price: 8.99,
    image_url:
      "https://upload.wikimedia.org/wikipedia/en/b/b7/NirvanaNevermindalbumcover.jpg",
  },
  {
    id: 6,
    title: "Appetite for Destruction",
    artist: "Guns N' Roses",
    price: 10.99,
    image_url:
      "https://upload.wikimedia.org/wikipedia/en/6/6f/GunsnRosesAppetiteforDestructionalbumcover.jpg",
  },
];
