import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';


import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';

@Injectable()
export class PokemonService {

  private defaulLimit: number;

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly configService: ConfigService
    ){
      this.defaulLimit = configService.get('defaultLimit');
      // console.log('DEFAULT_LIMIT',configService.get('defaultLimit'));
    }

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLocaleLowerCase();
    try{
       const poke = await this.pokemonModel.create(createPokemonDto);
       return poke;
    }catch(error){
      this.handleErrors(error);
    }
    
   
  }

  findAll(params: PaginationDto) {
    const {limit = this.defaulLimit, offset = 0} = params;
    return this.pokemonModel.find()
      .limit(limit)
      .skip(offset)
      .sort({no: 1})
      .select(['-__v']);
  }

  async findOne(term: string) {
    let pokemon: Pokemon;

    if(!isNaN(+term)){
      pokemon = await this.pokemonModel.findOne({id: term});
    }

    if(!pokemon && isValidObjectId(term)){
      pokemon = await this.pokemonModel.findById(term);
    }

    if(!pokemon){
      pokemon = await this.pokemonModel.findOne({name: term.toLocaleLowerCase()});
    }

    if(!pokemon)
      throw new NotFoundException(`El poquemon con el id, name, no ${term} no existe`);


    return pokemon;
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
    try{
      let pokemon: Pokemon = await this.findOne(term);
      if(updatePokemonDto.name)
        updatePokemonDto.name = updatePokemonDto.name.toLocaleLowerCase();
  
      await pokemon.updateOne(updatePokemonDto);
  
      return {...pokemon, ...updatePokemonDto};
    }catch(error){
      this.handleErrors(error);
    }

  }

  async remove(id: string) {
    //const pokemon =  await this.findOne(id);
   // await pokemon.deleteOne();
  //  const ret = await this.pokemonModel.findByIdAndDelete(id);
    const {deletedCount} = await this.pokemonModel.deleteOne({_id: id});
    if(deletedCount === 0)
      throw new BadRequestException(`Pokemon whit id ${id} not exist in db`);
    else
      return {deleted: true};
  }

  private handleErrors(error){
    if(error.code === 11000){
      throw new BadRequestException(`Pokemon exist en DB ${JSON.stringify(error.keyValue)}`)
    }
  
    console.error(error)
    throw new InternalServerErrorException('No se pudo crear el registro, revise los logs');
  }
}
