import { PartialType } from '@nestjs/swagger';
import { CreateProductProfitabilityDto } from './create-product-profitability.dto';

export class UpdateProductProfitabilityDto extends PartialType(CreateProductProfitabilityDto) {}
