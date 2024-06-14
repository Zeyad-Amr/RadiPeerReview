interface BaseUseCase<T, P> {
    call(param: P): Promise<T>;
}

export default BaseUseCase;
