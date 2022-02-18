import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import serverlessExpress from '@vendia/serverless-express';
import { Handler, Context, Callback } from 'aws-lambda';

let server: Handler;

async function bootstrapServer() {
  const app = await NestFactory.create(AppModule);
  await app.init();

  const expressApp = app.getHttpAdapter().getInstance();
  return serverlessExpress({ app: expressApp });
}

export const handler: Handler = async (
  event: Event,
  context: Context,
  callback: Callback,
) => {
    server = server ?? (await bootstrapServer());
    return server(event, context, callback);
};
