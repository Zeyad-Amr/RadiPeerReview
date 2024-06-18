import { PartialType } from '@nestjs/mapped-types';
import { CreateRadiologistDto } from './create-radiologist.dto';

export class UpdateRadiologistDto extends PartialType(CreateRadiologistDto) { }
