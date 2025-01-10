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

export type Drug = {
    id: number;

    name__c: string;

    composition__c: string;

    product_brief__c: string;

    uses__c: string;

    cautions__c: string;

    prior_to_use__c: string;

    dosage__c: string;

    side_effects__c: string;

    image__c: string;

    manufacturer__c: string;

    compatibility__c: string;

    faq__c: string;

    uid__c: string;
};

const Example = () => {
    const [validationErrors, setValidationErrors] = useState<
        Record<string, string | undefined>
    >({});

    const columns = useMemo<MRT_ColumnDef<Drug>[]>(
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
                accessorKey: "composition__c",
                header: "Composition",
                muiEditTextFieldProps: {
                    required: true,
                    error: !!validationErrors?.composition,
                    helperText: validationErrors?.composition,
                    //remove any previous validation errors when user focuses on the input
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            composition: undefined,
                        }),
                },
            },
            {
                accessorKey: "product_brief__c",
                header: "Product Brief",
                muiEditTextFieldProps: {
                    required: true,
                    error: !!validationErrors?.product_brief,
                    helperText: validationErrors?.product_brief,
                    //remove any previous validation errors when user focuses on the input
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            product_brief: undefined,
                        }),
                },
            },
            {
                accessorKey: "uses__c",
                header: "Uses",
                muiEditTextFieldProps: {
                    required: true,
                    error: !!validationErrors?.uses,
                    helperText: validationErrors?.uses,
                    //remove any previous validation errors when user focuses on the input
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            uses: undefined,
                        }),
                },
            },
            {
                accessorKey: "cautions__c",
                header: "Cautions",
                muiEditTextFieldProps: {
                    required: true,
                    error: !!validationErrors?.cautions,
                    helperText: validationErrors?.cautions,
                    //remove any previous validation errors when user focuses on the input
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            cautions: undefined,
                        }),
                },
            },
            {
                accessorKey: "prior_to_use__c",
                header: "Prior to Use",
                muiEditTextFieldProps: {
                    required: true,
                    error: !!validationErrors?.prior_to_use,
                    helperText: validationErrors?.prior_to_use,
                    //remove any previous validation errors when user focuses on the input
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            prior_to_use: undefined,
                        }),
                },
            },
            {
                accessorKey: "dosage__c",
                header: "Dosage",
                muiEditTextFieldProps: {
                    required: true,
                    error: !!validationErrors?.dosage,
                    helperText: validationErrors?.dosage,
                    //remove any previous validation errors when user focuses on the input
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            dosage: undefined,
                        }),
                },
            },
            {
                accessorKey: "side_effects__c",
                header: "Side Effects",
                muiEditTextFieldProps: {
                    required: true,
                    error: !!validationErrors?.side_effects,
                    helperText: validationErrors?.side_effects,
                    //remove any previous validation errors when user focuses on the input
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            side_effects: undefined,
                        }),
                },
            },
            {
                accessorKey: "image__c",
                header: "Image",
                muiEditTextFieldProps: {
                    required: true,
                    error: !!validationErrors?.image,
                    helperText: validationErrors?.image,
                    //remove any previous validation errors when user focuses on the input
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            image: undefined,
                        }),
                },
            },
            {
                accessorKey: "manufacturer__c",
                header: "Manufacturer",
                muiEditTextFieldProps: {
                    required: true,
                    error: !!validationErrors?.manufacturer,
                    helperText: validationErrors?.manufacturer,
                    //remove any previous validation errors when user focuses on the input
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            manufacturer: undefined,
                        }),
                },
            },
            {
                accessorKey: "compatibility__c",
                header: "Compatibility",
                muiEditTextFieldProps: {
                    required: true,
                    error: !!validationErrors?.compatibility,
                    helperText: validationErrors?.compatibility,
                    //remove any previous validation errors when user focuses on the input
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            compatibility: undefined,
                        }),
                },
            },
            {
                accessorKey: "faq__c",
                header: "FAQ",
                muiEditTextFieldProps: {
                    required: true,
                    error: !!validationErrors?.faq,
                    helperText: validationErrors?.faq,
                    //remove any previous validation errors when user focuses on the input
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            faq: undefined,
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
    const handleCreateUser: MRT_TableOptions<Drug>["onCreatingRowSave"] =
        async ({ values, table }) => {
            const newValidationErrors = validateDrug(values);
            if (Object.values(newValidationErrors).some((error) => error)) {
                setValidationErrors(newValidationErrors);
                return;
            }
            setValidationErrors({});
            await createUser(values);
            table.setCreatingRow(null); //exit creating mode
        };

    //UPDATE action
    const handleSaveUser: MRT_TableOptions<Drug>["onEditingRowSave"] = async ({
        values,
        table,
    }) => {
        const newValidationErrors = validateDrug(values);
        if (Object.values(newValidationErrors).some((error) => error)) {
            setValidationErrors(newValidationErrors);
            return;
        }
        setValidationErrors({});
        await updateUser(values);
        table.setEditingRow(null); //exit editing mode
    };

    //DELETE action
    const openDeleteConfirmModal = (row: MRT_Row<Drug>) => {
        if (window.confirm("Are you sure you want to delete this Drug?")) {
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
        renderCreateRowDialogContent: ({
            table,
            row,
            internalEditComponents,
        }) => (
            <>
                <DialogTitle variant="h3" sx={{ fontSize: 18 }}>
                    Create New Drug
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
                    Edit Drug
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
                Create New Drug
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

                product_brief__c: false,

                uses__c: false,

                cautions__c: false,

                prior_to_use__c: false,

                dosage__c: false,

                side_effects__c: false,

                image__c: false,

                manufacturer__c: false,

                compatibility__c: false,

                faq__c: false,
            },
        },
    });

    return <MaterialReactTable table={table} />;
};

