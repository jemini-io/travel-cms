import { PrismaClient } from '@prisma/client';
import App, {
  GetAttributesKeysByType,
  GetAttributes,
  Strapi,
} from '@strapi/strapi';
import { ApiCheapFlightsToDestinationCheapFlightsToDestination } from '../schemas';
import cheapFlightsToDestination from '../src/api/cheap-flights-to-destination/controllers/cheap-flights-to-destination';

const prisma = new PrismaClient();

async function start() {
  // Create the strapi context
  const strapi: Strapi = App({ distDir: './dist' });
  // await strapi.start();
  await strapi.load();

  // Step 1: Connect to the old db.
  await prisma.$connect();
  const count = await prisma.destinations.count();
  console.info('record number', count);

  // Step 2: create a strapi instance that can access
  // the new db.
  // Step 2a: Setup TypeScript helpers
  type CheapFlightToDest = Partial<
    GetAttributes<'api::cheap-flights-to-destination.cheap-flights-to-destination'>
  >;
  const contentTypeUid =
    'api::cheap-flights-to-destination.cheap-flights-to-destination';
  // const entry: CheapFlightToDest =
  // await strapped.entityService.findOne(contentTypeUid, 1);
  // strapped.log.info(entry);

  // Step 3: Query from the src db
  const firstSet = await prisma.destinations.findMany({
    take: 10,
    orderBy: {
      pk_destination_id: 'asc',
    },
  });

  // Step 3a: Map the data
  const newDestDataStructure: any[] = firstSet.map(
    (cheapFlightsToDestination) => {
      return {
        Name: cheapFlightsToDestination.destination_name,
        DealsDescription:
          cheapFlightsToDestination.destination_deals_description,
        createdBy: 1,
        updatedBy: 1,
        locale: 'en',
      };
    },
  );

  // Step 4: create many
  const bulkCreateResult = await strapi.db
    .query(contentTypeUid)
    .createMany({ data: newDestDataStructure });
  console.info('created', JSON.stringify(bulkCreateResult));

  await strapi.destroy();
  await prisma.$disconnect();
}

start();
