export interface IListing {
  title: string;
  price: string;
  category: string;
  description: string;
  images: [];
}

export interface IList {
  id: number;
  title: string;
  images: [
    {
      url: string;
      thumbnailUrl: string;
    }
  ];
  price: number;
  categoryId: number;
  userId: number;
  location: {
    latitude: number;
    longitude: number;
  };
}
