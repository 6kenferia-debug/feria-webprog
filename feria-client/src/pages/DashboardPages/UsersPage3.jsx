import React, { useState } from 'react';
import { Box, Typography, Paper, Grid, Card, CardContent, TextField, InputAdornment } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import SearchIcon from '@mui/icons-material/Search';

// User data
const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 14 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 31 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 31 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 11 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

const columns = [
    { 
        field: 'id', 
        headerName: 'ID', 
        width: 90,
        headerAlign: 'center',
    },
    { 
        field: 'firstName', 
        headerName: 'First Name', 
        width: 150,
        editable: true,
        headerAlign: 'center',
    },
    { 
        field: 'lastName', 
        headerName: 'Last Name', 
        width: 150,
        editable: true,
        headerAlign: 'center',
    },
    { 
        field: 'age', 
        headerName: 'Age', 
        type: 'number', 
        width: 120,
        editable: true,
        headerAlign: 'center',
        renderCell: (params) => (
            <Box 
                component="span"
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    color: params.value === null ? '#999' : 'inherit',
                    fontStyle: params.value === null ? 'italic' : 'normal',
                }}
            >
                {params.value === null ? 'N/A' : params.value}
            </Box>
        ),
    },
    {
        field: 'fullName',
        headerName: 'Full Name',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 180,
        valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
        headerAlign: 'center',
    },
];

// Teal theme colors
const tealTheme = {
    primary: '#0d9488',
    primaryDark: '#0f766e',
    primaryLight: '#14b8a6',
    background: '#f0fdfa',
    backgroundAlt: '#ccfbf1',
    text: '#134e4a',
    textSecondary: '#115e59',
};

const summaryCardStyle = {
    backgroundColor: '#ffffff',
    border: '1px solid rgba(15, 23, 42, 0.08)',
    borderRadius: '1.5rem',
    boxShadow: '0 20px 50px rgba(15, 23, 42, 0.08)',
    transition: 'transform 180ms ease, box-shadow 180ms ease',
    '&:hover': {
        transform: 'translateY(-3px)',
        boxShadow: '0 26px 60px rgba(15, 23, 42, 0.12)',
    },
};

const panelStyle = {
    backgroundColor: '#ffffff',
    borderRadius: '1.8rem',
    boxShadow: '0 24px 60px rgba(15, 23, 42, 0.08)',
    mb: 4,
};

