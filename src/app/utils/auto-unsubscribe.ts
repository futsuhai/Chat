import { ChangeDetectorRef, ViewRef, inject } from "@angular/core";
import { Observable, Subject, UnaryFunction, takeUntil } from "rxjs";

export function autoUnsubscribe<T>(): UnaryFunction<Observable<T>, Observable<T>> {
    const viewRef = inject(ChangeDetectorRef) as ViewRef;
    const stop$ = new Subject<void>();

    viewRef.onDestroy(() => stop$.next());
    return (observable: Observable<T>) => observable.pipe(takeUntil(stop$));
}