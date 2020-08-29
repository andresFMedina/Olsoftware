import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'status'
})
export class StatusPipe implements PipeTransform {

  transform(value: string): string {
    if (value === 'A') { return 'Activo'; }
    if (value === 'I') { return 'Inactivo'; }
    return null;
  }

}