const UsersPage = () => {
    const missingAges = rows.filter((row) => row.age === null).length;
    const missingFirstNames = rows.filter((row) => row.firstName === null).length;
    const missingLastNames = rows.filter((row) => row.lastName === null).length;

    const [searchTerm, setSearchTerm] = useState('');

    const filteredRows = rows.filter((row) =>
      [row.firstName, row.lastName].some((field) =>
        field && field.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );

    return (
<Box sx={{
            minHeight: '100vh',
            px: { xs: 1, md: 2 },
            py: { xs: 2, md: 2 },
            backgroundColor: '#eef4f7',
        }}>
            <Box sx={{ maxWidth: '100%', mx: 'auto' }}>
                <Typography
                    variant="h4"
                    sx={{
                        color: tealTheme.primaryDark,
                        fontWeight: 900,
                        mb: 3,
                        letterSpacing: '0.02em',
                        display: 'inline-flex',
                        alignItems: 'center',
                    }}
                >
                    Users Management
                </Typography>

                <Grid container spacing={3} sx={{ mb: 4, justifyContent: 'center' }}>
                    <Grid item xs={6} sm={3}>
                        <Card sx={{ ...summaryCardStyle, minWidth: 180, maxWidth: 180 }}>
                            <CardContent sx={{ textAlign: 'center' }}>
                                <Typography variant="subtitle2" sx={{ color: tealTheme.textSecondary, fontWeight: 700, mb: 1 }}>
                                    Total Users
                                </Typography>
                                <Typography variant="h3" sx={{ color: tealTheme.primaryDark, fontWeight: 800 }}>
                                    {rows.length}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <Card sx={{ ...summaryCardStyle, minWidth: 180, maxWidth: 180 }}>
                            <CardContent sx={{ textAlign: 'center' }}>
                                <Typography variant="subtitle2" sx={{ color: tealTheme.textSecondary, fontWeight: 700, mb: 1 }}>
                                    Missing Age
                                </Typography>
                                <Typography variant="h3" sx={{ color: tealTheme.primaryDark, fontWeight: 800 }}>
                                    {missingAges}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <Card sx={{ ...summaryCardStyle, minWidth: 180, maxWidth: 180 }}>
                            <CardContent sx={{ textAlign: 'center' }}>
                                <Typography variant="subtitle2" sx={{ color: tealTheme.textSecondary, fontWeight: 700, mb: 1 }}>
                                    Missing First Name
                                </Typography>
                                <Typography variant="h3" sx={{ color: tealTheme.primaryDark, fontWeight: 800 }}>
                                    {missingFirstNames}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <Card sx={{ ...summaryCardStyle, minWidth: 180, maxWidth: 180 }}>
                            <CardContent sx={{ textAlign: 'center' }}>
                                <Typography variant="subtitle2" sx={{ color: tealTheme.textSecondary, fontWeight: 700, mb: 1 }}>
                                    Missing Last Name
                                </Typography>
                                <Typography variant="h3" sx={{ color: tealTheme.primaryDark, fontWeight: 800 }}>
                                    {missingLastNames}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

                <Box sx={{ ...panelStyle, p: 3 }}>
                    <Typography variant="h5" sx={{ color: tealTheme.primaryDark, fontWeight: 800, mb: 3 }}>
                        User Directory
                    </Typography>
                    <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Search by first name, last name, email, or username..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        sx={{
                            mb: 2,
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '1rem',
                                backgroundColor: 'white',
                                '& fieldset': {
                                    borderColor: 'rgba(13, 148, 136, 0.2)',
                                },
                                '&:hover fieldset': {
                                    borderColor: tealTheme.primary,
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: tealTheme.primary,
                                    borderWidth: '2px',
                                },
                            },
                        }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon sx={{ color: tealTheme.textSecondary }} />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Paper
                        sx={{
                            width: '100%',
                            overflow: 'hidden',
                            borderRadius: '1.5rem',
                            border: '1px solid rgba(15, 23, 42, 0.08)',
                        }}
                    >
                        <DataGrid
                            rows={filteredRows}
                            columns={columns}
                            initialState={{
                                pagination: {
                                    paginationModel: {
                                        pageSize: 5,
                                    },
                                },
                            }}
                            pageSizeOptions={[5, 10, 20]}
                            checkboxSelection
                            disableRowSelectionOnClick
                            autoHeight
                            sx={{
                                border: 'none',
                                '& .MuiDataGrid-columnHeaders': {
                                    backgroundColor: tealTheme.primaryDark,
                                    color: tealTheme.primaryLight,
                                    fontSize: '1rem',
                                    fontWeight: 700,
                                    border: 'none',
                                },
                                '& .MuiDataGrid-columnHeaderTitle': {
                                    color: tealTheme.primaryLight,
                                    fontWeight: 700,
                                },
                                '& .MuiDataGrid-cell': {
                                    borderColor: 'rgba(13, 148, 136, 0.15)',
                                    color: tealTheme.textSecondary,
                                },
                                '& .MuiDataGrid-row': {
                                    backgroundColor: '#ffffff',
                                    '&:hover': {
                                        backgroundColor: '#f7fdfd',
                                    },
                                    '&.Mui-selected': {
                                        backgroundColor: '#e6f8f6',
                                        '&:hover': {
                                            backgroundColor: '#e6f8f6',
                                        },
                                    },
                                },
                                '& .MuiDataGrid-footerContainer': {
                                    backgroundColor: tealTheme.backgroundAlt,
                                    borderTop: '1px solid rgba(15, 23, 42, 0.08)',
                                },
                                '& .MuiCheckbox-root': {
                                    color: tealTheme.primary,
                                    '&.Mui-checked': {
                                        color: tealTheme.primaryDark,
                                    },
                                },
                                '& .MuiDataGrid-columnSeparator': {
                                    color: tealTheme.primaryLight,
                                },
                            }}
                        />
                    </Paper>
                </Box>

                <Box
                    sx={{
                        mt: 3,
                        p: 3,
                        backgroundColor: tealTheme.backgroundAlt,
                        borderRadius: '1.5rem',
                        border: `1px solid ${tealTheme.primary}`,
                    }}
                >
                    <Typography variant="body1" sx={{ color: tealTheme.textSecondary }}>
                        <strong>Tip:</strong> Use the checkboxes to select users for bulk actions. Click cells to edit user details directly.
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default UsersPage;
