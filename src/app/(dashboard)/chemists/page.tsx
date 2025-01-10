"use client";
import { useMemo, useState } from "react";
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

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export type Chemist = {
    id: number;

    name__c: string;

    phone__c: string;

    address__c: string;

    pin_code__c: string;

    email__c: string;

    locality__c: string;

    city__c: string;

    state__c: string;

    established__c: number;

    rating__c: number;

    timing__c: string;

    uid__c: string;
};

const Example = () => {
    const [validationErrors, setValidationErrors] = useState<
        Record<string, string | undefined>
    >({});

    const columns = useMemo<MRT_ColumnDef<Chemist>[]>(
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
                accessorKey: "name__c",
                header: "Name",
                muiEditTextFieldProps: {
                    required: true,
                    error: !!validationErrors?.name,
                    helperText: validationErrors?.name,
                    //remove any previous validation errors when user focuses on the input
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            name: undefined,
                        }),
                    //optionally add validation checking for onBlur or onChange
                },
            },
            {
                accessorKey: "phone__c",
                header: "Phone",
                muiEditTextFieldProps: {
                    required: true,
                    error: !!validationErrors?.phone,
                    helperText: validationErrors?.phone,
                    //remove any previous validation errors when user focuses on the input
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            phone: undefined,
                        }),
                },
            },
            {
                accessorKey: "address__c",
                header: "Address",
                muiEditTextFieldProps: {
                    required: true,
                    error: !!validationErrors?.address,
                    helperText: validationErrors?.address,
                    //remove any previous validation errors when user focuses on the input
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            address: undefined,
                        }),
                },
            },
            {
                accessorKey: "pin_code__c",
                header: "Pin Code",
                muiEditTextFieldProps: {
                    required: true,
                    error: !!validationErrors?.pin_code,
                    helperText: validationErrors?.pin_code,
                    //remove any previous validation errors when user focuses on the input
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            pin_code: undefined,
                        }),
                },
            },
            {
                accessorKey: "email__c",
                header: "Email",
                muiEditTextFieldProps: {
                    type: "email",
                    required: true,
                    error: !!validationErrors?.email,
                    helperText: validationErrors?.email,
                    //remove any previous validation errors when user focuses on the input
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            email: undefined,
                        }),
                },
            },
            {
                accessorKey: "locality__c",
                header: "Locality",
                muiEditTextFieldProps: {
                    required: true,
                    error: !!validationErrors?.locality,
                    helperText: validationErrors?.locality,
                    //remove any previous validation errors when user focuses on the input
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            locality: undefined,
                        }),
                },
            },
            {
                accessorKey: "city__c",
                header: "City",
                muiEditTextFieldProps: {
                    required: true,
                    error: !!validationErrors?.city,
                    helperText: validationErrors?.city,
                    //remove any previous validation errors when user focuses on the input
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            city: undefined,
                        }),
                },
            },
            {
                accessorKey: "state__c",
                header: "State",
                muiEditTextFieldProps: {
                    required: true,
                    error: !!validationErrors?.state,
                    helperText: validationErrors?.state,
                    //remove any previous validation errors when user focuses on the input
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            state: undefined,
                        }),
                },
            },
            {
                accessorKey: "established__c",
                header: "Established",
                muiEditTextFieldProps: {
                    required: true,
                    error: !!validationErrors?.established,
                    helperText: validationErrors?.established,
                    //remove any previous validation errors when user focuses on the input
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            established: undefined,
                        }),
                },
            },
            {
                accessorKey: "timing__c",
                header: "Timing",
                muiEditTextFieldProps: {
                    required: true,
                    error: !!validationErrors?.timing,
                    helperText: validationErrors?.timing,
                    //remove any previous validation errors when user focuses on the input
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            timing: undefined,
                        }),
                },
            },
            {
                accessorKey: "rating__c",
                header: "Rating",
                muiEditTextFieldProps: {
                    required: true,
                    error: !!validationErrors?.rating,
                    helperText: validationErrors?.rating,
                    //remove any previous validation errors when user focuses on the input
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            rating: undefined,
                        }),
                },
            },
        ],
        [validationErrors]
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
    const handleCreateUser: MRT_TableOptions<Chemist>["onCreatingRowSave"] =
        async ({ values, table }) => {
            const newValidationErrors = validateChemist(values);
            if (Object.values(newValidationErrors).some((error) => error)) {
                setValidationErrors(newValidationErrors);
                return;
            }
            setValidationErrors({});
            await createUser(values);
            table.setCreatingRow(null); //exit creating mode
        };

    //UPDATE action
    const handleSaveUser: MRT_TableOptions<Chemist>["onEditingRowSave"] =
        async ({ values, table }) => {
            const newValidationErrors = validateChemist(values);
            if (Object.values(newValidationErrors).some((error) => error)) {
                setValidationErrors(newValidationErrors);
                return;
            }
            setValidationErrors({});
            await updateUser(values);
            table.setEditingRow(null); //exit editing mode
        };

    //DELETE action
    const openDeleteConfirmModal = (row: MRT_Row<Chemist>) => {
        if (window.confirm("Are you sure you want to delete this Chemist?")) {
            if (row.original.uid__c) {
                deleteUser(row.original.uid__c);
            }
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
        renderCreateRowDialogContent: ({
            table,
            row,
            internalEditComponents,
        }) => (
            <>
                <DialogTitle variant="h3" sx={{ fontSize: 18 }}>
                    Create New Chemist
                </DialogTitle>
                <DialogContent
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "1rem",
                    }}
                >
                    {internalEditComponents}{" "}
                    {/* or render custom edit components here */}
                </DialogContent>
                <DialogActions>
                    <MRT_EditActionButtons
                        variant="text"
                        table={table}
                        row={row}
                    />
                </DialogActions>
            </>
        ),
        //optionally customize modal content
        renderEditRowDialogContent: ({
            table,
            row,
            internalEditComponents,
        }) => (
            <>
                <DialogTitle variant="h3" sx={{ fontSize: 18 }}>
                    Edit Chemist
                </DialogTitle>
                <DialogContent
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "1.5rem",
                    }}
                >
                    {internalEditComponents}{" "}
                    {/* or render custom edit components here */}
                </DialogContent>
                <DialogActions>
                    <MRT_EditActionButtons
                        variant="text"
                        table={table}
                        row={row}
                    />
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
                    <IconButton
                        color="error"
                        onClick={() => openDeleteConfirmModal(row)}
                    >
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
                Create New Chemist
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
                address__c: false,
                pin_code__c: false,
                locality__c: false,
                city__c: false,
                state__c: false,
                established__c: false,
                rating__c: false,
                timing__c: false,
                uid__c: false,
            },
        },
    });

    return <MaterialReactTable table={table} />;
};

