import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';

import { join } from 'path';
import { PokemonModule } from './pokemon/pokemon.module';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { EnvConfiguration } from './config/env.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load:[EnvConfiguration]
    }), //Agregar las variables de ambientes

    ServeStaticModule.forRoot({rootPath: join(__dirname,'..','public'), }), // Configuracion para site static
    MongooseModule.forRoot(process.env.MONGO_URL), // Configuracion conexion a DB
    
    PokemonModule,

    CommonModule,

    SeedModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(){
    console.log(process.env);
  }
  
}
