import { Injectable } from '@nestjs/common';
import axios , {AxiosInstance} from 'axios';
import { PokeInterface } from './interfaces/poke-interface';
import { Pokemon } from '../pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class SeedService {
  
  private readonly httpClient: AxiosInstance = axios;

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
  ){

  }

  async initDB() {

    await this.pokemonModel.deleteMany({});
    const {data} = await this.httpClient.get<PokeInterface>('https://pokeapi.co/api/v2/pokemon?limit=700');
    
    // const insertsPromisesArr = [];
    const pk2Insrt = [];
    
    data.results.forEach( ({name, url}) => {
      const segments = url.split('/');
      const no = segments[segments.length -2];
      console.log(name, no);
      // await this.pokemonModel.create({ name, no})
      //insertsPromisesArr.push(this.pokemonModel.create({ name, no}))
      pk2Insrt.push({ name, no});
      
    })
    this.pokemonModel.insertMany(pk2Insrt);
    //const newArray = await Promise.all(insertsPromisesArr);
    
    return {mensaje: 'Seed executed', status: true};
  }

  
}
