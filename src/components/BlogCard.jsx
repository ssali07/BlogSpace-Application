import { Heart } from 'lucide-react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toggleLike } from '../slices/blogSlice';

const BlogCard = ({ blog }) => {
     const { id, title, body } = blog;
     const dispatch = useDispatch();
     const { likedBlogs } = useSelector(state => state.blogs);
     const isLiked = likedBlogs[blog.id] || false;

     return (
          <div className="relative w-full rounded-lg overflow-hidden shadow-sm hover:-translate-y-1 duration-300 transition-all flex flex-col md:flex-row p-4 gap-5 bg-white">
               <div className="w-full md:w-[20rem] h-auto">
                    <img
                         src='/blog-img.jpg'
                         alt="blog-img"
                         className="w-full h-full object-cover rounded-lg"
                    />
               </div>

               <div className="flex-1 relative">
                    <button className={`absolute right-0 top-0 text-gray-400  cursor-pointer transition-colors hover:text-red-600 `}
                         onClick={() => dispatch(toggleLike({ id: blog.id }))}
                    >
                         <Heart className={`w-6 h-6 ${isLiked && "fill-red-600 text-red-600 duration-300 transition-colors"}`} />
                    </button>
                    <Link to={`/blog/${id}`}>
                         <h2 className="text-xl md:text-2xl max-w-[90%] font-bold capitalize hover:text-blue-600 pr-8">
                              {title}
                         </h2>
                    </Link>

                    <p className="mt-3 sm:mt-5 text-gray-600">{body}</p>
               </div>
          </div>
     );
};

export default BlogCard;
