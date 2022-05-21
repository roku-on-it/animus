import { Module } from '@nestjs/common';
import { PhysicalAppearanceResolver } from './physical-appearance.resolver';

@Module({
  providers: [PhysicalAppearanceResolver],
})
export class PhysicalAppearanceModule {}
