import React from "react";

type IconProps = React.SVGProps<SVGSVGElement>;

const IconBase = ({ className, children, ...props }: IconProps & { children: React.ReactNode }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    {children}
  </svg>
);

export const ArrowRightOnRectangleIcon = (props: IconProps) => (
  <IconBase {...props}>
    <path d="M13 6H8a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h5" />
    <path d="M9 12h12" />
    <path d="m19 8 4 4-4 4" />
  </IconBase>
);

export const LockClosedIcon = (props: IconProps) => (
  <IconBase {...props}>
    <rect x="5" y="11" width="14" height="9" rx="2" ry="2" />
    <path d="M9 11V8a3 3 0 0 1 6 0v3" />
    <path d="M12 15v2" />
  </IconBase>
);

export const UserIcon = (props: IconProps) => (
  <IconBase {...props}>
    <circle cx="12" cy="8" r="3.5" />
    <path d="M6 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
  </IconBase>
);

export const ChevronLeftIcon = (props: IconProps) => (
  <IconBase {...props}>
    <path d="m14 6-6 6 6 6" />
  </IconBase>
);

export const ChevronRightIcon = (props: IconProps) => (
  <IconBase {...props}>
    <path d="m10 6 6 6-6 6" />
  </IconBase>
);

export const ChevronUpIcon = (props: IconProps) => (
  <IconBase {...props}>
    <path d="m6 15 6-6 6 6" />
  </IconBase>
);

export const Bars3Icon = (props: IconProps) => (
  <IconBase {...props}>
    <path d="M4 7h16" />
    <path d="M4 12h16" />
    <path d="M4 17h16" />
  </IconBase>
);

export const XMarkIcon = (props: IconProps) => (
  <IconBase {...props}>
    <path d="M6 6l12 12" />
    <path d="M18 6 6 18" />
  </IconBase>
);

export const PlusIcon = (props: IconProps) => (
  <IconBase {...props}>
    <path d="M12 5v14" />
    <path d="M5 12h14" />
  </IconBase>
);

export const ArrowUpTrayIcon = (props: IconProps) => (
  <IconBase {...props}>
    <path d="m12 4-4 4" />
    <path d="m12 4 4 4" />
    <path d="M12 4v12" />
    <path d="M5 20h14" />
  </IconBase>
);

export const TrashIcon = (props: IconProps) => (
  <IconBase {...props}>
    <path d="M5 7h14" />
    <path d="M9 7V5h6v2" />
    <path d="M10 11v6" />
    <path d="M14 11v6" />
    <path d="M7 7l1 12a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2l1-12" />
  </IconBase>
);

export const CalendarDaysIcon = (props: IconProps) => (
  <IconBase {...props}>
    <rect x="4" y="6" width="16" height="14" rx="2" ry="2" />
    <path d="M4 10h16" />
    <path d="M8 2v4" />
    <path d="M16 2v4" />
  </IconBase>
);

export const ArrowRightIcon = ArrowRightOnRectangleIcon;
