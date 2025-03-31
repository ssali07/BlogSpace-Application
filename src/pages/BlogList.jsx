import { Loader2, Search } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import BlogCard from '../components/BlogCard';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBlogs } from '../slices/blogSlice';

const Home = () => {
     const dispatch = useDispatch();
     const { loading } = useSelector(state => state.blogs);

     const [page, setPage] = useState(1);
     const [localBlogs, setLocalBlogs] = useState([]);
     const [searchValue, setSearchValue] = useState('');

     useEffect(() => {
          dispatch(fetchBlogs(page)).then((res) => {
               setLocalBlogs(prev => [
                    ...prev,
                    ...res.payload.map(blog => ({
                         ...blog,
                         isLiked: blog.isLiked ?? false,
                         isSaved: blog.isSaved ?? false,
                         comments: blog.comments ?? []
                    }))
               ]);
          });
     }, [dispatch, page]);

     const handleLoadMore = () => {
          setPage(prev => prev + 1);
     };

     const filteredBlogs = searchValue.trim()
          ? localBlogs.filter(blog => blog.title.toLowerCase().includes(searchValue.toLowerCase()))
          : localBlogs;

     return (
          <main className="flex-1 container mx-auto sm:py-8">
               <div className="max-w-3xl mx-auto mb-12">
                    <h1 className="text-3xl sm:text-4xl font-bold text-center mb-6">Discover Interesting Articles</h1>
                    <div className="relative">
                         <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                         <input
                              type="search"
                              placeholder="Search for articles..."
                              className="pl-10 w-full py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              value={searchValue}
                              onChange={(e) => setSearchValue(e.target.value)}
                         />
                    </div>
               </div>

               <div className='max-w-5xl mx-auto space-y-5'>
                    {filteredBlogs.length > 0 ? (
                         filteredBlogs.map((blog, i) => <BlogCard key={i} blog={blog} setLocalBlogs={setLocalBlogs} />)
                    ) : (
                         <p className="text-center text-gray-600">No results found.</p>
                    )}
               </div>

               {!searchValue && (
                    <div className="flex justify-center mt-12">
                         <button
                              className="px-6 py-3 border border-gray-300 rounded-md font-medium hover:bg-gray-50 transition-colors"
                              onClick={handleLoadMore}
                              disabled={loading}
                         >
                              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Load More Articles"}
                         </button>
                    </div>
               )}
          </main>
     );
};

export default Home;
