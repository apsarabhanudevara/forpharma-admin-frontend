"use client";
import { useEffect, useMemo, useState } from "react";
import { nanoid } from "nanoid";
import {
  MRT_EditActionButtons,
  MaterialReactTable,
  // createRow,
  type MRT_ColumnDef,
  type MRT_Row,
  type MRT_TableOptions,
  useMaterialReactTable,
} from "material-react-table";
import {
  Autocomplete,
  TextField,
  MenuItem,
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
} from "@mui/material";
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { type Chemist } from "../chemists/page";
import { type Doctor } from "../doctors/page";
import { type Drug } from "../drugs/page";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { ConstructionOutlined, Rowing } from "@mui/icons-material";

type Order = {
  id: number;

  uid__c: string;

  doctor_uid__c: Doctor["uid__c"];

  chemist_uid__c: Chemist["uid__c"];

  drug_uid__c: Drug["uid__c"];

  quantity__c: string;

  order_date__c: string;

  delivery_date__c: string;

  order_status__c: "pending" | "approved" | "dispatched" | "delivered" | null;

  instructions__c: string;
};

const Example = () => {
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string | undefined>
  >({});
  const [chemistsJson, setchemistsJson] = useState<Chemist[]>([]);
  const [doctorsJson, setDoctorsJson] = useState<Doctor[]>([]);
  const [drugsJson, setDrugsJson] = useState<Drug[]>([]);

  useEffect(() => {
    // const baseUrl = "https://forsys.wenable.com/api";
    // const baseUrl = "http://localhost:3473";
    const baseUrl = "https://forpharma-admin-backend-476e0848cd4d.herokuapp.com";
    const fetchChemists = fetch(`${baseUrl}/chemists`).then((chemists: any) =>
      chemists.json()
    );
    const fetchDoctors = fetch(`${baseUrl}/doctors`).then((doctors: any) =>
      doctors.json()
    );
    const fetchDrugs = fetch(`${baseUrl}/drugs`).then((drugs) => drugs.json());
    Promise.all([fetchChemists, fetchDoctors, fetchDrugs]).then(
      ([chemists, doctors, drugs]) => {
        setchemistsJson(chemists);
        setDoctorsJson(doctors);
        setDrugsJson(drugs);
      }
    );
  }, []);

  const columns = useMemo<MRT_ColumnDef<Order>[]>(
    () => [
      {
        accessorKey: "id",
        header: "Id",
        Edit: () => null,
        enableEditing: false,
        size: 80,
      },
      {
        accessorKey: "uid__c",
        header: "UUID",
        Edit: () => null,
        enableEditing: false,
        size: 80,
      },
      {
        accessorFn: (row) => {
          if (doctorsJson) {
            const doctorObj = doctorsJson.find(
              (d) => d.uid__c === row.doctor_uid__c
            );
            return doctorObj ? doctorObj["full_name__c"] : "";
          }
        },
        id: "doctor_uid__c",
        header: "Doctor's Name",
        Edit: ({ row }) => (
          <Autocomplete
            autoComplete
            options={doctorsJson}
            getOptionLabel={(doctor: Doctor) => doctor.full_name__c || ""}
            getOptionKey={(doctor: Doctor) => doctor.uid__c || ""}
            defaultValue={doctorsJson.find((d) => {
              if (d.uid__c === row.original.doctor_uid__c) {
                row._valuesCache["doctor_uid__c"] = d.uid__c;
                return true;
              }
            })}
            renderInput={(params) => (
              <TextField {...params} label="Select Doctor" />
            )}
            onChange={(event, doctor) => {
              console.log("doctor >> ", doctor);
              row._valuesCache["doctor_uid__c"] = doctor ? doctor.uid__c : "";
              console.log(
                "row._valuesCache >>  ",
                row._valuesCache["doctor_uid__c"]
              );
            }}
          />
        ),
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.doctor_uid__c,
          helperText: validationErrors?.doctor_uid__c,
          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              doctor_uid__c: undefined,
            }),
          //optionally add validation checking for onBlur or onChange
        },
      },
      {
        accessorFn: (row) => {
          if (chemistsJson) {
            const chemistObj = chemistsJson.find(
              (d) => d.uid__c === row.chemist_uid__c
            );
            if (row.chemist_uid__c) {
              return chemistObj ? chemistObj["name__c"] : "";
            } else {
              return "";
            }
          }
        },
        id: "chemist_uid__c",
        header: "Chemists's Name",
        Edit: ({ row }) => (
          <Autocomplete
            autoComplete
            options={chemistsJson}
            getOptionLabel={(chemist: Chemist) => chemist.name__c || ""}
            getOptionKey={(chemist: Chemist) => chemist.uid__c || ""}
            defaultValue={chemistsJson.find((d) => {
              if (d.uid__c === row.original.chemist_uid__c) {
                row._valuesCache["chemist_uid__c"] = d.uid__c;
                return true;
              }
            })}
            renderInput={(params) => (
              <TextField {...params} label="Select Chemist" />
            )}
            onChange={(event, chemist) => {
              console.log("chemist >> ", chemist);
              row._valuesCache["chemist_uid__c"] = chemist
                ? chemist.uid__c
                : "";
            }}
          />
        ),
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.chemist_uid__c,
          helperText: validationErrors?.chemist_uid__c,
          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              chemist_uid__c: undefined,
            }),
          //optionally add validation checking for onBlur or onChange
        },
      },
      {
        accessorFn: (row) => {
          if (drugsJson) {
            const drugObj = drugsJson.find((d) => d.uid__c === row.drug_uid__c);
            return drugObj ? drugObj["name__c"] : "";
          }
        },
        id: "drug_uid__c",
        header: "Drug Name",
        Edit: ({ row }) => {
          return (
            <Autocomplete
              autoComplete
              options={drugsJson}
              defaultValue={drugsJson.find((d) => {
                if (d.uid__c === row.original.drug_uid__c) {
                  row._valuesCache["drug_uid__c"] = d.uid__c;
                  return true;
                }
              })}
              getOptionLabel={(drug: Drug) => drug.name__c || ""}
              getOptionKey={(drug: Drug) => drug.uid__c || ""}
              renderInput={(params) => (
                <TextField {...params} label="Select Drug" />
              )}
              onChange={(event, drug) => {
                console.log("drug >> ", drug);
                row._valuesCache["drug_uid__c"] = drug ? drug.uid__c : "";
              }}
            />
          );
        },
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.drug_uid__c,
          helperText: validationErrors?.drug_uid__c,
          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              drug_uid__c: undefined,
            }),
          //optionally add validation checking for onBlur or onChange
        },
      },
      {
        accessorKey: "quantity__c",
        header: "Quantity",
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.quantity,
          helperText: validationErrors?.quantity,
          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              quantity: undefined,
            }),
        },
      },
      {
        accessorKey: "order_date__c",
        header: "Order Date",
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.order_date,
          helperText: validationErrors?.order_date,
          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              order_date: undefined,
            }),
        },
      },
      {
        accessorKey: "delivery_date__c",
        header: "Delivery Date",
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.delivery_date,
          helperText: validationErrors?.delivery_date,
          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              delivery_date: undefined,
            }),
        },
      },
      {
        accessorKey: "order_status__c",
        header: "Order Status",
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.order_status,
          helperText: validationErrors?.order_status,
          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              order_status: undefined,
            }),
        },
      },
      {
        accessorKey: "instructions__c",
        header: "Instructions",
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.instructions,
          helperText: validationErrors?.instructions,
          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              instructions: undefined,
            }),
        },
      },
    ],
    [validationErrors, doctorsJson, chemistsJson, drugsJson]
  );

  //call CREATE hook
  const { mutateAsync: createUser, isPending: isCreatingUser } =
    useCreateUser();
  //call READ hook
  const {
    data: fetchedUsers = [],
    isError: isLoadingUsersError,
    isFetching: isFetchingUsers,
    isLoading: isLoadingUsers,
  } = useGetUsers();
  //call UPDATE hook
  const { mutateAsync: updateUser, isPending: isUpdatingUser } =
    useUpdateUser();
  //call DELETE hook
  const { mutateAsync: deleteUser, isPending: isDeletingUser } =
    useDeleteUser();

  //CREATE action
  const handleCreateUser: MRT_TableOptions<Order>["onCreatingRowSave"] =
    async ({ values, table }) => {
      console.log("handleCreateUser >> ", values);
      const newValidationErrors = validateOrder(values);
      if (Object.values(newValidationErrors).some((error) => error)) {
        setValidationErrors(newValidationErrors);
        return;
      }
      setValidationErrors({});
      await createUser(values);
      table.setCreatingRow(null); //exit creating mode
    };

  //UPDATE action
  const handleSaveUser: MRT_TableOptions<Order>["onEditingRowSave"] = async ({
    values,
    table,
  }) => {
    const newValidationErrors = validateOrder(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    setValidationErrors({});
    await updateUser(values);
    table.setEditingRow(null); //exit editing mode
  };

  //DELETE action
  const openDeleteConfirmModal = (row: MRT_Row<Order>) => {
    if (window.confirm("Are you sure you want to delete this Order?")) {
      deleteUser(row.original.uid__c);
    }
  };

  const table = useMaterialReactTable({
    columns,
    data: fetchedUsers,
    createDisplayMode: "modal", //default ('row', and 'custom' are also available)
    editDisplayMode: "modal", //default ('row', 'cell', 'table', and 'custom' are also available)
    enableEditing: true,
    getRowId: (row) => row.uid__c,
    muiToolbarAlertBannerProps: isLoadingUsersError
      ? {
          color: "error",
          children: "Error loading data",
        }
      : undefined,
    muiTableContainerProps: {
      sx: {
        minHeight: "500px",
      },
    },
    onCreatingRowCancel: () => setValidationErrors({}),
    onCreatingRowSave: handleCreateUser,
    onEditingRowCancel: () => setValidationErrors({}),
    onEditingRowSave: handleSaveUser,
    //optionally customize modal content
    renderCreateRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h3" sx={{ fontSize: 18 }}>
          Create New Order
        </DialogTitle>
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          {internalEditComponents} {/* or render custom edit components here */}
        </DialogContent>
        <DialogActions>
          <MRT_EditActionButtons variant="text" table={table} row={row} />
        </DialogActions>
      </>
    ),
    //optionally customize modal content
    renderEditRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h3" sx={{ fontSize: 18 }}>
          Edit Order
        </DialogTitle>
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
          }}
        >
          {internalEditComponents} {/* or render custom edit components here */}
        </DialogContent>
        <DialogActions>
          <MRT_EditActionButtons variant="text" table={table} row={row} />
        </DialogActions>
      </>
    ),
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: "flex", gap: "1rem" }}>
        <Tooltip title="Edit">
          <IconButton onClick={() => table.setEditingRow(row)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton color="error" onClick={() => openDeleteConfirmModal(row)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
    ),
    renderTopToolbarCustomActions: ({ table }) => (
      <Button
        variant="contained"
        onClick={() => {
          table.setCreatingRow(true); //simplest way to open the create row modal with no default values
          //or you can pass in a row object to set default values with the `createRow` helper function
          // table.setCreatingRow(
          //   createRow(table, {
          //     //optionally pass in default values for the new row, useful for nested data or other complex scenarios
          //   }),
          // );
        }}
      >
        Create New Order
      </Button>
    ),
    state: {
      isLoading: isLoadingUsers,
      isSaving: isCreatingUser || isUpdatingUser || isDeletingUser,
      showAlertBanner: isLoadingUsersError,
      showProgressBars: isFetchingUsers,
    },
    initialState: {
      columnVisibility: {
        id: false,

        uid__c: false,

        order_date__c: false,

        delivery_date__c: false,

        order_status__c: false,

        instructions__c: false,
      },
    },
  });

  return doctorsJson.length > 0 && <MaterialReactTable table={table} />;
};

