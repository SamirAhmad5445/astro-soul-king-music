import type React from "react";
import type { MouseEventHandler } from "react";

interface ErrorMessageProps {
  message: string;
  onClear: MouseEventHandler;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  onClear,
}) => {
  return (
    <div className="border-danger-60 flex items-center justify-between rounded-md border bg-danger-700/80 px-4 py-2 text-sm text-danger-50">
      <span>{message}</span>
      <button type="button" className="scale-150" onClick={onClear}>
        ×
      </button>
    </div>
  );
};

export default ErrorMessage;
