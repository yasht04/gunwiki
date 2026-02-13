export interface Gun {
  _id: string;
  name: string;
  manufacturer: string;
  category: string;
  description: string;
  image_url: string;
  specs: {
    caliber: string;
    weight: string;
    length: string;
    action: string;
  };
}