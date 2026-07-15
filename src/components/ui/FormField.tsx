type FormFieldProps = {
  id: string;
  label: string;
  required?: boolean;
  type?: string;
  autoComplete?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  hint?: string;
};

function FormField({
  id,
  label,
  required,
  type = "text",
  autoComplete,
  value,
  onChange,
  placeholder,
  hint,
}: FormFieldProps) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-ink">
        {required ? (
          <>
            {label} <span className="text-clay">*</span>
          </>
        ) : (
          label
        )}
      </label>

      <input
        id={id}
        type={type}
        autoComplete={autoComplete}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full rounded-sm border border-ink/20 px-4 py-4 outline-none transition focus:border-brand"
      />

      {hint && <p className="mt-2 text-sm text-muted">{hint}</p>}
    </div>
  );
}

export default FormField;
