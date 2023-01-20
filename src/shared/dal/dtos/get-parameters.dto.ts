import { IsNumber, IsOptional, IsString, ValidateIf } from 'class-validator';

import { IsOrderBy } from '../../utils';
import { OrderBy } from '../../types-and-interfaces';

export class GetParametersDto {
  @IsString()
  @IsOptional()
  @IsOrderBy()
  public orderBy?: OrderBy;

  @IsString()
  @IsOptional()
  public sortBy?: string;

  @IsNumber()
  @IsOptional()
  public limit?: number;

  @IsNumber()
  @IsOptional()
  public offset?: number;
}
