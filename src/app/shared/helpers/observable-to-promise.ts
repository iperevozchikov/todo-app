import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

export function observableToPromise<T>(stream: Observable<T>): Promise<T> {
    return stream.pipe(first()).toPromise();
}
