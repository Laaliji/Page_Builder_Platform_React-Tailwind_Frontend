import { cn } from "@/lib/utils";

export default function SegmentedControl({ options,value,onChange }) {
    return <>
      <div className="inline-flex bg-black/10 p-1 rounded-md">
        {options.map((option) => (
          <button
            disabled={option.value == value}
            key={option.value}
            onClick={() => onChange(option.value)}
            className={cn(
              "flex items-center justify-center px-3 py-1 text-sm font-medium rounded-md transition-colors",
              value == option.value ? "cursor-not-allowed" : "cursor-pointer" ,
              value === option.value
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:bg-muted-foreground/10"
            )}
          >
            <option.icon className="w-4 h-4 mr-2" />
            {option.label}
          </button>
        ))}
      </div>
    </>
  }