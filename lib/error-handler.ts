import { NextResponse } from 'next/server'

export class AppError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public isOperational = true
  ) {
    super(message)
    Object.setPrototypeOf(this, AppError.prototype)
  }
}

export const handleApiError = (error: unknown) => {
  if (error instanceof AppError) {
    return NextResponse.json(
      { error: error.message },
      { status: error.statusCode }
    )
  }
  
  // Log unexpected errors but don't expose them to client
  console.error('Unexpected error:', error)
  return NextResponse.json(
    { error: 'Internal server error' },
    { status: 500 }
  )
}

export const createError = (statusCode: number, message: string) => {
  return new AppError(statusCode, message)
}

export const validationError = (message: string) => {
  return createError(400, message)
}

export const notFoundError = (message: string) => {
  return createError(404, message)
}

export const unauthorizedError = (message: string = 'Unauthorized') => {
  return createError(401, message)
}

export const forbiddenError = (message: string = 'Forbidden') => {
  return createError(403, message)
} 