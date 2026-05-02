import React from 'react';
import { Box, Typography, Card, CardContent, Grid, Paper } from '@mui/material';
import { Gauge } from '@mui/x-charts/Gauge';
import { DataGrid } from '@mui/x-data-grid';

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

// Columns for DataGrid
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
        headerAlign: 'center'
    },
    { 
        field: 'lastName', 
        headerName: 'Last Name', 
        width: 150,
        editable: true,
        headerAlign: 'center'
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
        headerAlign: 'center'
    },
];

// Calculate statistics
const totalUsers = rows.length;
const validAges = rows.filter(row => row.age !== null);
const averageAge = validAges.length > 0
    ? (validAges.reduce((sum, row) => sum + row.age, 0) / validAges.length).toFixed(1)
    : 0;
const maxAge = validAges.length > 0 ? Math.max(...validAges.map(row => row.age)) : 0;
const minAge = validAges.length > 0 ? Math.min(...validAges.map(row => row.age)) : 0;

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

const gaugeContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    p: { xs: 2, sm: 3 },
    backgroundColor: '#ffffff',
    borderRadius: '1.5rem',
    boxShadow: '0 20px 40px rgba(15, 23, 42, 0.08)',
    minHeight: 240,
    width: '100%',
};

const panelStyle = {
    backgroundColor: '#ffffff',
    borderRadius: '1.8rem',
    boxShadow: '0 24px 60px rgba(15, 23, 42, 0.08)',
    mb: 4,
};

const DashboardPage = () => {
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
                        fontWeight: '900',
                        mb: 3,
                        letterSpacing: '0.02em',
                        display: 'inline-flex',
                        alignItems: 'center',
                    }}
                >
                    Dashboard Overview
                </Typography>
                
                <Grid container spacing={3} sx={{ mb: 4, justifyContent: 'center' }}>
                    <Grid item xs={6} sm={6} md={3}>
                        <Card sx={summaryCardStyle}>
                            <CardContent>
                                <Typography variant="h6" sx={{ color: tealTheme.textSecondary, fontWeight: 700, mb: 1 }}>
                                    Total Users
                                </Typography>
                                <Typography variant="h3" sx={{ color: tealTheme.primaryDark, fontWeight: 800 }}>
                                    {totalUsers}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={6} sm={6} md={3}>
                        <Card sx={summaryCardStyle}>
                            <CardContent>
                                <Typography variant="h6" sx={{ color: tealTheme.textSecondary, fontWeight: 700, mb: 1 }}>
                                    Average Age
                                </Typography>
                                <Typography variant="h3" sx={{ color: tealTheme.primaryDark, fontWeight: 800 }}>
                                    {averageAge}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={6} sm={6} md={3}>
                        <Card sx={summaryCardStyle}>
                            <CardContent>
                                <Typography variant="h6" sx={{ color: tealTheme.textSecondary, fontWeight: 700, mb: 1 }}>
                                    Youngest
                                </Typography>
                                <Typography variant="h3" sx={{ color: tealTheme.primaryDark, fontWeight: 800 }}>
                                    {minAge}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={6} sm={6} md={3}>
                        <Card sx={summaryCardStyle}>
                            <CardContent>
                                <Typography variant="h6" sx={{ color: tealTheme.textSecondary, fontWeight: 700, mb: 1 }}>
                                    Oldest
                                </Typography>
                                <Typography variant="h3" sx={{ color: tealTheme.primaryDark, fontWeight: 800 }}>
                                    {maxAge}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

                <Typography
                    variant="h5"
                    sx={{
                        color: tealTheme.primaryDark,
                        fontWeight: 800,
                        mb: 2,
                        mt: 2,
                    }}
                >
                    Statistics Overview
                </Typography>
                
                <Grid container spacing={3} sx={{ mb: 4, justifyContent: 'center' }}>
                    <Grid item xs={12} sm={4}>
                        <Box sx={gaugeContainerStyle}>
                            <Gauge
                                width={120}
                                height={120}
                                value={80}
                                valueMin={0}
                                valueMax={100}
                                label="80%"
                                color={tealTheme.primary}
                                sx={{
                                    '& .MuiGauge-valueText': {
                                        fontSize: '1.2rem',
                                        fill: tealTheme.primaryDark,
                                    },
                                }}
                            />
                            <Typography variant="subtitle1" sx={{ color: tealTheme.textSecondary, fontWeight: 700, mt: 2 }}>
                                Active Users
                            </Typography>
                        </Box>
                    </Grid>
                    
                    <Grid item xs={12} sm={4}>
                        <Box sx={gaugeContainerStyle}>
                            <Gauge
                                width={120}
                                height={120}
                                value={65}
                                valueMin={0}
                                valueMax={100}
                                label="65%"
                                color={tealTheme.primary}
                                sx={{
                                    '& .MuiGauge-valueText': {
                                        fontSize: '1.2rem',
                                        fill: tealTheme.primaryDark,
                                    },
                                }}
                            />
                            <Typography variant="subtitle1" sx={{ color: tealTheme.textSecondary, fontWeight: 700, mt: 2 }}>
                                Profile Completion
                            </Typography>
                        </Box>
                    </Grid>

                    <Grid item xs={12} sm={4}>
                        <Box sx={gaugeContainerStyle}>
                            <Gauge
                                width={120}
                                height={120}
                                value={90}
                                valueMin={0}
                                valueMax={100}
                                label="90%"
                                color={tealTheme.primary}
                                sx={{
                                    '& .MuiGauge-valueText': {
                                        fontSize: '1.2rem',
                                        fill: tealTheme.primaryDark,
                                    },
                                }}
                            />
                            <Typography variant="subtitle1" sx={{ color: tealTheme.textSecondary, fontWeight: 700, mt: 2 }}>
                                Data Accuracy
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>

                <Typography
                    variant="h5"
                    sx={{
                        color: tealTheme.primaryDark,
                        fontWeight: 800,
                        mb: 2,
                    }}
                >
                    Users Overview
                </Typography>

                <Box sx={{ ...panelStyle, p: 3 }}>
                    <Paper
                        sx={{
                            width: '100%',
                            overflow: 'hidden',
                            borderRadius: '1.5rem',
                            border: '1px solid rgba(15, 23, 42, 0.08)',
                        }}
                    >
                        <DataGrid
                            rows={rows}
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
            </Box>
        </Box>
    );
};

export default DashboardPage;
