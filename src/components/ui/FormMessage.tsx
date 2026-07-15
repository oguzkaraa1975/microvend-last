import { forwardRef } from "react";
import type { ReactNode } from "react";

type FormMessageTone = "info" | "error";

type FormMessageProps = {
  tone: FormMessageTone;
  children: ReactNode;
  className?: string;
};

const FormMessage = forwardRef<HTMLDivElement, FormMessageProps>(
  ({ tone, children, className = "" }, ref) => {
    const isError = tone === "error";

    return (
      <div
        ref={ref}
        role={isError ? "alert" : "status"}
        className={`rounded-sm border px-5 py-4 ${isError ? "border-red-200 bg-red-50" : "border-brand/20 bg-brand/5"} ${className}`.trim()}
      >
        <p className={isError ? "text-red-700" : "text-brand"}>{children}</p>
      </div>
    );
  }
);

FormMessage.displayName = "FormMessage";

export default FormMessage;
