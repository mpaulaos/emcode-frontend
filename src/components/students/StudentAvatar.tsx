interface StudentAvatarProps {
  firstName: string;
  lastName: string;
  size?: "sm" | "md";
}

function getInitials(firstName: string, lastName: string) {
  const first = firstName.trim().charAt(0);
  const last = lastName.trim().charAt(0);
  return `${first}${last}`.toUpperCase();
}

function StudentAvatar({ firstName, lastName, size = "md" }: StudentAvatarProps) {
  const sizeClasses = size === "sm" ? "h-8 w-8 text-xs" : "h-9 w-9 text-sm";

  return (
    <span
      aria-hidden="true"
      className={`flex shrink-0 items-center justify-center rounded-full border border-primary-200 bg-primary-50 font-semibold text-primary-700 ${sizeClasses}`}
    >
      {getInitials(firstName, lastName)}
    </span>
  );
}

export default StudentAvatar;
