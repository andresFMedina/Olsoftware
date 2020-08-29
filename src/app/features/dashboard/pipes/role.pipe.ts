import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'role'
})
export class RolePipe implements PipeTransform {

  transform(value: number): string {
    console.log(value);
    switch (value) {
      case 1:
        return 'Administrador';
      case 2:
        return 'Conductor';
      case 3:
        return 'Recolector';
      default:
        return undefined;
    }
  }

}
