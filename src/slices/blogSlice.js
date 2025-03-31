import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const getLikedBlogs = () => {
     const storedLikes = localStorage.getItem("likedBlogs");
     return storedLikes ? JSON.parse(storedLikes) : {};
};

const getStoredComments = () => {
     const storedComments = localStorage.getItem("blogComments");
     return storedComments ? JSON.parse(storedComments) : {};
};

const initialState = {
     blogs: [],
     blog: {},
     likedBlogs: getLikedBlogs(),
     comments: getStoredComments(),
     loading: false,
};

export const fetchBlogs = createAsyncThunk("blog/fetchBlogs", async ({ page }) => {
     const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${page}`);
     return await res.json();
});

export const fetchBlogsById = createAsyncThunk("blog/fetchBlogsById", async ({ id }) => {
     const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
     return await res.json();
})

const blogSlice = createSlice({
     name: "blog",
     initialState,
     reducers: {
          toggleLike: (state, action) => {
               const { id } = action.payload;
               state.likedBlogs[id] = !state.likedBlogs[id];
               localStorage.setItem("likedBlogs", JSON.stringify(state.likedBlogs));
          },
          toggleSave: (state, action) => {
               const { id } = action.payload;
               const blog = state.blogs.find(blog => blog.id === id);
               if (blog) {
                    blog.isSaved = !blog.isSaved;
               }
          },
          addComments: (state, action) => {
               const { id, comment } = action.payload;

               if (!state.comments[id]) {
                    state.comments[id] = [];
               }
               state.comments[id].push(comment);

               localStorage.setItem("blogComments", JSON.stringify(state.comments));

               if (state.blog.id === id) {
                    if (!state.blog.comments) state.blog.comments = [];
                    state.blog.comments.push(comment);
               }
               
               const blog = state.blogs.find(blog => blog.id === id);
               if (blog) {
                    if (!blog.comments) blog.comments = [];
                    blog.comments.push(comment);
               }
          }

     },
     extraReducers: (builder) => {
          builder.addCase(fetchBlogs.pending, (state) => {
               state.loading = true;
          });
          builder.addCase(fetchBlogs.fulfilled, (state, action) => {
               state.blogs = action.payload.map(blog => ({
                    ...blog,
                    isLiked: false,
                    comments: [],
               })),
                    state.loading = false
          });
          builder.addCase(fetchBlogsById.fulfilled, (state, action) => {
               state.blog = { ...action.payload, comments: state.blog.comments || [] };
          });
     },
});

export const { toggleLike, toggleSave, addComments } = blogSlice.actions;
export default blogSlice.reducer;
