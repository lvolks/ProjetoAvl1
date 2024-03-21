import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Product } from './models/Product';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306, // 3306 para o banco rodando local, mas 3307 para o banco rodando no docker
      username: 'root',
      password: 'senhasenha7', // tem que ser a senha definida para o seu banco de dados
      database: 'testing',
      models: [Product],
    }),
    SequelizeModule.forFeature([Product]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
