import { IMetadata } from "../src/interfaces/IMetadata";

export type ResponseType<T>= {
    results: number;
    metadata: IMetadata;
    data:T[];
  }