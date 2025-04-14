import {
  RadioGroup as ChadCNRadioGroup,
  RadioGroupItem as ChadCNRadioGroupItem,
} from "@/components/ui/radio-group";

import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const RadioGroup = ({ value, onChange, options = [], ...rest }) => {
  return (
    <ChadCNRadioGroup defaultValue={value} onValueChange={onChange} {...rest}>
      {options.map((ele) => {
        const { name = "", label = "", itemClassname, ...restOption } = ele;

        return (
          <div
            key={name}
            className={cn("flex items-center space-x-2", itemClassname)}
          >
            <ChadCNRadioGroupItem value={name} id={name} {...restOption} />

            <Label htmlFor={name}>{label}</Label>
          </div>
        );
      })}
    </ChadCNRadioGroup>
  );
};

export default RadioGroup;
