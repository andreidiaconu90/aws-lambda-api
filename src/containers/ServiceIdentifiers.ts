const SERVICE_IDENTIFIERS = {
    environment: Symbol.for("environment"),
    ILoggerService: Symbol.for("ILoggerService"),
    IErrorHandlerService: Symbol.for("IErrorHandlerService"),
    IXCorrelationIdService: Symbol.for("IXCorrelationIdService"),
    IMovieService: Symbol.for("IMovieService"),
    IDynamoDbRepository: Symbol.for("IDynamoDbRepository"),
    IDynamoDbQueryBuilder: Symbol.for("IDynamoDbQueryBuilder"),
};

export default SERVICE_IDENTIFIERS;
