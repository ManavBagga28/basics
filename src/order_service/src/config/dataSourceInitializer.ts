import { DataSource } from "typeorm";
import { AppDataSource } from "./ormconfig";

const dataSources: { name: string; source: DataSource }[] = [
  { name: "Default DataSource", source: AppDataSource},
];

export const initializeDataSources = async () => {
  const promises = dataSources.map(({ name, source }) =>
    source
      .initialize()
      .then(() => console.log(`${name} has been initialized!`))
      .catch((err) => console.error(`Error during ${name} initialization:`, err)),
  );
  await Promise.all(promises);
};