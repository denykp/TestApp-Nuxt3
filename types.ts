export {};

declare global {
  interface loginData {
    phone: string;
    password: string;
    latlong: string;
    device_token: string;
    device_type: 0 | 1 | 2;
  }
}
