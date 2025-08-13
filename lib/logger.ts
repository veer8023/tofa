type LogLevel = 'debug' | 'info' | 'warn' | 'error'

interface LogEntry {
  timestamp: string
  level: LogLevel
  message: string
  data?: any
  userId?: string
  requestId?: string
}

class Logger {
  private isDevelopment = process.env.NODE_ENV === 'development'
  private logLevel: LogLevel = (process.env.LOG_LEVEL as LogLevel) || 'info'

  private shouldLog(level: LogLevel): boolean {
    const levels: Record<LogLevel, number> = {
      debug: 0,
      info: 1,
      warn: 2,
      error: 3
    }
    return levels[level] >= levels[this.logLevel]
  }

  private formatLog(level: LogLevel, message: string, data?: any): LogEntry {
    return {
      timestamp: new Date().toISOString(),
      level,
      message,
      data,
      userId: this.getCurrentUserId(),
      requestId: this.getRequestId()
    }
  }

  private getCurrentUserId(): string | undefined {
    // In a real app, you'd get this from the session/context
    return undefined
  }

  private getRequestId(): string | undefined {
    // In a real app, you'd get this from the request context
    return undefined
  }

  private output(entry: LogEntry) {
    if (this.isDevelopment) {
      // In development, use console with colors
      const colors = {
        debug: '\x1b[36m', // Cyan
        info: '\x1b[32m',  // Green
        warn: '\x1b[33m',  // Yellow
        error: '\x1b[31m'  // Red
      }
      const reset = '\x1b[0m'
      
      console.log(`${colors[entry.level]}[${entry.level.toUpperCase()}]${reset} ${entry.timestamp} - ${entry.message}`)
      if (entry.data) {
        console.log(entry.data)
      }
    } else {
      // In production, use structured logging
      console.log(JSON.stringify(entry))
    }
  }

  debug(message: string, data?: any) {
    if (this.shouldLog('debug')) {
      this.output(this.formatLog('debug', message, data))
    }
  }

  info(message: string, data?: any) {
    if (this.shouldLog('info')) {
      this.output(this.formatLog('info', message, data))
    }
  }

  warn(message: string, data?: any) {
    if (this.shouldLog('warn')) {
      this.output(this.formatLog('warn', message, data))
    }
  }

  error(message: string, error?: any) {
    if (this.shouldLog('error')) {
      const errorData = error ? {
        name: error.name,
        message: error.message,
        stack: error.stack,
        ...error
      } : undefined
      
      this.output(this.formatLog('error', message, errorData))
    }
  }

  // Convenience methods for common use cases
  apiError(endpoint: string, error: any) {
    this.error(`API Error at ${endpoint}`, error)
  }

  userAction(userId: string, action: string, details?: any) {
    this.info(`User action: ${action}`, { userId, action, details })
  }

  databaseError(operation: string, error: any) {
    this.error(`Database error during ${operation}`, error)
  }

  authError(userId: string, action: string, error: any) {
    this.warn(`Authentication error: ${action}`, { userId, action, error })
  }
}

export const logger = new Logger()

// Export convenience functions
export const log = {
  debug: (message: string, data?: any) => logger.debug(message, data),
  info: (message: string, data?: any) => logger.info(message, data),
  warn: (message: string, data?: any) => logger.warn(message, data),
  error: (message: string, error?: any) => logger.error(message, error),
  apiError: (endpoint: string, error: any) => logger.apiError(endpoint, error),
  userAction: (userId: string, action: string, details?: any) => logger.userAction(userId, action, details),
  databaseError: (operation: string, error: any) => logger.databaseError(operation, error),
  authError: (userId: string, action: string, error: any) => logger.authError(userId, action, error),
} 