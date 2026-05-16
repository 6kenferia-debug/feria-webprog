import { useEffect, useMemo, useState } from 'react';
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
import SearchIcon from '@mui/icons-material/Search';
import { DataGrid } from '@mui/x-data-grid';
import { getArticles, upsertArticles, patchArticle, createArticle, updateArticle } from '../../services/ArticleService';
import articlesSeed from '../../data/article-content.js';

const blankForm = {

  slug: '',
  title: '',
  content: '',
  isFeatured: false,
  isActive: true,
};

const seed = {
  articles: articlesSeed.map((article, index) => ({
    // local UI needs an id for DataGrid keys; backend uses Mongo _id but exposes articles array
    id: Number(article.id ?? index + 1),
    slug: article.slug || article.name || `article-${index + 1}`,
    title: article.title || `Article ${index + 1}`,
    content: Array.isArray(article.content) ? article.content.join('\n\n') : String(article.content || ''),
    isFeatured: typeof article.isFeatured === 'boolean' ? article.isFeatured : false,
    isActive: typeof article.isActive === 'boolean' ? article.isActive : true,
  })),
  error: '',
};

const DashArticleListPage = () => {
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

  const [articles, setArticles] = useState([]);
  const [modal, setModal] = useState({ open: false, id: null });
  const [form, setForm] = useState(blankForm);
  const [errors, setErrors] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  // Load from backend; if empty, seed it.
  useEffect(() => {

    (async () => {
      try {
        const res = await getArticles();
        const list = res?.articles ?? [];
        if (list.length === 0) {
          // seed backend once (id is not stored in backend; we add temporary ids for UI)
          await upsertArticles(seed.articles.map((a) => ({ ...a, id: undefined })));
          const seeded = await getArticles();
          setArticles((seeded?.articles ?? []).map((a, idx) => ({ ...a, id: idx + 1 })));
        } else {
          setArticles(list.map((a, idx) => ({ ...a, id: idx + 1 })));
        }
      } catch (e) {
        console.error(e);
        setArticles(seed.articles);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredRows = useMemo(() => {
    return articles.filter((row) => {
      const matchesSearch = [row.slug, row.title].some((field) =>
        String(field ?? '').toLowerCase().includes(searchTerm.toLowerCase())
      );

      const matchesStatus = statusFilter
        ? statusFilter === 'active'
          ? row.isActive === true
          : row.isActive === false
        : true;

      return matchesSearch && matchesStatus;
    });
  }, [articles, searchTerm, statusFilter]);

  const resetForm = () => {
    setForm({ ...blankForm });
    setErrors({});
  };

  const openModal = (article) => {
    setModal({ open: true, id: article?.id ?? null });
    setForm(article ? { ...blankForm, ...article } : { ...blankForm });
    setErrors({});
  };

  const closeModal = () => {
    setModal({ open: false, id: null });
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
    const slug = String(form.slug ?? '').trim();
    const title = String(form.title ?? '').trim();
    const content = String(form.content ?? '').trim();
    const slugPattern = /^[a-z0-9-]+$/;

    if (!slug) nextErrors.slug = 'Article link subdirectory is required.';
    else if (!slugPattern.test(slug)) nextErrors.slug = 'Use lowercase letters, numbers, and hyphen only.';
    else if (articles.some((article) => article.id !== modal.id && article.slug === slug)) {
      nextErrors.slug = 'This article link already exists.';
    }

    if (!title) nextErrors.title = 'Article title is required.';
    if (!content) nextErrors.content = 'Article content is required.';

    return nextErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = validate();
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }

    const payload = {
      slug: form.slug.trim(),
      title: form.title.trim(),
      content: String(form.content).trim(),
      isFeatured: !!form.isFeatured,
      isActive: !!form.isActive,
      image: form.image,
    };

    try {
      if (modal.id != null) {
        const target = articles.find((a) => a.id === modal.id);
        // backend identifies by _id, but UI has only temp id.
        // we stored backend _id in `article._id`.
        const backendId = target?._id;
        if (backendId) {
          await updateArticle(backendId, payload);
        } else {
          // fallback
          await upsertArticles([{ ...payload }]);
        }
      } else {
        await createArticle(payload);
      }

      const res = await getArticles();
      const list = res?.articles ?? [];
      setArticles(list.map((a, idx) => ({ ...a, id: idx + 1 })));
    } catch (e) {
      console.error(e);
      // keep local draft visible
      setArticles((prev) =>
        prev.map((a) => (a.id === modal.id ? { ...a, ...payload } : a))
      );
    }

    closeModal();
  };

  const toggleStatus = async (id) => {
    // optimistic
    const target = articles.find((a) => a.id === id);
    if (!target) return;

    const nextIsActive = !target.isActive;
    setArticles((prev) => prev.map((a) => (a.id === id ? { ...a, isActive: nextIsActive } : a)));

    try {
      if (target._id) {
        await patchArticle(target._id, { isActive: nextIsActive });
      } else {
        await upsertArticles([{ ...target, isActive: nextIsActive }]);
      }

      const res = await getArticles();
      const list = res?.articles ?? [];
      setArticles(list.map((a, idx) => ({ ...a, id: idx + 1 })));
    } catch (e) {
      console.error(e);
      // rollback
      setArticles((prev) => prev.map((a) => (a.id === id ? { ...a, isActive: !nextIsActive } : a)));
    }
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'slug', headerName: 'Link Subdirectory', flex: 1, minWidth: 180 },
    { field: 'title', headerName: 'Article Title', flex: 1.5, minWidth: 220 },
    {
      field: 'featured',
      headerName: 'Featured',
      minWidth: 130,
      sortable: false,
      renderCell: ({ row }) => (
        <Chip
          size="small"
          label={row.isFeatured ? 'Yes' : 'No'}
          color={row.isFeatured ? 'success' : 'default'}
          variant={row.isFeatured ? 'filled' : 'outlined'}
        />
      ),
    },
    {
      field: 'status',
      headerName: 'Status',
      minWidth: 130,
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
            {row.isActive ? 'Hide' : 'Show'}
          </Button>
        </Stack>
      ),
    },
  ];

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
          Article Management
        </Typography>

        <Grid container spacing={3} sx={{ mb: 4, justifyContent: 'center' }}>
          <Grid item xs={6} sm={3}>
            <Card sx={{ ...summaryCardStyle, minWidth: 180, maxWidth: 180 }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="subtitle2" sx={{ color: tealTheme.textSecondary, fontWeight: 700, mb: 1 }}>
                  Total Articles
                </Typography>
                <Typography variant="h3" sx={{ color: tealTheme.primaryDark, fontWeight: 800 }}>
                  {articles.length}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Card sx={{ ...summaryCardStyle, minWidth: 180, maxWidth: 180 }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="subtitle2" sx={{ color: tealTheme.textSecondary, fontWeight: 700, mb: 1 }}>
                  Featured Articles
                </Typography>
                <Typography variant="h3" sx={{ color: tealTheme.primaryDark, fontWeight: 800 }}>
                  {articles.filter((row) => row.isFeatured).length}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Card sx={{ ...summaryCardStyle, minWidth: 180, maxWidth: 180 }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="subtitle2" sx={{ color: tealTheme.textSecondary, fontWeight: 700, mb: 1 }}>
                  Active Articles
                </Typography>
                <Typography variant="h3" sx={{ color: tealTheme.primaryDark, fontWeight: 800 }}>
                  {articles.filter((row) => row.isActive).length}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Card sx={{ ...summaryCardStyle, minWidth: 180, maxWidth: 180 }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="subtitle2" sx={{ color: tealTheme.textSecondary, fontWeight: 700, mb: 1 }}>
                  Inactive Articles
                </Typography>
                <Typography variant="h3" sx={{ color: tealTheme.primaryDark, fontWeight: 800 }}>
                  {articles.filter((row) => !row.isActive).length}
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
              Article Directory
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
              Add Article
            </Button>
          </Box>

          <Box sx={{ display: 'flex', gap: 2, alignItems: 'stretch', flexWrap: 'wrap', mb: 2 }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search by slug or title..."
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
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: tealTheme.textSecondary }} />
                    </InputAdornment>
                  ),
                },
              }}
            />
            <TextField
              select
              label="Status"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              sx={{
                flex: '1 1 160px',
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

          <Paper sx={{ p: { xs: 1.5, sm: 2 }, minWidth: 0, overflow: 'hidden' }}>
            {articles.length ? (
              <Box sx={{ height: { xs: 500, sm: 560 }, width: '100%', minWidth: 0 }}>
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
              <Alert severity="info">No articles found. Use Add Article to create a record.</Alert>
            )}
          </Paper>
        </Box>

        <Dialog open={modal.open} onClose={closeModal} fullWidth fullScreen={isMobile} maxWidth="md">
          <Box component="form" onSubmit={handleSubmit}>
            <DialogTitle>{modal.id ? 'Edit Article' : 'Add Article'}</DialogTitle>
            <DialogContent dividers sx={{ px: { xs: 2, sm: 3 } }}>
              <Stack spacing={2} sx={{ pt: 1 }}>
                <TextField {...fieldProps('slug', 'Article link subdirectory')} />
                <TextField {...fieldProps('title', 'Article Title')} />
                <TextField
                  {...fieldProps('content', 'Content', {
                    multiline: true,
                    rows: 6,
                  })}
                />
                <Typography variant="caption" sx={{ color: 'rgba(15, 23, 42, 0.7)', px: 0.5 }}>
                  Separate paragraphs with a blank line.
                </Typography>
                <FormControlLabel
                  control={
                    <Switch
                      name="isFeatured"
                      checked={!!form.isFeatured}
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
                  label={form.isFeatured ? 'Featured Article: Yes' : 'Featured Article: No'}
                />
                <FormControlLabel
                  control={
                    <Switch
                      name="isActive"
                      checked={!!form.isActive}
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
                  label={form.isActive ? 'Article Status: Active' : 'Article Status: Inactive'}
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
                {modal.id ? 'Update Article' : 'Save Article'}
              </Button>
            </DialogActions>
          </Box>
        </Dialog>
      </Box>
    </Box>
  );
};

export default DashArticleListPage;

