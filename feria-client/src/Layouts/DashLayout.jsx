import React, { useState, useEffect } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom"; 
import { styled, useTheme, alpha} from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer"; 
import MuiAppBar from "@mui/material/AppBar"; 
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline"; 
import Typography from "@mui/material/Typography"; 
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton"; 
import MenuIcon from "@mui/icons-material/Menu"; 
import SearchIcon from "@mui/icons-material/Search"; 
import InputBase from "@mui/material/InputBase";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight"; 
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton"; 
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText"; 
import DashboardIcon from "@mui/icons-material/Dashboard"; 
import PeopleIcon from "@mui/icons-material/People"; 
import AssessmentIcon from "@mui/icons-material/Assessment"; 
import ArticleIcon from "@mui/icons-material/Article";
import Button from "@mui/material/Button";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";

const drawerWidth = 240;
const dashboardNavItems = [
    {
        label: "Dashboard",
        title: "Dashboard",
        to: "/dashboard",
        icon: DashboardIcon,
    },
    {
        label: "Reports",
        title: "Reports",
        to: "/dashboard/reports",
        icon: AssessmentIcon,
    },
    {
        label: "Users",
        title: "Users",
        to: "/dashboard/users",
        icon: PeopleIcon,
    },
    {
        label: "Articles",
        title: "Articles",
        to: "/dashboard/articles",
        icon: ArticleIcon,
    },
];

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up("sm")]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled("div")(({ theme }) => ({ 
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: '#0d9488',
    transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...(open && {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': {
            ...openedMixin(theme),
            backgroundColor: '#f8fafc',
            borderRight: '1px solid rgba(15, 23, 42, 0.08)',
            boxShadow: '4px 0 40px rgba(15, 23, 42, 0.06)',
        },
    }),
    ...(!open && {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': {
            ...closedMixin(theme),
            backgroundColor: '#f8fafc',
            borderRight: '1px solid rgba(15, 23, 42, 0.08)',
            boxShadow: '4px 0 24px rgba(15, 23, 42, 0.04)',
        },
    }),
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}));

const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(3),
        width: "auto",
    },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("md")]: {
            width: "20ch",
        },
    },
}));

const getPageTitle = (pathname) =>
    dashboardNavItems.find(({ to }) => to === pathname)?.title ?? "Welcome";

const allowedNavItemsForRole = (role) => {
    // editors cannot access UsersPage
    // viewers cannot access /dashboard
    if (!role) return [];
    const normalized = String(role).toLowerCase();

    if (normalized === 'editor') {
        return dashboardNavItems.filter(
            (item) => item.to === '/dashboard' || item.to === '/dashboard/reports' || item.to === '/dashboard/articles',
        );
    }

    if (normalized === 'viewer') {
        return [];
    }

    // admin (fallback) can see everything
    return dashboardNavItems;
};



const DashLayout = () => {
    const theme = useTheme();
    const [open, setOpen] = useState(true);
    const location = useLocation();
    const pageTitle = getPageTitle(location.pathname);
    const navigate = useNavigate();

    const role = localStorage.getItem('type');
    const visibleNavItems = allowedNavItemsForRole(role);

    useEffect(() => {
        const normalizedRole = String(role || '').toLowerCase();

        if (normalizedRole === 'viewer') {
            navigate('/', { replace: true });
            return;
        }

        if (normalizedRole === 'editor' && location.pathname === '/dashboard/users') {
            navigate('/dashboard', { replace: true });
        }
    }, [navigate, role, location.pathname]);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => { 
        setOpen(false);
    };
    
    const handleLogout = () => { 
        navigate("/");
    };
    
return (
        <>
            <Box sx={{ display: "flex", minHeight: '100vh', backgroundColor: '#eaf4f6', overflowX: 'hidden' }}>
                <CssBaseline />
                <AppBar position="fixed" open={open}>
                    <Toolbar sx={{ gap: 2 }}>
                        <IconButton
                            color="inherit"
                            aria-label={open ? "close drawer" : "open drawer"}
                            onClick={open ? handleDrawerClose : handleDrawerOpen}
                            edge="start"
                            sx={{ ml: 1 }}
                        >
                            {open ? <MenuOpenIcon /> : <MenuIcon />}
                        </IconButton>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                        >
                            {pageTitle}
                        </Typography>
                        <Box sx={{ flexGrow: 1 }} />
                        <Search>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Search…"
                                inputProps={{ "aria-label": "search" }}
                            />
                        </Search>
                        <Button
                            color="inherit"
                            variant="outlined"
                            onClick={handleLogout}
                            sx={{ borderColor: 'rgba(255,255,255,0.7)', color: '#fff' }}
                        >
                            Logout
                        </Button>
                    </Toolbar>
                </AppBar>
                {/* Drawer */}
                <Drawer variant="permanent" open={open}>
                    <DrawerHeader>
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === "rtl" ? (
                                <ChevronRightIcon />
                            ) : (
                                <ChevronLeftIcon />
                            )}
                        </IconButton>
                    </DrawerHeader>
                    <Divider sx={{ borderColor: 'rgba(15, 23, 42, 0.08)' }} />
                <Box sx={{ px: open ? 2 : 0, py: 2 }}>
                    {open && (
                        <Typography variant="subtitle1" sx={{ color: '#0f766e', fontWeight: 700, mb: 1 }}>
                            Insight Center
                        </Typography>
                    )}
                </Box>
                <List>
                    {visibleNavItems.map(({ label, to, icon: Icon }) => {

                        const selected = location.pathname === to;
                        return (
                            <ListItem key={to} disablePadding sx={{ display: 'block' }}>
                                <ListItemButton
                                    component={Link}
                                    to={to}
                                    selected={selected}
                                    sx={{
                                        minHeight: 56,
                                        justifyContent: open ? 'initial' : 'center',
                                        px: 2.5,
                                        mb: 1,
                                        borderRadius: '16px',
                                        backgroundColor: selected ? 'rgba(13,148,136,0.12)' : 'transparent',
                                        '&:hover': {
                                            backgroundColor: selected ? 'rgba(13,148,136,0.18)' : 'rgba(15, 23, 42, 0.04)',
                                        },
                                    }}
                                >
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: open ? 3 : 'auto',
                                            justifyContent: 'center',
                                            color: selected ? '#0d9488' : '#134e4a',
                                        }}
                                    >
                                        <Icon />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={label}
                                        sx={{ opacity: open ? 1 : 0, color: selected ? '#0d9488' : '#134e4a' }}
                                    />
                                </ListItemButton>
                            </ListItem>
                        );
                    })}
                </List>
                </Drawer>
                <Box component="main" sx={{ flexGrow: 1, p: 0, minWidth: 0, overflowX: 'hidden' }}>
                    <DrawerHeader />
                    {/* Content */}
                    <Outlet />
                </Box>
            </Box>
        </>
    );
};

export default DashLayout;