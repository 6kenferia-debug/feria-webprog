import React, { useEffect, useRef, useState } from 'react';
import { Box, Typography, Grid, Card, CardContent, useMediaQuery, useTheme } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';
import { LineChart } from '@mui/x-charts/LineChart';

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

// Calculate data for charts
const validAges = rows.filter(row => row.age !== null);
const ages = validAges.map(row => row.age);
const totalUsers = rows.length;
const validUsers = validAges.length;

// Age groups distribution for pie chart
const ageGroups = validAges.reduce((acc, row) => {
    if (row.age < 18) acc.child++;
    else if (row.age < 35) acc.young++;
    else if (row.age < 60) acc.middle++;
    else acc.senior++;
    return acc;
}, { child: 0, young: 0, middle: 0, senior: 0 });

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

const pageContainerStyle = {
    minHeight: '100vh',
    px: { xs: 1, md: 2 },
    py: { xs: 2, md: 2 },
    backgroundColor: '#eef4f7',
};

const sectionCardStyle = {
    px: 3,
    py: 3,
    backgroundColor: '#ffffff',
    borderRadius: '1.8rem',
    boxShadow: '0 24px 60px rgba(15, 23, 42, 0.08)',
    mb: 4,
};

const summaryCardStyle = {
    backgroundColor: '#ffffff',
    border: '1px solid rgba(15, 23, 42, 0.08)',
    borderRadius: '1.5rem',
    boxShadow: '0 18px 50px rgba(15, 23, 42, 0.08)',
};

