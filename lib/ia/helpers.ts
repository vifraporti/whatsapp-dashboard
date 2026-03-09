export function classNames(...s: Array<string | false | undefined | null>) {
  return s.filter(Boolean).join(" ");
}