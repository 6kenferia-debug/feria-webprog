import { useState } from 'react';
import {
    Alert,
    Box,
    Button,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControlLabel,
    IconButton,
    InputAdornment,
    MenuItem,
    Paper,
    Stack,
    Switch,
    TextField,
    Typography,
    useMediaQuery,
    Card,
    CardContent,
    Grid,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import SearchIcon from '@mui/icons-material/Search';
import { DataGrid } from '@mui/x-data-grid';
import usersSeed from '../../data/users.json?raw';

const roles = ['admin', 'editor', 'viewer'];
const genders = ['male', 'female', 'other'];

const blankForm = {
    firstName: '',
    lastName: '',
    age: '',
    gender: '',
    contactNumber: '',
    email: '',
    role: 'editor',
    username: '',
    password: '',
    address: '',
    isActive: true,
};

const labelize = (value) => (value ? `${value.charAt(0).toUpperCase()}${value.slice(1)}` : '');

const loadUsers = () => {
    try {
        return {
            users: JSON.parse(usersSeed).map((user, index) => ({
                id: Number(user.id) || index + 1,
                firstName: String(user.firstName ?? '').trim(),
                lastName: String(user.lastName ?? '').trim(),
                age: String(user.age ?? '').trim(),
                gender: genders.includes(String(user.gender ?? '').trim().toLowerCase())
                    ? String(user.gender ?? '').trim().toLowerCase()
                    : '',
                contactNumber: String(user.contactNumber ?? '').trim(),
                email: String(user.email ?? '').trim().toLowerCase(),
                role: roles.includes(String(user.role ?? '').trim().toLowerCase())
                    ? String(user.role ?? '').trim().toLowerCase()
                    : 'editor',
                username: String(user.username ?? '').trim().toLowerCase(),
                password: String(user.password ?? ''),
                address: String(user.address ?? '').trim(),
                isActive: typeof user.isActive === 'boolean' ? user.isActive : true,
            })),
            error: '',
        };
    } catch {
        return {
            users: [],
            error: 'Unable to read users from src/assets/users.json.',
        };
    }
};

const seed = loadUsers();

const UsersPage = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const tealTheme = {
        primary: '#0d9488',
        primaryDark: '#0f766e',
        primaryLight: '#14b8a6',
        backgroundAlt: '#ccfbf1',
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

    const [users, setUsers] = useState(seed.users);
    const [modal, setModal] = useState({ open: false, id: null });
    const [form, setForm] = useState(blankForm);
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    // Dropdown filters
    const [roleFilter, setRoleFilter] = useState(''); // '' => All
    const [genderFilter, setGenderFilter] = useState(''); // '' => All
    const [statusFilter, setStatusFilter] = useState(''); // '' => All, 'active'|'inactive'

    const missingAges = users.filter((row) => String(row.age ?? '').trim() === '').length;
    const missingFirstNames = users.filter((row) => String(row.firstName ?? '').trim() === '').length;
    const missingLastNames = users.filter((row) => String(row.lastName ?? '').trim() === '').length;

    const filteredRows = users.filter((row) => {
        // 1) Search filter
        const matchesSearch = [row.firstName, row.lastName, row.email, row.username].some((field) =>
            String(field ?? '')
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
        );

        // 2) Role filter
        const matchesRole = roleFilter ? String(row.role ?? '').toLowerCase() === roleFilter : true;

        // 3) Gender filter
        const matchesGender = genderFilter ? String(row.gender ?? '').toLowerCase() === genderFilter : true;

        // 4) Status filter
        const matchesStatus = statusFilter
            ? statusFilter === 'active'
                ? row.isActive === true
                : row.isActive === false
            : true;

        return matchesSearch && matchesRole && matchesGender && matchesStatus;
    });

    const resetForm = () => {
        setForm({ ...blankForm });
        setErrors({});
    };

    const openModal = (user) => {
        setModal({ open: true, id: user?.id ?? null });
        setForm(user ? { ...blankForm, ...user } : { ...blankForm });
        setErrors({});
    };

    const closeModal = () => {
        setModal({ open: false, id: null });
        setShowPassword(false);
        resetForm();
    };

    const handleChange = ({ target: { name, value, checked, type } }) => {
        setForm((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));

        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: '' }));
        }
    };

    const validate = () => {
        const nextErrors = {};

        const email = form.email.trim().toLowerCase();
        const username = form.username.trim().toLowerCase();

        const password = String(form.password ?? '');
        const contactNumber = String(form.contactNumber ?? '').trim();
        const age = String(form.age ?? '').trim();

        const hasOnlyDigits = (value) => /^\d+$/.test(value);
        const hasNoSpaces = (value) => !/\s/.test(value);
        const isValidUsername = (value) => hasNoSpaces(value);

        // 1) Required fields (beginner-friendly)
        [
            ['firstName', 'First name'],
            ['lastName', 'Last name'],
            ['age', 'Age'],
            ['gender', 'Gender'],
            ['contactNumber', 'Contact number'],
            ['email', 'Email'],
            ['role', 'Role'],
            ['username', 'Username'],
            ['password', 'Password'],
            ['address', 'Address'],
        ].forEach(([key, label]) => {
            if (!String(form[key]).trim()) {
                nextErrors[key] = `${label} is required.`;
            }
        });

        // 2) Easy custom validations
        if (!nextErrors.password) {
            if (password.length < 8) nextErrors.password = 'Password must be at least 8 characters.';
        }

        if (!nextErrors.contactNumber) {
            if (!/^\d{11}$/.test(contactNumber)) {
                nextErrors.contactNumber = 'Contact number must be exactly 11 digits.';
            }
        }

        if (!nextErrors.age) {
            if (!hasOnlyDigits(age)) nextErrors.age = 'Age must be a number only.';
        }

        if (!nextErrors.username) {
            if (!isValidUsername(form.username)) nextErrors.username = 'Username must not contain spaces.';
        }

        // 3) Existing validations (keep email/username uniqueness)
        if (!nextErrors.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            nextErrors.email = 'Enter a valid email address.';
        }

        if (!nextErrors.email && users.some((user) => user.id !== modal.id && user.email === email)) {
            nextErrors.email = 'Email address already exists.';
        }

        if (!nextErrors.username && users.some((user) => user.id !== modal.id && user.username === username)) {
            nextErrors.username = 'Username already exists.';
        }

        return nextErrors;
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const nextErrors = validate();
        if (Object.keys(nextErrors).length) {
            setErrors(nextErrors);
            return;
        }

        const nextUser = {
            firstName: form.firstName.trim(),
            lastName: form.lastName.trim(),
            age: form.age.trim(),
            gender: form.gender.trim().toLowerCase(),
            contactNumber: form.contactNumber.trim(),
            email: form.email.trim().toLowerCase(),
            role: form.role.trim().toLowerCase(),
            username: form.username.trim().toLowerCase(),
            password: form.password,
            address: form.address.trim(),
            isActive: form.isActive,
        };

        setUsers((prev) => {
            // ensure numeric id matching for edits
            const currentId = modal.id != null ? Number(modal.id) : null;

            if (currentId) {
                return prev.map((user) => (Number(user.id) === currentId ? { ...user, ...nextUser } : user));
            }

            return [
                ...prev,
                {
                    id: prev.reduce((max, user) => Math.max(max, Number(user.id) || 0), 0) + 1,
                    ...nextUser,
                },
            ];
        });

        closeModal();
    };

    const toggleStatus = (id) => {
        setUsers((prev) => prev.map((user) => (user.id === id ? { ...user, isActive: user.isActive } : user)));
    };

    const fieldProps = (name, label, extra = {}) => ({
        name,
        label,
        value: form[name],
        onChange: handleChange,
        error: Boolean(errors[name]),
        helperText: errors[name],
        fullWidth: true,
        ...extra,
    });

    const columns = [
        { field: 'id', headerName: 'ID', width: 88 },
        {
            field: 'fullName',
            headerName: 'Full Name',
            flex: 1,
            minWidth: 178,
            valueGetter: (_, row) => `${row.firstName ?? ''} ${row.lastName ?? ''}`.trim(),
        },
        { field: 'username', headerName: 'Username', minWidth: 150 },
        { field: 'age', headerName: 'Age', width: 90 },
        {
            field: 'gender',
            headerName: 'Gender',
            minWidth: 110,
            valueGetter: (_, row) => labelize(row.gender),
        },
        { field: 'contactNumber', headerName: 'Contact Number', minWidth: 160 },
        { field: 'email', headerName: 'Email', flex: 1.1, minWidth: 220 },
        {
            field: 'role',
            headerName: 'Role',
            minWidth: 120,
            valueGetter: (_, row) => labelize(row.role),
        },
        {
            field: 'status',
            headerName: 'Status',
            minWidth: 120,
            sortable: false,
            renderCell: ({ row }) => (
                <Chip
                    size="small"
                    label={row.isActive ? 'Active' : 'Inactive'}
                    color={row.isActive ? 'success' : 'default'}
                    variant={row.isActive ? 'filled' : 'outlined'}
                />
            ),
        },
        {
            field: 'actions',
            headerName: 'Actions',
            minWidth: 220,
            sortable: false,
            filterable: false,
            renderCell: ({ row }) => (
                <Stack direction="row" spacing={1} sx={{ py: 0.5 }}>
                    <Button size="small" variant="outlined" onClick={() => openModal(row)}>
                        Edit
                    </Button>
                    <Button
                        size="small"
                        variant="contained"
                        color={row.isActive ? 'warning' : 'success'}
                        onClick={() => toggleStatus(row.id)}
                    >
                        {row.isActive ? 'Disable' : 'Activate'}
                    </Button>
                </Stack>
            ),
        },
    ];

    return (
        <Box
            sx={{
                minHeight: '100vh',
                px: 0,
                py: { xs: 2, md: 2 },
                backgroundColor: '#eef4f7',
            }}
        >
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
                                    {users.length}
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
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            gap: 2,
                            flexWrap: 'wrap',
                            mb: 2,
                        }}
                    >
                        <Typography variant="h5" sx={{ color: tealTheme.primaryDark, fontWeight: 800 }}>
                            User Directory
                        </Typography>
                        <Button
                            variant="contained"
                            onClick={() => openModal()}
                            sx={{
                                backgroundColor: tealTheme.primary,
                                '&:hover': { backgroundColor: tealTheme.primaryDark },
                                textTransform: 'none',
                                fontWeight: 700,
                                borderRadius: '1rem',
                                px: 2.5,
                            }}
                        >
                            Add User
                        </Button>
                    </Box>

                    <Box sx={{
                        display: 'flex',
                        gap: 2,
                        alignItems: 'stretch',
                        flexWrap: 'wrap',
                        mb: 2,
                    }}>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    placeholder="Search by first name, last name, email, or username..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    sx={{
                                        flex: '2 1 320px',
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

                        {/* Filters */}
                                <TextField
                                    select
                                    label="Role"
                                    value={roleFilter}
                                    onChange={(e) => setRoleFilter(e.target.value)}
                                    sx={{
                                        flex: '1 1 128px',
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
                        >
                            <MenuItem value="">All</MenuItem>
                            {roles.map((role) => (
                                <MenuItem key={role} value={role}>
                                    {labelize(role)}
                                </MenuItem>
                            ))}
                        </TextField>

                                <TextField
                                    select
                                    label="Gender"
                                    value={genderFilter}
                                    onChange={(e) => setGenderFilter(e.target.value)}
                                    sx={{
                                        flex: '1 1 128px',
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
                        >
                            <MenuItem value="">All</MenuItem>
                            {genders.map((gender) => (
                                <MenuItem key={gender} value={gender}>
                                    {labelize(gender)}
                                </MenuItem>
                            ))}
                        </TextField>

                        <TextField
                            select
                            label="Status"
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            sx={{
                                flex: '1 1 128px',
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
                        >
                            <MenuItem value="">All</MenuItem>
                            <MenuItem value="active">Active</MenuItem>
                            <MenuItem value="inactive">Inactive</MenuItem>
                        </TextField>
                    </Box>

                    {seed.error ? (
                        <Alert severity="error" sx={{ mb: 2 }}>
                            {seed.error}
                        </Alert>
                    ) : null}

                    <Paper sx={{ p: { xs: 1.5, sm: 2 }, minWidth: 0, overflow: 'hidden' }}>
                        {users.length ? (
                            <Box sx={{ height: { xs: 460, sm: 520 }, width: '100%', minWidth: 0 }}>
                                <DataGrid
                                    rows={filteredRows}
                                    columns={columns}
                                    disableRowSelectionOnClick
                                    pageSizeOptions={[5, 10]}
                                    initialState={{
                                        pagination: { paginationModel: { pageSize: 5, page: 0 } },
                                    }}
                                    sx={{
                                        minWidth: 0,
                                        '&.MuiDataGrid-cell, & .MuiDataGrid-columnHeader': {
                                            outline: 'none',
                                        },
                                    }}
                                />
                            </Box>
                        ) : (
                            <Alert severity="info">No users found. Use Add User to create your first record.</Alert>
                        )}
                    </Paper>
                </Box>

                <Dialog open={modal.open} onClose={closeModal} fullWidth fullScreen={isMobile} maxWidth="md">
                    <Box component="form" onSubmit={handleSubmit}>
                        <DialogTitle>{modal.id ? 'Edit User' : 'Add User'}</DialogTitle>

                        <DialogContent dividers sx={{ px: { xs: 2, sm: 3 } }}>
                            <Stack spacing={2} sx={{ pt: 1 }}>
                                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                                    <TextField {...fieldProps('firstName', 'First Name')} />
                                    <TextField {...fieldProps('lastName', 'Last Name')} />
                                </Stack>

                                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                                    <TextField {...fieldProps('age', 'Age')} />
                                    <TextField {...fieldProps('gender', 'Gender', { select: true })}>
                                        {genders.map((gender) => (
                                            <MenuItem key={gender} value={gender}>
                                                {labelize(gender)}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Stack>

                                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                                    <TextField {...fieldProps('contactNumber', 'Contact Number')} />
                                    <TextField {...fieldProps('email', 'Email Address', { type: 'email' })} />
                                </Stack>

                                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                                    <TextField {...fieldProps('role', 'Role', { select: true })}>
                                        {roles.map((role) => (
                                            <MenuItem key={role} value={role}>
                                                {labelize(role)}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                    <TextField {...fieldProps('username', 'Username')} />
                                </Stack>

                                <TextField
                                    {...fieldProps('password', 'Password', {
                                        type: showPassword ? 'text' : 'password',
                                        slotProps: {
                                            input: {
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            edge="end"
                                                            onClick={() => setShowPassword((prev) => !prev)}
                                                            onMouseDown={(event) => event.preventDefault()}
                                                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                                                        >
                                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                ),
                                            },
                                        },
                                    })}
                                />

                                <TextField {...fieldProps('address', 'Address', { multiline: true, rows: 3 })} />

                                <FormControlLabel
                                    control={
                                        <Switch
                                            name="isActive"
                                            checked={form.isActive}
                                            onChange={handleChange}
                                            sx={{
                                                '& .MuiSwitch-switchBase.Mui-checked': {
                                                    color: tealTheme.primary,
                                                },
                                                '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                                    backgroundColor: tealTheme.primary,
                                                },
                                                '& .MuiSwitch-track': {
                                                    backgroundColor: 'rgba(13, 148, 136, 0.35)',
                                                },
                                            }}
                                        />
                                    }
                                    label={form.isActive ? 'User status: Active' : 'User status: Inactive'}
                                />
                            </Stack>
                        </DialogContent>

                        <DialogActions sx={{ px: 3, py: 2 }}>
                            <Button onClick={closeModal}>Cancel</Button>
                            <Button
                                type="submit"
                                variant="contained"
                                sx={{
                                    backgroundColor: tealTheme.primary,
                                    '&:hover': { backgroundColor: tealTheme.primaryDark },
                                    textTransform: 'none',
                                    fontWeight: 700,
                                    borderRadius: '1rem',
                                    px: 2.5,
                                }}
                            >
                                {modal.id ? 'Update User' : 'Save User'}
                            </Button>
                        </DialogActions>
                    </Box>
                </Dialog>
            </Box>
        </Box>
    );
};

export default UsersPage;

