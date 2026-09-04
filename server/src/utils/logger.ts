export type LogLevel = 'INFO' | 'WARN' | 'ERROR' | 'DEBUG';

export class Logger {
  private static formatMessage(level: LogLevel, context: string, message: string, meta?: unknown): string {
    const timestamp = new Date().toISOString();
    const metaStr = meta ? ` | ${JSON.stringify(meta)}` : '';
    return `[${timestamp}] [${level}] [${context}]: ${message}${metaStr}`;
  }

  static info(context: string, message: string, meta?: unknown): void {
    console.log(this.formatMessage('INFO', context, message, meta));
  }

  static warn(context: string, message: string, meta?: unknown): void {
    console.warn(this.formatMessage('WARN', context, message, meta));
  }

  static error(context: string, message: string, meta?: unknown): void {
    console.error(this.formatMessage('ERROR', context, message, meta));
  }

  static debug(context: string, message: string, meta?: unknown): void {
    if (process.env.NODE_ENV !== 'production') {
      console.debug(this.formatMessage('DEBUG', context, message, meta));
    }
  }
}