const ReportsPage = () => {
    const theme = useTheme();
    const isXs = useMediaQuery(theme.breakpoints.down('sm'));
    const isMd = useMediaQuery(theme.breakpoints.down('md'));
    const [barContainerWidth, setBarContainerWidth] = useState(840);
    const [lineContainerWidth, setLineContainerWidth] = useState(840);
    const [pieContainerWidth, setPieContainerWidth] = useState(400);
    const chartWrapperRef = useRef(null);
    const lineWrapperRef = useRef(null);
    const pieWrapperRef = useRef(null);

    const clampWidth = (width, min, max) => Math.max(min, Math.min(max, Math.floor(width)));
    const defaultBarWidth = isXs ? 320 : isMd ? 620 : 840;
    const defaultPieWidth = isXs ? 320 : isMd ? 360 : 400;

    useEffect(() => {
        const updateSize = (node, setter, min, max) => {
            if (!node) return;
            const width = node.getBoundingClientRect().width;
            setter(clampWidth(width, min, max));
        };

        const nodes = [
            { node: chartWrapperRef.current, setter: setBarContainerWidth, min: 320, max: 840 },
            { node: lineWrapperRef.current, setter: setLineContainerWidth, min: 320, max: 840 },
            { node: pieWrapperRef.current, setter: setPieContainerWidth, min: 320, max: 400 },
        ];

        const observers = [];
        const resizeObserverSupported = typeof ResizeObserver !== 'undefined';

        nodes.forEach(({ node, setter, min, max }) => {
            if (!node) return;
            updateSize(node, setter, min, max);

            if (resizeObserverSupported) {
                const observer = new ResizeObserver(() => updateSize(node, setter, min, max));
                observer.observe(node);
                observers.push(observer);
            }
        });

        const handleResize = () => {
            nodes.forEach(({ node, setter, min, max }) => updateSize(node, setter, min, max));
        };

        if (!resizeObserverSupported) {
            window.addEventListener('resize', handleResize);
        }

        return () => {
            observers.forEach(observer => observer.disconnect());
            if (!resizeObserverSupported) {
                window.removeEventListener('resize', handleResize);
            }
        };
    }, [isMd, isXs]);

    return (
<Box sx={pageContainerStyle}>
            <Box sx={{ maxWidth: '100%', mx: 'auto' }}>
                <Typography
                    variant="h4"
                    sx={{
                        color: tealTheme.primaryDark,
                        fontWeight: 900,
                        mb: 3,
                        borderBottom: `3px solid ${tealTheme.primary}`,
                        display: 'inline-flex',
                        alignItems: 'center',
                    }}
                >
                    Reports & Analytics
                </Typography>
                <Grid container spacing={3} sx={{ mb: 4, justifyContent: 'center' }}>
                    <Grid item xs={12} sm={6} md={4}>
                        <Card sx={summaryCardStyle}>
                            <CardContent>
                                <Typography variant="subtitle2" sx={{ color: tealTheme.textSecondary, fontWeight: 700, mb: 1 }}>
                                    Total Users
                                </Typography>
                                <Typography variant="h3" sx={{ color: tealTheme.primaryDark, fontWeight: 800 }}>
                                    {totalUsers}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Card sx={summaryCardStyle}>
                            <CardContent>
                                <Typography variant="subtitle2" sx={{ color: tealTheme.textSecondary, fontWeight: 700, mb: 1 }}>
                                    Valid Age Entries
                                </Typography>
                                <Typography variant="h3" sx={{ color: tealTheme.primaryDark, fontWeight: 800 }}>
                                    {validUsers}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                        <Card sx={summaryCardStyle}>
                            <CardContent>
                                <Typography variant="subtitle2" sx={{ color: tealTheme.textSecondary, fontWeight: 700, mb: 1 }}>
                                    Average Age
                                </Typography>
                                <Typography variant="h3" sx={{ color: tealTheme.primaryDark, fontWeight: 800 }}>
                                    {validUsers > 0 ? (validAges.reduce((sum, row) => sum + row.age, 0) / validUsers).toFixed(1) : 0}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

                <Typography variant="h5" sx={{ color: tealTheme.primaryDark, fontWeight: 800, mb: 2 }}>
                    Age Distribution
                </Typography>

                <Box ref={chartWrapperRef} sx={{ ...sectionCardStyle, width: '100%', maxWidth: '100%', overflowX: 'hidden' }}>
                    <BarChart
                        width={barContainerWidth || defaultBarWidth}
                        height={340}
                        series={[
                            {
                                data: ages,
                                label: 'User Ages',
                                color: tealTheme.primary,
                            },
                        ]}
xAxis={[
                            {
                                data: validAges.map(row => {
                                    if (row.lastName) {
                                        return row.firstName 
                                            ? `${row.lastName}\n${row.firstName}` 
                                            : row.lastName;
                                    }
                                    return row.firstName || 'Unknown';
                                }),
                                scaleType: 'band',
                                label: 'User Name',
                                tickLabelStyle: {
                                    fill: tealTheme.textSecondary,
                                    fontWeight: 700,
                                },
                            },
                        ]}
yAxis={[
                            {
                                label: 'Age',
                                min: 0,
                                max: 150,
                                tickLabelStyle: {
                                    fill: tealTheme.textSecondary,
                                    fontWeight: 700,
                                },
                            },
                        ]}
                        sx={{
                            '& .MuiChartsAxis-label': {
                                fill: tealTheme.primaryDark,
                                fontWeight: 700,
                            },
                            '& rect': {
                                rx: 12,
                                ry: 12,
                            },
                        }}
                    />
                </Box>
                
                <Typography variant="h5" sx={{ color: tealTheme.primaryDark, fontWeight: 800, mb: 2 }}>
                    Age Groups Breakdown
                </Typography>
                
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <Box ref={pieWrapperRef} sx={{ ...sectionCardStyle, width: '100%', maxWidth: '100%', overflowX: 'hidden' }}>
                            <PieChart
                                width={pieContainerWidth || defaultPieWidth}
                                height={pieContainerWidth || defaultPieWidth}
                                series={[
                                    {
                                        data: [
                                            { id: 1, value: ageGroups.child, label: 'Child (<18)', color: tealTheme.primaryLight },
                                            { id: 2, value: ageGroups.young, label: 'Young (18-34)', color: tealTheme.primary },
                                            { id: 3, value: ageGroups.middle, label: 'Middle (35-59)', color: tealTheme.primaryDark },
                                            { id: 4, value: ageGroups.senior, label: 'Senior (60+)', color: tealTheme.textSecondary },
                                        ],
                                        innerRadius: 64,
                                        outerRadius: 112,
                                        paddingAngle: 2,
                                        label: true,
                                    },
                                ]}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Grid container spacing={3}>
                            <Grid item xs={6}>
                                <Card sx={summaryCardStyle}>
                                    <CardContent>
                                        <Typography variant="subtitle2" sx={{ color: tealTheme.textSecondary, fontWeight: 700, mb: 1 }}>
                                            Child Users
                                        </Typography>
                                        <Typography variant="h4" sx={{ color: tealTheme.primaryDark, fontWeight: 800 }}>
                                            {ageGroups.child}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={6}>
                                <Card sx={summaryCardStyle}>
                                    <CardContent>
                                        <Typography variant="subtitle2" sx={{ color: tealTheme.textSecondary, fontWeight: 700, mb: 1 }}>
                                            Young Adults
                                        </Typography>
                                        <Typography variant="h4" sx={{ color: tealTheme.primaryDark, fontWeight: 800 }}>
                                            {ageGroups.young}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={6}>
                                <Card sx={summaryCardStyle}>
                                    <CardContent>
                                        <Typography variant="subtitle2" sx={{ color: tealTheme.textSecondary, fontWeight: 700, mb: 1 }}>
                                            Middle Age
                                        </Typography>
                                        <Typography variant="h4" sx={{ color: tealTheme.primaryDark, fontWeight: 800 }}>
                                            {ageGroups.middle}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={6}>
                                <Card sx={summaryCardStyle}>
                                    <CardContent>
                                        <Typography variant="subtitle2" sx={{ color: tealTheme.textSecondary, fontWeight: 700, mb: 1 }}>
                                            Senior Users
                                        </Typography>
                                        <Typography variant="h4" sx={{ color: tealTheme.primaryDark, fontWeight: 800 }}>
                                            {ageGroups.senior}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

                <Typography variant="h5" sx={{ color: tealTheme.primaryDark, fontWeight: 800, mb: 2, mt: 4 }}>
                    Age Trend Overview
                </Typography>

                <Box ref={lineWrapperRef} sx={{ ...sectionCardStyle, width: '100%', maxWidth: '100%', overflowX: 'hidden' }}>
                    <LineChart
                        width={lineContainerWidth || defaultBarWidth}
                        height={340}
                        series={[
                            {
                                data: ages,
                                label: 'Age Trend',
                                color: tealTheme.primary,
                            },
                        ]}
                        xAxis={[
                            {
                                data: validAges.map(row => row.id),
                                label: 'User ID',
                                tickLabelStyle: {
                                    fill: tealTheme.textSecondary,
                                    fontWeight: 700,
                                },
                            },
                        ]}
                        yAxis={[
                            {
                                label: 'Age',
                                tickLabelStyle: {
                                    fill: tealTheme.textSecondary,
                                    fontWeight: 700,
                                },
                            },
                        ]}
                        sx={{
                            '& .MuiChartsAxis-label': {
                                fill: tealTheme.primaryDark,
                                fontWeight: 700,
                            },
                        }}
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default ReportsPage;
