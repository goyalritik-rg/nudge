import {
  PasswordController,
  InputController,
  OTPController,
} from "@/common/form/Controllers";

const CONTROLLER_MAPPING = {
  input: InputController,
  password: PasswordController,
  otp: OTPController,
  // select              : SelectController,
  // chips               : ChipsController,
  // 'multi-select'      : MultiselectController,
  // 'async-select'      : AsyncSelectController,
  // datepicker          : DatepickerController,
  // 'date-picker'       : DatepickerController,
  // upload              : UploadController,
  // file                : UploadController,
  // textarea            : TextAreaController,
  // checkbox            : CheckboxController,
  // 'checkbox-group'    : CheckboxGroupController,
  // radio_group         : RadioGroupController,
  // radio               : RadioController,
  // text                : InputController,
  // number              : InputNumberController,
  // pills               : ChipsController,
  // 'price-select'      : PriceSelectController,
  // 'input-group'       : InputGroupController,
  // 'range-slider'      : RangeSliderController,
  // date_range          : DateRangePickerController,
  // 'hscode-select'     : HSCodeSelectController,
  // 'mobile-select'     : MobileNumberController,
  // mobile_country_code : CountrySelectController,
  // async_select_v2     : AsyncSelectControllerV2,
};

const getElementController = (type = "input") =>
  CONTROLLER_MAPPING?.[type] || InputController;

export default getElementController;
