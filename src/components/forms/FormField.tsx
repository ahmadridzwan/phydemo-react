import { useState, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

interface FormFieldProps {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  validation?: {
    debounce?: number;
  };
}

export function FormField({
  name,
  label,
  type = 'text',
  placeholder,
  validation = { debounce: 500 },
}: FormFieldProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [showError, setShowError] = useState(false);
  const {
    register,
    formState: { errors },
    trigger,
    watch,
  } = useFormContext();

  const value = watch(name);

  // Handle debounced validation while typing
  useEffect(() => {
    if (!value || !isFocused) return;

    const timer = setTimeout(() => {
      trigger(name);
      setShowError(true);
    }, validation.debounce);

    return () => clearTimeout(timer);
  }, [value, name, trigger, validation.debounce, isFocused]);

  // Reset error visibility when field is focused
  useEffect(() => {
    if (isFocused) {
      setShowError(false);
    }
  }, [isFocused]);

  const handleBlur = async () => {
    setIsFocused(false);
    // Immediately show validation errors on blur
    await trigger(name);
    setShowError(true);
  };

  const { onChange, onBlur, ...registerProps } = register(name);

  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        {...registerProps}
        onChange={(e) => {
          onChange(e);
        }}
        onBlur={(e) => {
          onBlur(e);
          handleBlur();
        }}
        type={type}
        id={name}
        placeholder={placeholder}
        onFocus={() => setIsFocused(true)}
        className={`mt-1 block w-full px-3 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 ${
          showError && errors[name] ? 'border-red-300' : 'border-gray-300'
        }`}
      />
      {showError && errors[name] && (
        <p className="mt-1 text-sm text-red-600 font-medium">
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  );
}
