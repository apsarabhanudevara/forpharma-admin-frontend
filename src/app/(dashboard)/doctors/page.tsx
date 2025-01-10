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

export type Doctor = {
    id: number;

    uid__c: string;

    title__c: string;

    full_name__c: string;

    qualification__c: string;

    designation__c: string;

    bio__c: string;

    rating__c: number;

    mobile__c: string;

    regn_no__c: string;

    hospital__c: string;

    address__c: string;

    locality__c: string;

    city__c: string;

    state__c: string;

    pin_code__c: number;

    timing__c: string;

    avatar__c: string;
};

const Example = () => {
    const [validationErrors, setValidationErrors] = useState<
        Record<string, string | undefined>
    >({});

    const columns = useMemo<MRT_ColumnDef<Doctor>[]>(
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
                accessorKey: "title__c",
                header: "Salutation",
                muiEditTextFieldProps: {
                    required: true,
                    error: !!validationErrors?.title,
                    helperText: validationErrors?.title,
                    //remove any previous validation errors when user focuses on the input
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            title: undefined,
                        }),
                    //optionally add validation checking for onBlur or onChange
                },
            },
            {
                accessorKey: "full_name__c",
                header: "Doctor's Name",
                muiEditTextFieldProps: {
                    required: true,
                    error: !!validationErrors?.full_name,
                    helperText: validationErrors?.full_name,
                    //remove any previous validation errors when user focuses on the input
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            full_name: undefined,
                        }),
                },
            },
            {
                accessorKey: "qualification__c",
                header: "Qualification",
                muiEditTextFieldProps: {
                    required: true,
                    error: !!validationErrors?.qualification,
                    helperText: validationErrors?.qualification,
                    //remove any previous validation errors when user focuses on the input
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            qualification: undefined,
                        }),
                },
            },
            {
                accessorKey: "designation__c",
                header: "Designation",
                muiEditTextFieldProps: {
                    required: true,
                    error: !!validationErrors?.designation,
                    helperText: validationErrors?.designation,
                    //remove any previous validation errors when user focuses on the input
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            designation: undefined,
                        }),
                },
            },
            {
                accessorKey: "bio__c",
                header: "Profile",
                muiEditTextFieldProps: {
                    required: true,
                    error: !!validationErrors?.bio,
                    helperText: validationErrors?.bio,
                    //remove any previous validation errors when user focuses on the input
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            bio: undefined,
                        }),
                },
            },
            {
                accessorKey: "rating__c",
                header: "Rating(Max:5)",
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
            {
                accessorKey: "mobile__c",
                header: "Mobile",
                muiEditTextFieldProps: {
                    required: true,
                    error: !!validationErrors?.mobile,
                    helperText: validationErrors?.mobile,
                    //remove any previous validation errors when user focuses on the input
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            mobile: undefined,
                        }),
                },
            },
            {
                accessorKey: "regn_no__c",
                header: "Registration",
                muiEditTextFieldProps: {
                    required: true,
                    error: !!validationErrors?.regn_no,
                    helperText: validationErrors?.regn_no,
                    //remove any previous validation errors when user focuses on the input
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            regn_no: undefined,
                        }),
                },
            },
            {
                accessorKey: "hospital__c",
                header: "Hospital",
                muiEditTextFieldProps: {
                    required: true,
                    error: !!validationErrors?.hospital,
                    helperText: validationErrors?.hospital,
                    //remove any previous validation errors when user focuses on the input
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            hospital: undefined,
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
                accessorKey: "avatar__c",
                header: "Avatar",
                muiEditTextFieldProps: {
                    required: true,
                    error: !!validationErrors?.avatar,
                    helperText: validationErrors?.avatar,
                    //remove any previous validation errors when user focuses on the input
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            avatar: undefined,
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
    const handleCreateUser: MRT_TableOptions<Doctor>["onCreatingRowSave"] =
        async ({ values, table }) => {
            const newValidationErrors = validateDoctor(values);
            if (Object.values(newValidationErrors).some((error) => error)) {
                setValidationErrors(newValidationErrors);
                return;
            }
            setValidationErrors({});
            await createUser(values);
            table.setCreatingRow(null); //exit creating mode
        };

    //UPDATE action
    const handleSaveUser: MRT_TableOptions<Doctor>["onEditingRowSave"] =
        async ({ values, table }) => {
            const newValidationErrors = validateDoctor(values);
            if (Object.values(newValidationErrors).some((error) => error)) {
                setValidationErrors(newValidationErrors);
                return;
            }
            setValidationErrors({});
            await updateUser(values);
            table.setEditingRow(null); //exit editing mode
        };

    //DELETE action
    const openDeleteConfirmModal = (row: MRT_Row<Doctor>) => {
        if (window.confirm("Are you sure you want to delete this Doctor?")) {
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
                    Create New Doctor
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
                    Edit Doctor
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
                Create New Doctor
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
                title__c: false,
                bio__c: false,
                rating__c: false,
                regn_no__c: false,
                hospital__c: false,
                address__c: false,
                locality__c: false,
                city__c: false,
                state__c: false,
                pin_code__c: false,
                timing__c: false,
                avatar__c: false,
            },
        },
    });

    return <MaterialReactTable table={table} />;
};

