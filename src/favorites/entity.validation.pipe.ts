import { BadRequestException, PipeTransform, Injectable } from '@nestjs/common';

@Injectable()
export class EntityValidationPipe implements PipeTransform {
  private readonly allowedEntities = ['track', 'album', 'artist'];

  transform(value: string) {
    if (!this.allowedEntities.includes(value)) {
      throw new BadRequestException(`The value ${value} is not a valid value for entity `);
    }
    return value;
  }
}
