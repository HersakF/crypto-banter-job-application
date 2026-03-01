export type UIButtonSize = 'sm' | 'md' | 'lg';
export type UIButtonSeverity = 'neutral' | 'primary' | 'danger';
export type UIButtonVariant = 'solid' | 'outline' | 'ghost';

export interface UIButtonProps {
  size?: UIButtonSize;
  severity?: UIButtonSeverity;
  variant?: UIButtonVariant;
}
