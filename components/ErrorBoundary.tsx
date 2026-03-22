'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    // Create a new error object to prevent circular JSON serialization issues
    // if the original error contains DOM nodes (e.g. from framer-motion)
    const safeError = new Error(error.message);
    safeError.name = error.name;
    safeError.stack = error.stack;
    return { hasError: true, error: safeError };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Strip DOM nodes from the original error object to prevent Next.js dev overlay from crashing
    try {
      for (const key in error) {
        if (error.hasOwnProperty(key)) {
          const val = (error as any)[key];
          if (val && typeof val === 'object' && 'nodeType' in val) {
            delete (error as any)[key];
          }
        }
      }
    } catch (e) {}

    // Log the error properties to see if any is a DOM node
    console.log('Real error caught by ErrorBoundary:');
    console.log('Message:', error.message);
    console.log('Stack:', error.stack);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="p-8 text-red-500 bg-black h-screen w-screen flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold mb-4">Something went wrong.</h1>
          <pre className="text-xs bg-red-900/20 p-4 rounded overflow-auto max-w-full">
            {this.state.error?.message}
          </pre>
        </div>
      );
    }

    return this.props.children;
  }
}
