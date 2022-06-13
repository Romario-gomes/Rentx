interface IStorageProvider {
  save(file: string): Promise<string>;
  delete(file: string): Promise<void>;
}

export { IStorageProvider };
