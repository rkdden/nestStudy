import { PowerModule } from './../power/power.module';
import { Module } from '@nestjs/common';
import { CpuService } from './cpu.service';

@Module({
  imports: [PowerModule],
  providers: [CpuService],
})
export class CpuModule {}
