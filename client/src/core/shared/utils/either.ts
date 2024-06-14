class Either<L, R> {
    private constructor(private readonly value: L | R) { }

    static left<L, R>(l: L): Either<L, R> {
        return new Either<L, R>(l);
    }

    static right<L, R>(r: R): Either<L, R> {
        return new Either<L, R>(r);
    }

    isLeft(): boolean {
        return this.value instanceof Left;
    }

    isRight(): boolean {
        return this.value instanceof Right;
    }

    fold<T>(leftFn: (l: L) => T, rightFn: (r: R) => T): T {
        return this.isLeft() ? leftFn(this.value as L) : rightFn(this.value as R);
    }

    getRight(): R {
        return this.value as R;
    }

    getLeft(): L {
        return this.value as L;
    }
}

class Left<L> {
    constructor(readonly value: L) { }
}

class Right<R> {
    constructor(readonly value: R) { }
}

export { Either };
