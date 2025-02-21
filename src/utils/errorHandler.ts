// src/utils/errorHandler.ts
import { Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

export const handleError = (res: Response, err: any) => {
  const errorId = uuidv4();
  console.error(`Error ID ${errorId}:`, err);

  // Safely handle `err.detail` and provide a fallback message
  const errorMessage = err?.detail || err?.message || "An unexpected error occurred.";

  res.status(500).json({
    success: false,
    message: errorMessage,
    errorId,
  });
};
