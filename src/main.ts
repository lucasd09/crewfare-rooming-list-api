import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle("Crewfare Rooming List")
    .setDescription("Rooming List Management API")
    .setVersion("1.0")
    .addTag("Bookings")
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);

  SwaggerModule.setup("api", app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);

  // biome-ignore lint/suspicious/noConsoleLog: get swagger link
  console.log("Application is running on: http://localhost:3000/api");
}
bootstrap();