// const url = "https://forsys.wenable.com/api/orders";
// const url = "http://localhost:3473/orders";
const url = "https://forpharma-admin-backend-476e0848cd4d.herokuapp.com/orders";

const createOrder = async (order: Order) => {
  delete (order as { id?: number }).id;
  // delete (order as { uid?: string }).uid;
  order.uid__c = nanoid();
  const orderArray = [];
  orderArray.push(order);
  console.log("Order Data: ", orderArray);
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(orderArray),
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const ordersJson = await response.json();
    console.log("Order Created: ", ordersJson);
    return ordersJson;
  } catch (error: any) {
    console.log("Create Order Error: ", error.message);
  }
};

//CREATE hook (post new user to api)
function useCreateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (order: Order) => {
      //send api update request here
      return createOrder(order);
    },
    //client side optimistic update
    onMutate: (newUserInfo: Order) => {
      queryClient.setQueryData(["orders"], (prevUsers: any) =>
        prevUsers ? ([...prevUsers, newUserInfo] as Order[]) : undefined
      );
    },
    // onSettled: () => queryClient.invalidateQueries({ queryKey: ['users'] }), //refetch users after mutation, disabled for demo
  });
}

const fetchOrders = async () => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const ordersJson = await response.json();
    console.log("Orders: ", ordersJson);
    return ordersJson;
  } catch (error: any) {
    console.log("Fetch Orders Error: ", error.message);
  }
};

