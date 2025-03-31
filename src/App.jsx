import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import BlogList from './pages/BlogList';
import Blog from './pages/Blog';
import Layout from './components/Layout';
import { useDispatch } from 'react-redux';
import { fetchBlogs } from './slices/blogSlice';


const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<BlogList />} />
        <Route path="blog/:id" element={<Blog />} />
      </Route>
    </Routes>
  );
};

export default App;
