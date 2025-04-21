import { useDashboardContext } from "@/context/dashboard-context";
import { cn } from "@/lib/utils";

const DomainSelect = ({ setValue, className, value }) => {
  const { domains = [] } = useDashboardContext();

  return (
    <div className="flex flex-col py-0">
      <select
        onChange={(e) => setValue?.(e.target.value)}
        className={cn("px-3 py-3 text-sm border-[1px] rounded-lg", className)}
        value={value || "empty"}
      >
        <option disabled value={"empty"}>
          Domain name
        </option>

        {domains?.map((domain) => (
          <option value={domain.id} key={domain.id}>
            {domain.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DomainSelect;
