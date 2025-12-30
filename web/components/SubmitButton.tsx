"use client";

import { useFormStatus } from "react-dom";

type SubmitButtonProps = {
  label: string;
  busyLabel?: string;
  className?: string;
};

export default function SubmitButton({
  label,
  busyLabel = "Saving...",
  className = "button",
}: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button className={className} type="submit" disabled={pending}>
      {pending ? busyLabel : label}
    </button>
  );
}