// const url = "https://forsys.wenable.com/api/chemists";
// const url = "http://localhost:3473/chemists";
const url =
    "https://forpharma-admin-backend-476e0848cd4d.herokuapp.com/chemists";

const createChemist = async (chemist: Chemist) => {
    delete (chemist as { id?: number }).id;
    // delete (chemist as { uid?: string }).uid;
    //["id", "uid"].forEach((c) => delete chemist[c]);
    chemist.uid__c = nanoid();
    console.log("Chemist Dta: ", chemist);
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(chemist),
        });
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const chemistsJson = await response.json();
        console.log("Chemist Created: ", chemistsJson);
        return chemistsJson;
    } catch (error: any) {
        console.log("Create Chemist Error: ", error.message);
    }
};

//CREATE hook (post new user to api)
function useCreateUser() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (chemist: Chemist) => {
            //send api update request here
            return createChemist(chemist);
        },
        //client side optimistic update
        onMutate: (newUserInfo: Chemist) => {
            queryClient.setQueryData(["chemists"], (prevUsers: any) =>
                prevUsers
                    ? ([...prevUsers, newUserInfo] as Chemist[])
                    : undefined
            );
        },
        // onSettled: () => queryClient.invalidateQueries({ queryKey: ['users'] }), //refetch users after mutation, disabled for demo
    });
}

const fetchChemists = async () => {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const chemistsJson = await response.json();
        console.log("Chemists: ", chemistsJson);
        return chemistsJson;
    } catch (error: any) {
        console.log("Fetch Chemists Error: ", error.message);
    }
};

//READ hook (get chemists from api)
function useGetUsers() {
    return useQuery<Chemist[]>({
        queryKey: ["chemists"],
        queryFn: async () => {
            //send api request here
            return fetchChemists();
        },
        refetchOnWindowFocus: false,
    });
}

const updateChemist = async (chemist: Chemist) => {
    try {
        const response = await fetch(`${url}/${chemist.uid__c}`, {
            method: "PATCH",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(chemist),
        });
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const chemistsJson = await response.json();
        console.log("Chemist Updated: ", chemistsJson);
        return chemistsJson;
    } catch (error: any) {
        console.log("Update Chemist Error: ", error.message);
    }
};

//UPDATE hook (put user in api)
function useUpdateUser() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (chemist: Chemist) => {
            //send api update request here
            console.log("Updating Chemist: ", chemist);
            return updateChemist(chemist);
        },
        //client side optimistic update
        onMutate: (newUserInfo: Chemist) => {
            queryClient.setQueryData(["chemists"], (prevUsers: any) =>
                prevUsers?.map((prevUser: Chemist) =>
                    prevUser.id === newUserInfo.id ? newUserInfo : prevUser
                )
            );
        },
        // onSettled: () => queryClient.invalidateQueries({ queryKey: ['users'] }), //refetch users after mutation, disabled for demo
    });
}

const deleteChemist = async (chemistId: string) => {
    try {
        const response = await fetch(`${url}/${chemistId}`, {
            method: "DELETE",
        });
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const chemistsJson = await response.json();
        console.log("Chemist Deleted: ", chemistsJson);
        return chemistsJson;
    } catch (error: any) {
        console.log("Delete Chemist Error: ", error.message);
    }
};

//DELETE hook (delete user in api)
function useDeleteUser() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (chemistId: string) => {
            //send api update request here
            return deleteChemist(chemistId);
        },
        //client side optimistic update
        onMutate: (chemistId: string) => {
            queryClient.setQueryData(["chemists"], (prevUsers: any) =>
                prevUsers?.filter(
                    (chemist: Chemist) => chemist.uid__c !== chemistId
                )
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

function validateChemist(chemist: Chemist) {
    return {
        name__c: !validateRequired(chemist.name__c)
            ? "First Name is Required"
            : "",
        phone__c: !validateRequired(chemist.phone__c)
            ? "Qualification is Required"
            : "",
        email__c: !validateEmail(chemist.email__c) ? "Email is Required" : "",
    };
}
