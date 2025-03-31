import { ArrowLeft, Clock, Heart } from 'lucide-react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import BlogComments from '../components/BlogComments';
import { fetchBlogsById } from '../slices/blogSlice';

const Blog = () => {
     const { id } = useParams();
     const dispatch = useDispatch();
     const { blog } = useSelector(state => state.blogs);
     const isLiked = useSelector(state => state.blogs.likedBlogs[id] || false);


     useEffect(() => {
          dispatch(fetchBlogsById({ id }));
     }, [dispatch, id]);

     return (
          <main className="flex-1 container mx-auto px-4">
               <Link to="/" className="inline-flex items-center transition-colors mb-6">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to all articles
               </Link>

               <article className="max-w-3xl mx-auto">
                    <div className="mb-8">
                         <h1 className="text-3xl md:text-4xl font-bold mt-4 mb-6 capitalize">{blog.title}</h1>
                         <div className="flex items-center">
                              <Heart className={`w-6 h-6 ${isLiked ? "fill-red-600 text-red-600 duration-300 transition-colors" : "text-gray-400 fill-gray-400"}`} />
                              {isLiked ? <span className="ml-2 text-red-600 font-semibold">Liked</span> : <span className="ml-2 text-gray-600 font-semibold">Like</span>}
                         </div>
                    </div>

                    <div className="relative w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] xl:h-[450px] mb-8 rounded-lg overflow-hidden">
                         <img
                              src={'/blog-img.jpg'}
                              alt="Blog Image"
                              className="w-full h-full object-cover rounded-lg"
                         />
                    </div>

                    <div className="prose max-w-none">
                         <p className="mb-4">
                              {blog.body}
                         </p>
                    </div>
               </article>

               <BlogComments blog={blog} />
          </main>
     );
};

export default Blog;
