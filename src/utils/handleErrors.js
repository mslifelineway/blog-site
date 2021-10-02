import { messages, severities } from "./constants";

export const handleReponseErrors = (resp, snackbarProps) => {
  const { response, error } = resp;
  if (!response && !error) {
    const { message, user } = resp;
    if (user) {
      return snackbarProps.showSnackbar({
        ...snackbarProps.options,
        open: true,
        severity: severities.success,
        message: message ? message : messages.success,
      });
    } else {
      return snackbarProps.showSnackbar({
        ...snackbarProps.options,
        open: true,
        severity: severities.error,
        message: message ? message : messages.somethingWentWrong,
      });
    }
  }
  if (error) {
    const { status, message } = error;
    switch (status) {
      case 200:
        snackbarProps.showSnackbar({
          ...snackbarProps.options,
          open: true,
          severity: severities.success,
          message: message ? message : messages.success,
        });
        break;
      default:
        break;
    }
  }
  const { status, data } = response;
  const err = data.error;
  switch (status) {
    case 409:
      snackbarProps.showSnackbar({
        ...snackbarProps.options,
        open: true,
        severity: severities.error,
        message: err ? err.message : messages.somethingWentWrong,
      });
      break;
    default:
      break;
  }
};
