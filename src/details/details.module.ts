import { Module } from '@nestjs/common';
import { DetailsController } from './details.controller';
import { DetailsService } from './details.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Details } from './details.entity/details.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Details])],
  controllers: [DetailsController],
  providers: [DetailsService],
})
export class DetailsModule {}