//READ hook (get orders from api)
function useGetUsers() {
  return useQuery<Order[]>({
    queryKey: ["orders"],
    queryFn: async () => {
      //send api request here
      return fetchOrders();
    },
    refetchOnWindowFocus: false,
  });
}

const updateOrder = async (order: Order) => {
  try {
    const response = await fetch(`${url}/${order.uid__c}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(order),
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const ordersJson = await response.json();
    console.log("Order Updated: ", ordersJson);
    return ordersJson;
  } catch (error: any) {
    console.log("Update Order Error: ", error.message);
  }
};

//UPDATE hook (put user in api)
function useUpdateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (order: Order) => {
      //send api update request here
      console.log("Updating Order: ", order);
      return updateOrder(order);
    },
    //client side optimistic update
    onMutate: (newUserInfo: Order) => {
      queryClient.setQueryData(["orders"], (prevUsers: any) =>
        prevUsers?.map((prevUser: Order) =>
          prevUser.id === newUserInfo.id ? newUserInfo : prevUser
        )
      );
    },
    // onSettled: () => queryClient.invalidateQueries({ queryKey: ['users'] }), //refetch users after mutation, disabled for demo
  });
}

const deleteOrder = async (orderId: string) => {
  try {
    const response = await fetch(`${url}/${orderId}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const ordersJson = await response.json();
    console.log("Order Deleted: ", ordersJson);
    return ordersJson;
  } catch (error: any) {
    console.log("Delete Order Error: ", error.message);
  }
};

//DELETE hook (delete user in api)
function useDeleteUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (orderId: string) => {
      //send api update request here
      return deleteOrder(orderId);
    },
    //client side optimistic update
    onMutate: (orderId: string) => {
      queryClient.setQueryData(["orders"], (prevUsers: any) =>
        prevUsers?.filter((order: Order) => order.uid__c !== orderId)
      );
    },
    // onSettled: () => queryClient.invalidateQueries({ queryKey: ['users'] }), //refetch users after mutation, disabled for demo
  });
}

const queryClient = new QueryClient();

const ExampleWithProviders = () => (
  //Put this with your other react-query providers near root of your app
  <QueryClientProvider client={queryClient}>
    <Example />
  </QueryClientProvider>
);

export default ExampleWithProviders;

const validateRequired = (value: string) => !!value.length;
const validateEmail = (email: string) =>
  !!email.length &&
  email
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );

function validateOrder(order: Order) {
  return {
    drug_uid__c: !validateRequired(order.drug_uid__c)
      ? "Drug name is Required"
      : "",
  };
  // return true;
}
