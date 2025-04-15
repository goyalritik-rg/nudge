const GLOBAL_CONSTANTS = {
  regex_patterns: {
    email: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/,
  },
  uploader: {
    max_upload_size: 1024 * 1024 * 2, // 2MB
    accepted_file_types: ["image/png", "image/jpg", "image/jpeg"],
  },
};

export default GLOBAL_CONSTANTS;
