import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

/**
 * Global ng-bootstrap config
 *
 * @since 8.0.0
 */
@Injectable({ providedIn: 'root' })
export class NgbConfig {
  animation = environment.animation;
}
