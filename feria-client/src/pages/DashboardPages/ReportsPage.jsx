import React, { useEffect, useRef, useState } from 'react';
import { Box, Typography, Grid, Card, CardContent, Button, useMediaQuery, useTheme } from '@mui/material';
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
const validAges = rows.filter((row) => row.age !== null);
const ages = validAges.map((row) => row.age);
const xAxisLabels = validAges.map((row) => {
    const lastName = row.lastName?.trim();
    const firstName = row.firstName?.trim();

    // If both exist -> "Last\nFirst"
    if (lastName && firstName) {
        return `${lastName}\n${firstName}`;
    }

    // If one exists -> show it on the first line (no extra second line)
    if (lastName) return lastName;
    if (firstName) return firstName;

    return `User ${row.id}`;
});
const totalUsers = rows.length;
const validUsers = validAges.length;

// Age groups distribution for pie chart
const ageGroups = validAges.reduce(
    (acc, row) => {
        if (row.age < 18) acc.child++;
        else if (row.age < 35) acc.young++;
        else if (row.age < 60) acc.middle++;
        else acc.senior++;
        return acc;
    },
    { child: 0, young: 0, middle: 0, senior: 0 },
);

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

const ReportsPage = () => {
    const theme = useTheme();
    const isXs = useMediaQuery(theme.breakpoints.down('sm'));
    const isMd = useMediaQuery(theme.breakpoints.down('md'));
    const [barContainerWidth, setBarContainerWidth] = useState(840);
    const [lineContainerWidth, setLineContainerWidth] = useState(840);
    const [pieContainerWidth, setPieContainerWidth] = useState(300);
    const chartWrapperRef = useRef(null);
    const lineWrapperRef = useRef(null);
    const pieWrapperRef = useRef(null);
    const printRef = useRef(null);

    const clampWidth = (width, min, max) => Math.max(min, Math.min(max, Math.floor(width)));
    const defaultBarWidth = isXs ? 320 : isMd ? 620 : 840;
    const defaultPieWidth = isXs ? 240 : isMd ? 270 : 300;

    useEffect(() => {
        const updateSize = (node, setter, min, max) => {
            if (!node) return;
            const width = node.getBoundingClientRect().width;
            setter(clampWidth(width, min, max));
        };

        const nodes = [
            { node: chartWrapperRef.current, setter: setBarContainerWidth, min: 320, max: 840 },
            { node: lineWrapperRef.current, setter: setLineContainerWidth, min: 320, max: 840 },
            { node: pieWrapperRef.current, setter: setPieContainerWidth, min: 240, max: 400 },
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
            nodes.forEach(({ node, setter, min, max }) => {
                if (node) updateSize(node, setter, min, max);
            });
        };

        if (!resizeObserverSupported) {
            window.addEventListener('resize', handleResize);
        }

        return () => {
            observers.forEach((observer) => observer.disconnect());
            if (!resizeObserverSupported) {
                window.removeEventListener('resize', handleResize);
            }
        };
    }, [isXs, isMd]);

    const handlePrint = () => {
        const printContent = printRef.current;
        if (!printContent) return;

        const printWindow = window.open('', '_blank', 'width=1200,height=900');
        if (!printWindow) return;

        const headMarkup = Array.from(document.querySelectorAll('style, link[rel="stylesheet"]'))
            .map((node) => node.outerHTML)
            .join('');

        const exportedAt = new Intl.DateTimeFormat('en-US', {
            dateStyle: 'long',
            timeStyle: 'short',
        }).format(new Date());

        printWindow.document.write(`
            <!DOCTYPE html>
            <html lang="en">
                <head>
                    <meta charset="UTF-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <title>Print Report</title>
                    ${headMarkup}
                    <style>
                        @page {
                            size: A4;
                            margin: 16mm;
                        }

                        * {
                            box-sizing: border-box;
                        }
                        
                        body {
                            margin: 0;
                            font-family: Arial, Helvetica, sans-serif;
                            background: #fff;
                            color: #1f2937;
                        }

                        .report-shell {
                            padding: 28px;
                        }

                        .report-header {
                            margin-bottom: 24px;
                            padding-bottom: 14px;
                            border-bottom: 1px solid #d1d5db;
                        }

                        .report-header h1 {
                            margin: 0 0 6px;
                            font-size: 28px;
                            font-weight: 700;
                        }

                        .report-header p {
                            margin: 0;
                            font-size: 14px;
                            color: #6b7280;
                            line-height: 1.5;
                        }
                        
                        .report-content .MuiCard-root {
                            box-shadow: none !important;
                            border: 1px solid #e5e7eb;
                            break-inside: avoid;
                            page-break-inside: avoid;
                        }

                        .report-content .MuiCardContent-root {
                            padding: 20px;
                        }

                        .report-content svg {
                            max-width: 100% !important;
                            width: 100% !important;
                            height: auto !important;
                            overflow: visible !important;
                        }

                        .report-content .MuiChartsAxisTicks-tickLabel {
                            font-size: 11px !important;
                            transform: rotate(-45deg) !important;
                            white-space: pre !important;
                        }

                        @media print {
                            .report-content svg rect {
                                stroke-width: 0.5px !important;
                            }
                            .report-content .MuiChartsAxisTicks-tickLabel {
                                transform: rotate(-45deg) !important;
                            }
                        }
                    </style>
                </head>
                <body>
                    <main class="report-shell">
                        <header class="report-header">
                            <h1>Reports Summary</h1>
                            <p>Analytics overview for generated reports.</p>
                            <p>Generated: ${exportedAt}</p>
                        </header>
                        <section class="report-content">
                            ${printContent.outerHTML}
                        </section>
                    </main>
                </body>
            </html>
        `);

        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                px: { xs: 1, md: 2 },
                py: { xs: 2, md: 3 },
                backgroundColor: '#eef4f7',
            }}
        >
            <Box sx={{ maxWidth: '100%', mx: 'auto' }}>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mb: 3,
                    }}
                >
                    <Typography
                        variant="h4"
                        sx={{
                            color: tealTheme.primaryDark,
                            fontWeight: 900,
                            borderBottom: `3px solid ${tealTheme.primary}`,
                            display: 'inline-flex',
                            alignItems: 'center',
                        }}
                    >
                        Reports &amp; Analytics
                    </Typography>
                    <Button
                        variant="contained"
                        onClick={handlePrint}
                        sx={{
                            backgroundColor: tealTheme.primary,
                            '&amp;:hover': { backgroundColor: tealTheme.primaryDark },
                            borderRadius: '1rem',
                            px: 3,
                            py: 1,
                            fontWeight: 700,
                            textTransform: 'none',
                        }}
                    >
                        📄 Print Report
                    </Button>
                </Box>

                <div ref={printRef}>
                    <Grid container spacing={3} sx={{ mb: 4, justifyContent: 'center' }}>
                        <Grid item xs={12} sm={6} md={4}>
                            <Card
                                sx={{
                                    backgroundColor: '#ffffff',
                                    border: '1px solid rgba(15, 23, 42, 0.08)',
                                    borderRadius: '1.5rem',
                                    boxShadow: '0 18px 50px rgba(15, 23, 42, 0.08)',
                                }}
                            >
                                <CardContent>
                                    <Typography
                                        variant="subtitle2"
                                        sx={{ color: tealTheme.textSecondary, fontWeight: 700, mb: 1 }}
                                    >
                                        Total Users
                                    </Typography>
                                    <Typography variant="h3" sx={{ color: tealTheme.primaryDark, fontWeight: 800 }}>
                                        {totalUsers}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Card
                                sx={{
                                    backgroundColor: '#ffffff',
                                    border: '1px solid rgba(15, 23, 42, 0.08)',
                                    borderRadius: '1.5rem',
                                    boxShadow: '0 18px 50px rgba(15, 23, 42, 0.08)',
                                }}
                            >
                                <CardContent>
                                    <Typography
                                        variant="subtitle2"
                                        sx={{ color: tealTheme.textSecondary, fontWeight: 700, mb: 1 }}
                                    >
                                        Valid Age Entries
                                    </Typography>
                                    <Typography variant="h3" sx={{ color: tealTheme.primaryDark, fontWeight: 800 }}>
                                        {validUsers}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={12} md={4}>
                            <Card
                                sx={{
                                    backgroundColor: '#ffffff',
                                    border: '1px solid rgba(15, 23, 42, 0.08)',
                                    borderRadius: '1.5rem',
                                    boxShadow: '0 18px 50px rgba(15, 23, 42, 0.08)',
                                }}
                            >
                                <CardContent>
                                    <Typography
                                        variant="subtitle2"
                                        sx={{ color: tealTheme.textSecondary, fontWeight: 700, mb: 1 }}
                                    >
                                        Average Age
                                    </Typography>
                                    <Typography variant="h3" sx={{ color: tealTheme.primaryDark, fontWeight: 800 }}>
                                        {validUsers > 0
                                            ? (validAges.reduce((sum, row) => sum + row.age, 0) / validUsers).toFixed(1)
                                            : 0}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>

                    <Typography variant="h5" sx={{ color: tealTheme.primaryDark, fontWeight: 800, mb: 2 }}>
                        Age Distribution
                    </Typography>
                    <Box
                        ref={chartWrapperRef}
                        sx={{
                            px: 3,
                            py: 3,
                            backgroundColor: '#ffffff',
                            borderRadius: '1.8rem',
                            boxShadow: '0 24px 60px rgba(15, 23, 42, 0.08)',
                            mb: 4,
                            width: '100%',
                            maxWidth: '100%',
                            overflowX: 'visible',
                        }}
                    >
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
                                    data: xAxisLabels,
                                    scaleType: 'band',
                                    label: 'Users',
                                    tickLabelStyle: {
                                        fill: tealTheme.textSecondary,
                                        fontWeight: 700,
                                        whiteSpace: 'pre',
                                        lineHeight: 1.2,
                                    },
                                    tickLabelMinGap: 12,
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
                                '& .MuiChartsAxisTicks-tickLabel': {
                                    fontSize: 12,
                                },
                            }}
                            slotProps={{
                                legend: {
                                    direction: 'row',
                                    position: { horizontal: 'middle', vertical: 'top' },
                                    padding: 0,
                                },
                            }}
                        />
                    </Box>

                    <Typography
                        variant="h5"
                        sx={{ color: tealTheme.primaryDark, fontWeight: 800, mb: 2, textAlign: 'center' }}
                    >
                        Age Groups Breakdown
                    </Typography>
                    <Grid container spacing={3} sx={{ justifyContent: 'center' }}>
                        <Grid item xs={12} md={6}>
                            <Box
                                ref={pieWrapperRef}
                                sx={{
                                    px: 3,
                                    py: 3,
                                    backgroundColor: '#ffffff',
                                    borderRadius: '1.8rem',
                                    boxShadow: '0 24px 60px rgba(15, 23, 42, 0.08)',
                                    width: '100%',
                                    maxWidth: '100%',
                                    overflowX: 'hidden',
                                }}
                            >
                                <PieChart
                                    width={pieContainerWidth || defaultPieWidth}
                                    height={pieContainerWidth || defaultPieWidth}
                                    series={[
                                        {
                                            data: [
                                                { id: 0, value: ageGroups.child, label: 'Child (<18)', color: tealTheme.primaryLight },
                                                { id: 1, value: ageGroups.young, label: 'Young (18-34)', color: tealTheme.primary },
                                                { id: 2, value: ageGroups.middle, label: 'Middle (35-59)', color: tealTheme.primaryDark },
                                                { id: 3, value: ageGroups.senior, label: 'Senior (60+)', color: tealTheme.textSecondary },
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
                                    <Card
                                        sx={{
                                            backgroundColor: '#ffffff',
                                            border: '1px solid rgba(15, 23, 42, 0.08)',
                                            borderRadius: '1.5rem',
                                            boxShadow: '0 18px 50px rgba(15, 23, 42, 0.08)',
                                        }}
                                    >
                                        <CardContent>
                                            <Typography
                                                variant="subtitle2"
                                                sx={{ color: tealTheme.textSecondary, fontWeight: 700, mb: 1 }}
                                            >
                                                Child Users
                                            </Typography>
                                            <Typography variant="h4" sx={{ color: tealTheme.primaryDark, fontWeight: 800 }}>
                                                {ageGroups.child}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid item xs={6}>
                                    <Card
                                        sx={{
                                            backgroundColor: '#ffffff',
                                            border: '1px solid rgba(15, 23, 42, 0.08)',
                                            borderRadius: '1.5rem',
                                            boxShadow: '0 18px 50px rgba(15, 23, 42, 0.08)',
                                        }}
                                    >
                                        <CardContent>
                                            <Typography
                                                variant="subtitle2"
                                                sx={{ color: tealTheme.textSecondary, fontWeight: 700, mb: 1 }}
                                            >
                                                Young Adults
                                            </Typography>
                                            <Typography variant="h4" sx={{ color: tealTheme.primaryDark, fontWeight: 800 }}>
                                                {ageGroups.young}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid item xs={6}>
                                    <Card
                                        sx={{
                                            backgroundColor: '#ffffff',
                                            border: '1px solid rgba(15, 23, 42, 0.08)',
                                            borderRadius: '1.5rem',
                                            boxShadow: '0 18px 50px rgba(15, 23, 42, 0.08)',
                                        }}
                                    >
                                        <CardContent>
                                            <Typography
                                                variant="subtitle2"
                                                sx={{ color: tealTheme.textSecondary, fontWeight: 700, mb: 1 }}
                                            >
                                                Middle Age
                                            </Typography>
                                            <Typography variant="h4" sx={{ color: tealTheme.primaryDark, fontWeight: 800 }}>
                                                {ageGroups.middle}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid item xs={6}>
                                    <Card
                                        sx={{
                                            backgroundColor: '#ffffff',
                                            border: '1px solid rgba(15, 23, 42, 0.08)',
                                            borderRadius: '1.5rem',
                                            boxShadow: '0 18px 50px rgba(15, 23, 42, 0.08)',
                                        }}
                                    >
                                        <CardContent>
                                            <Typography
                                                variant="subtitle2"
                                                sx={{ color: tealTheme.textSecondary, fontWeight: 700, mb: 1 }}
                                            >
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

                    <Typography
                        variant="h5"
                        sx={{ color: tealTheme.primaryDark, fontWeight: 800, mb: 2, mt: 4 }}
                    >
                        Age Trend Overview
                    </Typography>
                    <Box
                        ref={lineWrapperRef}
                        sx={{
                            px: 3,
                            py: 3,
                            backgroundColor: '#ffffff',
                            borderRadius: '1.8rem',
                            boxShadow: '0 24px 60px rgba(15, 23, 42, 0.08)',
                            width: '100%',
                            maxWidth: '100%',
                            overflowX: 'hidden',
                        }}
                    >
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
                                    data: validAges.map((row) => row.id),
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
                            }}
                        />
                    </Box>
                </div>
            </Box>
        </Box>
    );
};

export default ReportsPage;

