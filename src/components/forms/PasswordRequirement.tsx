import { CheckIcon, XMarkIcon } from '@heroicons/react/20/solid';

interface PasswordRequirementProps {
  text: string;
  isMet: boolean;
}

export function PasswordRequirement({ text, isMet }: PasswordRequirementProps) {
  return (
    <li className="flex items-center space-x-2">
      {isMet ? (
        <CheckIcon className="h-4 w-4 text-green-500" />
      ) : (
        <XMarkIcon className="h-4 w-4 text-red-500" />
      )}
      <span className={isMet ? 'text-gray-600' : 'text-gray-500'}>{text}</span>
    </li>
  );
}
