import { Client } from './client';

export class FactureClient {
  id: number;
  name: string;
  url: string;
  data: Blob;
  client: Client;
}
