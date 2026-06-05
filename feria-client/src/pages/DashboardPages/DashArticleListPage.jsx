import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Modal,
  TextField,
  Stack,
  IconButton,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { fetchArticlesAdmin, createArticle, updateArticle, deleteArticle } from "../../services/ArticleService";

// Convert a title string into a URL-safe slug
const slugify = (str) =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  maxHeight: '90vh',
  overflowY: 'auto'
};

const DashArticleListPage = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editArticleId, setEditArticleId] = useState(null);
  const [nameManuallyEdited, setNameManuallyEdited] = useState(false);
  const [formError, setFormError] = useState('');
  
  const [newArticle, setNewArticle] = useState({
    name: "",
    title: "",
    imageUrl: "",
    content: "",
    isHidden: false,
  });

  const loadArticles = async () => {
    setLoading(true);
    try {
      const response = await fetchArticlesAdmin();
      const fetchedData = response.data?.data || [];
      setArticles(fetchedData);
    } catch (error) {
      console.error("Error fetching articles:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadArticles();
  }, []);

  const handleOpen = () => {
    setNewArticle({ name: "", title: "", imageUrl: "", content: "", isHidden: false });
    setIsEditing(false);
    setNameManuallyEdited(false);
    setFormError('');
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setIsEditing(false);
    setEditArticleId(null);
    setNameManuallyEdited(false);
    setFormError('');
  };

  const handleEdit = (article) => {
    const contentString = Array.isArray(article.content) 
      ? article.content.join('\n\n') 
      : article.content;

    setNewArticle({ 
      name: article.name, 
      title: article.title, 
      imageUrl: article.imageUrl, 
      content: contentString,
      isHidden: article.isHidden || false
    });
    setEditArticleId(article._id);
    setIsEditing(true);
    setNameManuallyEdited(true); // Preserve existing name on edit
    setFormError('');
    setOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this article?")) {
      try {
        await deleteArticle(id);
        loadArticles();
      } catch (error) {
        console.error("Error deleting article:", error);
      }
    }
  };

  const handleSaveArticle = async () => {
    setFormError('');

    // Client-side duplicate check
    const isDuplicate = articles.some(
      (a) => a.name === newArticle.name && a._id !== editArticleId
    );
    if (isDuplicate) {
      setFormError(`The URL name "${newArticle.name}" is already used by another article. Please choose a different one.`);
      return;
    }

    try {
      const payload = {
        name: newArticle.name,
        title: newArticle.title,
        imageUrl: newArticle.imageUrl,
        content: newArticle.content,
        isHidden: newArticle.isHidden
      };

      if (isEditing) {
        await updateArticle(editArticleId, payload);
      } else {
        await createArticle(payload);
      }
      await loadArticles();
      handleClose();
    } catch (error) {
      console.error("Error saving article:", error);
      const errorMsg = error.response?.data?.message || "Check if URL Name is unique and all fields are filled.";
      alert("Failed to save article: " + errorMsg);
    }
  };

  const columns = [
    { field: "title", headerName: "Title", flex: 1.5 },
    { field: "name", headerName: "URL Name", flex: 1 },
    { 
      field: "content", 
      headerName: "Paragraphs", 
      flex: 0.5, 
      valueGetter: (value, row) => (row?.content ? row.content.length : 0)
    },
    {
      field: "isHidden",
      headerName: "Status",
      flex: 0.8,
      renderCell: (params) => {
        const isHidden = params.value;
        return (
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              px: 1.5,
              py: 0.5,
              borderRadius: 1,
              fontSize: '0.75rem',
              fontWeight: 'bold',
              bgcolor: isHidden ? '#ffebee' : '#e8f5e9',
              color: isHidden ? '#c62828' : '#2e7d32',
              border: `1px solid ${isHidden ? '#ffcdd2' : '#c8e6c9'}`,
            }}
          >
            {isHidden ? "Hidden" : "Visible"}
          </Box>
        );
      }
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <Stack 
            direction="row" 
            spacing={1} 
            sx={{ height: '100%', alignItems: "center" }}
        >
          <IconButton onClick={() => handleEdit(params.row)} color="primary" size="small">
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => handleDelete(params.row._id)} color="error" size="small">
            <DeleteIcon />
          </IconButton>
        </Stack>
      ),
    },
  ];

  return (
    <Box>
      <Stack 
        direction="row" 
        sx={{ justifyContent: "space-between", alignItems: "center", mb: 3 }}
      >
        <Typography variant="h4" fontWeight="bold">Manage Articles</Typography>
        <Button variant="contained" color="primary" onClick={handleOpen}>
          Add Article
        </Button>
      </Stack>

      <Box sx={{ height: 500, width: "100%", bgcolor: 'background.paper', borderRadius: 1, boxShadow: 1 }}>
        <DataGrid
          rows={articles}
          columns={columns}
          getRowId={(row) => row._id || `temp-${Math.random()}`}
          loading={loading}
          initialState={{
            pagination: { paginationModel: { pageSize: 10 } },
          }}
          pageSizeOptions={[10, 25]}
          disableRowSelectionOnClick
        />
      </Box>

      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          <Typography variant="h6" mb={3} fontWeight="bold">
            {isEditing ? "Edit Article" : "Create New Article"}
          </Typography>
          
          <Stack spacing={2.5}>
            {formError && (
              <Box sx={{ p: 1.5, bgcolor: '#fff3f3', border: '1px solid #f44336', borderRadius: 1 }}>
                <Typography variant="body2" color="error">{formError}</Typography>
              </Box>
            )}
            <TextField
              label="Article Title"
              fullWidth
              value={newArticle.title}
              onChange={(e) => {
                const newTitle = e.target.value;
                setNewArticle((prev) => ({
                  ...prev,
                  title: newTitle,
                  // Auto-generate name from title unless the user manually edited it
                  name: nameManuallyEdited ? prev.name : slugify(newTitle),
                }));
              }}
            />
            <TextField
              label="URL Name (auto-generated from title)"
              placeholder="e.g. my-article-title"
              fullWidth
              value={newArticle.name}
              helperText="This is used as the article's URL. Auto-generated from the title, but you can change it."
              onChange={(e) => {
                setNameManuallyEdited(true);
                setNewArticle({ ...newArticle, name: slugify(e.target.value) });
              }}
            />
            <TextField
              label="Image URL"
              fullWidth
              value={newArticle.imageUrl}
              onChange={(e) => setNewArticle({ ...newArticle, imageUrl: e.target.value })}
            />
            <TextField
              label="Content"
              helperText="Press Enter to create new paragraphs."
              fullWidth
              multiline
              rows={8}
              value={newArticle.content}
              onChange={(e) => setNewArticle({ ...newArticle, content: e.target.value })}
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={newArticle.isHidden || false}
                  onChange={(e) => setNewArticle({ ...newArticle, isHidden: e.target.checked })}
                  color="primary"
                />
              }
              label="Hide this article (do not display on public site)"
            />
            
            <Stack direction="row" spacing={2} sx={{ justifyContent: "flex-end", pt: 2 }}>
              <Button onClick={handleClose} color="inherit">Cancel</Button>
              <Button 
                variant="contained" 
                size="large" 
                onClick={handleSaveArticle}
                disabled={!newArticle.title || !newArticle.name}
              >
                {isEditing ? "Save Changes" : "Publish Article"}
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Modal>
    </Box>
  );
};

export default DashArticleListPage;
