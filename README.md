# reproducer for https://github.com/open-telemetry/opentelemetry-js/issues/4991

## How to run

- run `npm ci`
- run `docker compose up` (starts collector)
- run `npm run start`

check the output of the collector, the `pino` log was correctly exported from `@opentelemetry/sdk-node` and received by the OTel collector

Sample output from the app:

```
> repro-4991@1.0.0 start
> ts-node --require ./otel.ts index.ts

{"level":30,"time":1727269109031,"pid":32960,"hostname":"redacted","msg":"foo"}

```

Sample output from the collector:

```
otel-collector-1  | 2024-09-25T12:58:19.567Z    info    service@v0.110.0/service.go:137 Setting up own telemetry...
otel-collector-1  | 2024-09-25T12:58:19.567Z    info    service@v0.110.0/service.go:186 Skipped telemetry setup.
otel-collector-1  | 2024-09-25T12:58:19.568Z    info    builders/builders.go:26 Development component. May change in the future.        {"kind": "exporter", "data_type": "metrics", "name": "debug"}
otel-collector-1  | 2024-09-25T12:58:19.568Z    info    builders/builders.go:26 Development component. May change in the future.        {"kind": "exporter", "data_type": "logs", "name": "debug"}
otel-collector-1  | 2024-09-25T12:58:19.568Z    info    builders/builders.go:26 Development component. May change in the future.        {"kind": "exporter", "data_type": "traces", "name": "debug"}
otel-collector-1  | 2024-09-25T12:58:19.569Z    info    service@v0.110.0/service.go:208 Starting otelcol-contrib...     {"Version": "0.110.0", "NumCPU": 16}
otel-collector-1  | 2024-09-25T12:58:19.569Z    info    extensions/extensions.go:39     Starting extensions...
otel-collector-1  | 2024-09-25T12:58:19.569Z    warn    internal@v0.110.0/warning.go:40 Using the 0.0.0.0 address exposes this server to every network interface, which may facilitate Denial of Service attacks.       {"kind": "receiver", "name": "otlp", "data_type": "metrics", "documentation": "https://github.com/open-telemetry/opentelemetry-collector/blob/main/docs/security-best-practices.md#safeguards-against-denial-of-service-attacks"}
otel-collector-1  | 2024-09-25T12:58:19.569Z    info    otlpreceiver@v0.110.0/otlp.go:169       Starting HTTP server    {"kind": "receiver", "name": "otlp", "data_type": "metrics", "endpoint": "0.0.0.0:4318"}
otel-collector-1  | 2024-09-25T12:58:19.569Z    info    service@v0.110.0/service.go:234 Everything is ready. Begin running and processing data.
otel-collector-1  | 2024-09-25T12:58:29.048Z    info    LogsExporter    {"kind": "exporter", "data_type": "logs", "name": "debug", "resource logs": 1, "log records": 1}
otel-collector-1  | 2024-09-25T12:58:29.048Z    info    ResourceLog #0
otel-collector-1  | Resource SchemaURL: 
otel-collector-1  | Resource attributes:
otel-collector-1  |      -> service.name: Str(next-node-instrumentation)
otel-collector-1  |      -> telemetry.sdk.language: Str(nodejs)
otel-collector-1  |      -> telemetry.sdk.name: Str(opentelemetry)
otel-collector-1  |      -> telemetry.sdk.version: Str(1.26.0)
otel-collector-1  |      -> process.pid: Int(32960)
otel-collector-1  |      -> process.executable.name: Str(node)
otel-collector-1  |      -> process.executable.path: Str(/home/marc/.nvm/versions/node/v18.20.4/bin/node)
otel-collector-1  |      -> process.command_args: Slice(["/home/marc/.nvm/versions/node/v18.20.4/bin/node","/home/marc/otel-js/repro-4991/node_modules/.bin/ts-node","--require","./otel.ts","index.ts"])
otel-collector-1  |      -> process.runtime.version: Str(18.20.4)
otel-collector-1  |      -> process.runtime.name: Str(nodejs)
otel-collector-1  |      -> process.runtime.description: Str(Node.js)
otel-collector-1  |      -> process.command: Str(/home/marc/otel-js/repro-4991/node_modules/.bin/ts-node)
otel-collector-1  |      -> process.owner: Str(marc)
otel-collector-1  |      -> host.name: Str(redacted)
otel-collector-1  |      -> host.arch: Str(amd64)
otel-collector-1  | ScopeLogs #0
otel-collector-1  | ScopeLogs SchemaURL: 
otel-collector-1  | InstrumentationScope @opentelemetry/instrumentation-pino 0.42.0
otel-collector-1  | LogRecord #0
otel-collector-1  | ObservedTimestamp: 2024-09-25 12:58:29.031 +0000 UTC
otel-collector-1  | Timestamp: 2024-09-25 12:58:29.031 +0000 UTC
otel-collector-1  | SeverityText: info
otel-collector-1  | SeverityNumber: Info(9)
otel-collector-1  | Body: Str(foo)
otel-collector-1  | Trace ID: 
otel-collector-1  | Span ID: 
otel-collector-1  | Flags: 0
otel-collector-1  |     {"kind": "exporter", "data_type": "logs", "name": "debug"}

```