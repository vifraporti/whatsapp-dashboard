import { classNames } from "../../lib/ia/helpers";

type Props = {
  icon: React.ElementType;
  label: string;
  value: string;
  accent?: boolean;
};

export default function MetricCard({
  icon: Icon,
  label,
  value,
  accent,
}: Props) {
  return (
    <div
      className={classNames(
        "rounded-2xl p-4 border shadow-sm",
        accent
          ? "bg-gradient-to-r from-violet-50 to-fuchsia-50 border-violet-200"
          : "bg-slate-50 border-slate-200"
      )}
    >
      <div
        className={classNames(
          "flex items-center gap-2",
          accent ? "text-violet-800" : "text-slate-700"
        )}
      >
        <Icon className="w-4 h-4" />
        <p className="text-xs">{label}</p>
      </div>
      <p
        className={classNames(
          "mt-2 text-lg font-semibold",
          accent ? "text-violet-900" : "text-slate-900"
        )}
      >
        {value}
      </p>
    </div>
  );
}