import { FieldValues, UseFormRegister } from "react-hook-form";

const DomainSelect = ({ register, domains }) => {
  return (
    <div className="flex flex-col py-0">
      <select
        {...register("domain")}
        className="px-3 py-3 text-sm border-[1px] rounded-lg"
      >
        <option disabled selected>
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
