import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { FormField } from './FormField';
import { PasswordStrength } from './PasswordStrength';
import { PasswordRequirement } from './PasswordRequirement';

interface PasswordFieldProps {
  name: string;
  label: string;
  placeholder?: string;
  showRequirements?: boolean;
}

export function PasswordField({
  name,
  label,
  placeholder,
  showRequirements,
}: PasswordFieldProps) {
  const { watch, formState } = useFormContext();
  const value = watch(name);
  const fieldState = formState.dirtyFields[name];

  const passwordChecks = {
    length: (value?.length || 0) >= 8,
    uppercase: /[A-Z]/.test(value || ''),
    lowercase: /[a-z]/.test(value || ''),
    number: /[0-9]/.test(value || ''),
    special: /[^A-Za-z0-9]/.test(value || ''),
  };

  const allRequirementsMet = Object.values(passwordChecks).every(
    (check) => check,
  );

  return (
    <div className="space-y-2">
      <FormField
        name={name}
        label={label}
        type="password"
        placeholder={placeholder}
      />

      {showRequirements && value && <PasswordStrength password={value} />}

      {showRequirements && fieldState && !allRequirementsMet && (
        <ul className="mt-2 space-y-1">
          <PasswordRequirement
            text="At least 8 characters long"
            isMet={passwordChecks.length}
          />
          <PasswordRequirement
            text="Contains at least one uppercase letter"
            isMet={passwordChecks.uppercase}
          />
          <PasswordRequirement
            text="Contains at least one lowercase letter"
            isMet={passwordChecks.lowercase}
          />
          <PasswordRequirement
            text="Contains at least one number"
            isMet={passwordChecks.number}
          />
          <PasswordRequirement
            text="Contains at least one special character"
            isMet={passwordChecks.special}
          />
        </ul>
      )}
    </div>
  );
}
