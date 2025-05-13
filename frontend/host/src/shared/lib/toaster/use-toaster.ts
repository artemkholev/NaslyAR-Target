import { useSnackbar } from "notistack";

export const useToaster = () => {
  const { enqueueSnackbar } = useSnackbar();

  const showToast = (
    message: string,
    variant: "default" | "error" | "success" | "warning" | "info" | undefined = "default"
  ) => {
    enqueueSnackbar(message, {
      variant,
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "right",
      },
    });
  };

  return { showToast };
};

