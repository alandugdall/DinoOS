import { Pipe, PipeTransform } from '@angular/core';
import { Dinosaur } from './dinosaur';

@Pipe({
  name: 'pictureName'
})
export class PictureNamePipe implements PipeTransform {
  transform(dinosaur: Dinosaur): unknown {
    return '/assets/dinosaurs/' + dinosaur.name + '.webp';
  }
}
