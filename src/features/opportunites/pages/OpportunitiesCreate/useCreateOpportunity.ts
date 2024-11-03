import { SelectChangeEvent } from "@mui/material";
import { businessTypeOptions } from "./form-options";
import { useState } from "react";
import { MenuItemPair } from "../../../../components/Select";
import { Dayjs } from "dayjs";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreateOpportunityInput,
  CreateOpportunityInputSchema,
} from "../../entities/opportunity";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ClientOption,
  createOpportunity,
  getClientsOptions,
} from "../../repositories/opportunites.repository";
import { useSnackbar } from "notistack";
import {
  ERROR_SNACKBAR_OPTIONS,
  SUCCESS_SNACKBAR_OPTIONS,
} from "../../../../components/customSnackbar";

function getClientSelectOptions(options: ClientOption[]): MenuItemPair[] {
  return options.map((option) => ({
    text: option.name,
    value: option.id,
  }));
}

export function useCreateOpportunity() {
  //  Snackbars
  const { enqueueSnackbar } = useSnackbar();

  // Form external state, select and date components
  const [businessType, setBusinessType] = useState(
    businessTypeOptions[0].value
  );
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [nonFieldError, setNonFieldError] = useState("");
  const [clientId, setClientId] = useState<number | null>(null);

  const onBusinessTypeChange = (event: SelectChangeEvent<string>) => {
    setBusinessType(event.target.value);
  };

  const onClientChange = (event: SelectChangeEvent<number>) => {
    setClientId(event.target.value as number);
  };

  const onStartDateChange = (date: Dayjs | null) => {
    setStartDate(date);
  };

  // Form and query state

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateOpportunityInput>({
    resolver: zodResolver(CreateOpportunityInputSchema),
  });

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createOpportunity,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["opportunities"] });

      enqueueSnackbar(
        "Opportunity created successfully",
        SUCCESS_SNACKBAR_OPTIONS
      );
    },
    onError: (error) => {
      console.log(error);
      enqueueSnackbar(
        "Sorry, something went wrong, try again later",
        ERROR_SNACKBAR_OPTIONS
      );
    },
  });

  const onSubmit: SubmitHandler<CreateOpportunityInput> = async (data) => {
    if (startDate === null) {
      setNonFieldError("Start date is required");
      return;
    }

    if (startDate.isValid() === false) {
      setNonFieldError("Invalid date");
      return;
    }

    if (startDate.isBefore(new Date(), "day")) {
      setNonFieldError("Start date cannot be in the past");
      return;
    }

    if (clientId === null) {
      setNonFieldError("Client is required");
      return;
    }

    mutation.mutate({
      ...data,
      businessType,
      estimatedStartDate: startDate.format("YYYY-MM-DD"),
      clientId: clientId,
    });
  };

  const { data: clientOptions, isError: isClientOptionsError } = useQuery({
    queryKey: ["client-options"],
    queryFn: getClientsOptions,
  });

  const selectClientOptions = getClientSelectOptions(clientOptions || []);

  const finalOnSubmit = handleSubmit(onSubmit);

  return {
    businessType,
    clientId,
    startDate,
    nonFieldError,
    onBusinessTypeChange,
    onClientChange,
    onStartDateChange,
    register,
    errors,
    finalOnSubmit,
    selectClientOptions,
    isClientOptionsError,
  };
}
