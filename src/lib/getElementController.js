import {
  PasswordController,
  InputController,
  OTPController,
  UploadController,
  TextareaController,
} from "@/common/form/Controllers";

const CONTROLLER_MAPPING = {
  input: InputController,
  password: PasswordController,
  otp: OTPController,
  file: UploadController,
  upload: UploadController,
  textarea: TextareaController,
};

const getElementController = (type = "input") =>
  CONTROLLER_MAPPING?.[type] || InputController;

export default getElementController;