// const url = "https://forsys.wenable.com/api/doctors";
// const url = "http://localhost:3473/doctors";
const url =
    "https://forpharma-admin-backend-476e0848cd4d.herokuapp.com/doctors";

const createDoctor = async (doctor: Doctor) => {
    delete (doctor as { id?: number }).id;
    //   delete (doctor as { uid?: string }).uid;
    doctor.uid__c = nanoid();
    const doctorArray = [];
    doctorArray.push(doctor);
    console.log("Doctor Data: ", doctor);
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(doctorArray),
        });
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const doctorsJson = await response.json();
        console.log("Doctor Created: ", doctorsJson);
        return doctorsJson;
    } catch (error: any) {
        console.log("Create Doctor Error: ", error.message);
    }
};

//CREATE hook (post new user to api)
function useCreateUser() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (doctor: Doctor) => {
            //send api update request here
            return createDoctor(doctor);
        },
        //client side optimistic update
        onMutate: (newUserInfo: Doctor) => {
            queryClient.setQueryData(["doctors"], (prevUsers: any) =>
                prevUsers
                    ? ([...prevUsers, newUserInfo] as Doctor[])
                    : undefined
            );
        },
        // onSettled: () => queryClient.invalidateQueries({ queryKey: ['users'] }), //refetch users after mutation, disabled for demo
    });
}

const fetchDoctors = async () => {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const doctorsJson = await response.json();
        console.log("Doctors: ", doctorsJson);
        return doctorsJson;
    } catch (error: any) {
        console.log("Fetch Doctors Error: ", error.message);
    }
};

//READ hook (get doctors from api)
function useGetUsers() {
    return useQuery<Doctor[]>({
        queryKey: ["doctors"],
        queryFn: async () => {
            //send api request here
            return fetchDoctors();
        },
        refetchOnWindowFocus: false,
    });
}

const updateDoctor = async (doctor: Doctor) => {
    const doctorArray = [];
    doctorArray.push(doctor);
    try {
        const response = await fetch(`${url}/${doctor.uid__c}`, {
            method: "PATCH",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(doctorArray),
        });
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const doctorsJson = await response.json();
        console.log("Doctor Updated: ", doctorsJson);
        return doctorsJson;
    } catch (error: any) {
        console.log("Update Doctor Error: ", error.message);
    }
};

//UPDATE hook (put user in api)
function useUpdateUser() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (doctor: Doctor) => {
            //send api update request here
            console.log("Updating Doctor: ", doctor);
            return updateDoctor(doctor);
        },
        //client side optimistic update
        onMutate: (newUserInfo: Doctor) => {
            queryClient.setQueryData(["doctors"], (prevUsers: any) =>
                prevUsers?.map((prevUser: Doctor) =>
                    prevUser.uid__c === newUserInfo.uid__c
                        ? newUserInfo
                        : prevUser
                )
            );
        },
        // onSettled: () => queryClient.invalidateQueries({ queryKey: ['users'] }), //refetch users after mutation, disabled for demo
    });
}

const deleteDoctor = async (doctorId: string) => {
    try {
        const response = await fetch(`${url}/${doctorId}`, {
            method: "DELETE",
        });
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const doctorsJson = await response.json();
        console.log("Doctor Deleted: ", doctorsJson);
        return doctorsJson;
    } catch (error: any) {
        console.log("Delete Doctor Error: ", error.message);
    }
};

//DELETE hook (delete user in api)
function useDeleteUser() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (doctorId: string) => {
            //send api update request here
            return deleteDoctor(doctorId);
        },
        //client side optimistic update
        onMutate: (doctorId: string) => {
            queryClient.setQueryData(["doctors"], (prevUsers: any) =>
                prevUsers?.filter(
                    (doctor: Doctor) => doctor.uid__c !== doctorId
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

function validateDoctor(doctor: Doctor) {
    return {
        full_name__c: !validateRequired(doctor.full_name__c)
            ? "First Name is Required"
            : "",
        qualification__c: !validateRequired(doctor.qualification__c)
            ? "Qualification is Required"
            : "",
        avatar__c: !validateRequired(doctor.avatar__c)
            ? "Avatar is Required"
            : "",
    };
}
