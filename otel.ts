import {OTLPMetricExporter} from "@opentelemetry/exporter-metrics-otlp-proto";
import {PeriodicExportingMetricReader} from "@opentelemetry/sdk-metrics";
import {logs, NodeSDK} from "@opentelemetry/sdk-node";
import {OTLPTraceExporter} from "@opentelemetry/exporter-trace-otlp-proto";
import {OTLPLogExporter} from "@opentelemetry/exporter-logs-otlp-proto";
import { W3CTraceContextPropagator } from "@opentelemetry/core";
import {PinoInstrumentation} from "@opentelemetry/instrumentation-pino";

const OTEL_COLLECTOR_URL="http://localhost:4318"

const sdk = new NodeSDK({
    serviceName: "next-node-instrumentation",
    traceExporter: new OTLPTraceExporter({
        url: `${OTEL_COLLECTOR_URL}/v1/traces`,
    }),
    metricReader: new PeriodicExportingMetricReader({
        exporter: new OTLPMetricExporter({
            url: `${OTEL_COLLECTOR_URL}/v1/metrics`,
        }),
    }),
    logRecordProcessors: [new logs.SimpleLogRecordProcessor(
        new OTLPLogExporter({
            url: `${OTEL_COLLECTOR_URL}/v1/logs`,
        }),
    )],
    textMapPropagator: new W3CTraceContextPropagator(),
    instrumentations: [new PinoInstrumentation()]
});

sdk.start();