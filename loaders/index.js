import moogoseLoader from '@loaders/moongose-loader'
import expressLoader from '@loaders/express-loader'

export default async ({ expressApp }) => {

  await moogoseLoader()
  console.log('✌️ DB loaded and connected!');

  await expressLoader({ app: expressApp });
  console.log('✌️ Express loaded');
}