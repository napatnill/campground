/* eslint-disable @typescript-eslint/no-wrapper-object-types */

export interface CampgroundItem {
  _id: string;
  name: string;
  address: string;
  district: string;
  province: string;
  postalcode: string;
  tel: string;
  picture: string;
  __v: number;
  id: string;
}

export interface CampgroundsJson {
  success: boolean;
  count: number;
  pagination: Object;
  data: CampgroundItem[];
}
