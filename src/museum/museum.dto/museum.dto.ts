import {IsNotEmpty, IsString, IsUrl} from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class MuseumDto {
 @Field()
 @IsString()
 @IsNotEmpty()
 readonly name: string;

 @Field()
 @IsString()
 @IsNotEmpty()
 readonly description: string;

 @Field()
 @IsString()
 @IsNotEmpty()
 readonly address: string;

 @Field()
 @IsString()
 @IsNotEmpty()
 readonly city: string;

 @Field()
 @IsUrl()
 @IsNotEmpty()
 readonly image: string;
}