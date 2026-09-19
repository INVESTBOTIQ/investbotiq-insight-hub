import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white p-6">
          <div className="max-w-md w-full bg-slate-800 p-8 rounded-2xl border border-slate-700 text-center space-y-4">
            <h1 className="text-xl font-bold text-red-400">Er is iets misgegaan</h1>
            <p className="text-sm text-slate-300">
              {this.state.error?.message || "Er trad een onverwachte fout op bij het laden."}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-sm font-semibold transition-colors"
            >
              Opnieuw proberen
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
export default ErrorBoundary;
