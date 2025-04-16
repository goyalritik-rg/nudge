const GLOBAL_CONSTANTS = {
  regex_patterns: {
    email: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/,
  },
  uploader: {
    max_upload_size: 1024 * 1024 * 2, // 2MB
    accepted_file_types: ["png", "jpg", "jpeg"],
  },
  constants: {
    months: {
      0: {
        key: 0,
        short_label: "Jan",
        label: "January",
      },
      1: {
        key: 1,
        short_label: "Feb",
        label: "February",
      },
      2: {
        key: 2,
        short_label: "Mar",
        label: "March",
      },
      3: {
        key: 3,
        short_label: "Apr",
        label: "April",
      },
      4: {
        key: 4,
        short_label: "May",
        label: "May",
      },
      5: {
        key: 5,
        short_label: "Jun",
        label: "June",
      },
      6: {
        key: 6,
        short_label: "Jul",
        label: "July",
      },
      7: {
        key: 7,
        short_label: "Aug",
        label: "August",
      },
      8: {
        key: 8,
        short_label: "Sep",
        label: "September",
      },
      9: {
        key: 9,
        short_label: "Oct",
        label: "October",
      },
      10: {
        key: 10,
        short_label: "Nov",
        label: "November",
      },
      11: {
        key: 11,
        short_label: "Dec",
        label: "December",
      },
    },
  },
};

export default GLOBAL_CONSTANTS;