// const url = "https://forsys.wenable.com/api/drugs";
// const url = "http://localhost:3473/drugs";
const url = "https://forpharma-admin-backend-476e0848cd4d.herokuapp.com/drugs";

const createDrug = async (drug: Drug) => {
    delete (drug as { id?: number }).id;
    // delete (drug as { uid?: string }).uid;
    drug.uid__c = nanoid();
    console.log("Drug Dta: ", drug);
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(drug),
        });
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const drugsJson = await response.json();
        console.log("Drug Created: ", drugsJson);
        return drugsJson;
    } catch (error: any) {
        console.log("Create Drug Error: ", error.message);
    }
};

//CREATE hook (post new user to api)
function useCreateUser() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (drug: Drug) => {
            //send api update request here
            return createDrug(drug);
        },
        //client side optimistic update
        onMutate: (newUserInfo: Drug) => {
            queryClient.setQueryData(["drugs"], (prevUsers: any) =>
                prevUsers ? ([...prevUsers, newUserInfo] as Drug[]) : undefined
            );
        },
        // onSettled: () => queryClient.invalidateQueries({ queryKey: ['users'] }), //refetch users after mutation, disabled for demo
    });
}

const fetchDrugs = async () => {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const drugsJson = await response.json();
        console.log("Drugs: ", drugsJson);
        return drugsJson;
    } catch (error: any) {
        console.log("Fetch Drugs Error: ", error.message);
    }
};

//READ hook (get drugs from api)
function useGetUsers() {
    return useQuery<Drug[]>({
        queryKey: ["drugs"],
        queryFn: async () => {
            //send api request here
            return fetchDrugs();
        },
        refetchOnWindowFocus: false,
    });
}

const updateDrug = async (drug: Drug) => {
    try {
        const response = await fetch(`${url}/${drug.uid__c}`, {
            method: "PATCH",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(drug),
        });
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const drugsJson = await response.json();
        console.log("Drug Updated: ", drugsJson);
        return drugsJson;
    } catch (error: any) {
        console.log("Update Drug Error: ", error.message);
    }
};

//UPDATE hook (put user in api)
function useUpdateUser() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (drug: Drug) => {
            //send api update request here
            console.log("Updating Drug: ", drug);
            return updateDrug(drug);
        },
        //client side optimistic update
        onMutate: (newUserInfo: Drug) => {
            queryClient.setQueryData(["drugs"], (prevUsers: any) =>
                prevUsers?.map((prevUser: Drug) =>
                    prevUser.id === newUserInfo.id ? newUserInfo : prevUser
                )
            );
        },
        // onSettled: () => queryClient.invalidateQueries({ queryKey: ['users'] }), //refetch users after mutation, disabled for demo
    });
}

const deleteDrug = async (drugId: string) => {
    try {
        const response = await fetch(`${url}/${drugId}`, {
            method: "DELETE",
        });
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const drugsJson = await response.json();
        console.log("Drug Deleted: ", drugsJson);
        return drugsJson;
    } catch (error: any) {
        console.log("Delete Drug Error: ", error.message);
    }
};

//DELETE hook (delete user in api)
function useDeleteUser() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (drugId: string) => {
            //send api update request here
            return deleteDrug(drugId);
        },
        //client side optimistic update
        onMutate: (drugId: string) => {
            queryClient.setQueryData(["drugs"], (prevUsers: any) =>
                prevUsers?.filter((drug: Drug) => drug.uid__c !== drugId)
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

function validateDrug(drug: Drug) {
    return {
        name__c: !validateRequired(drug.name__c)
            ? "First Name is Required"
            : "",
        phone__c: !validateRequired(drug.composition__c)
            ? "Qualification is Required"
            : "",
    };
}
