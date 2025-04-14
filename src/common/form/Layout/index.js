import getElementController from "@/lib/getElementController";
import getErrorMessage from "@/lib/getErrorMessage";
import { cn } from "@/lib/utils";

const DEFAULT_SPAN = 12;
const PERCENTAGE_FACTOR = 100;

function Layout({
  controls = [],
  control = () => {},
  watch = () => {},
  errors = {},
  showElements = {},
  gap = "24px",
  disabled = false,
  className = "",
  ...restLayout
}) {
  return (
    <div style={{ gap }} className={cn("w-full flex flex-wrap", className)}>
      {(controls || []).map((controlItem) => {
        const newControl = { ...controlItem };

        const {
          label,
          type,
          name,
          span,
          showRequiredMark = true,
          className: itemClass,
        } = newControl;

        const flex =
          ((span || DEFAULT_SPAN) / DEFAULT_SPAN) * PERCENTAGE_FACTOR;

        const show = !(name in showElements) || showElements[name];

        if (!show || ("show" in newControl && !newControl.show)) {
          return null;
        }

        // if (['field-array', 'fieldArray'].includes(type)) {
        // 	return (
        // 		<div
        // 			className={cl`${styles.form_item} ${cl.ns('layout_form_item')}`}
        // 			key={`${name}_${label}`}
        // 		>
        // 			<FieldArray
        // 				{...newControl}
        // 				control={control}
        // 				watch={watch}
        // 				error={errors?.[name]}
        // 				{...restLayout}
        // 			/>
        // 		</div>
        // 	);
        // }

        const Element = getElementController(type);

        const errorMessage = getErrorMessage({
          error: errors?.[newControl.name],
          rules: newControl?.rules,
          label: newControl?.label,
        });

        if (!Element) {
          return null;
        }

        return (
          <div
            key={`${name}_${label}`}
            style={{ width: `calc(${flex}% - ${gap})` }}
            className={cn("", itemClass)}
          >
            {["checkbox", "radio"].includes(type) ? null : (
              <div className="flex text-sm mb-1 gap-0.5">
                {newControl?.boldLabel || label || ""}
                {newControl?.rules?.required &&
                showRequiredMark &&
                (label || newControl?.boldLabel) ? (
                  <div className="text-red-600">*</div>
                ) : null}
                {newControl?.showOptional ? <div>(Optional)</div> : null}
              </div>
            )}

            <Element
              {...newControl}
              name={name}
              label={label}
              control={control}
              {...(newControl?.inputType ? { type: newControl.inputType } : {})}
              disabled={disabled || newControl?.disabled}
              disable={disabled || newControl?.disable}
            />

            {errors[name] && (
              <div className="text-red-600 text-sm mt-1">{errorMessage}</div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default Layout;
