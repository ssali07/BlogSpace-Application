import { User } from 'lucide-react';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { addComments } from '../slices/blogSlice';
import { formatDistanceToNow } from 'date-fns';

const BlogComments = ({ blog }) => {
     const dispatch = useDispatch();
     const [newComment, setNewComment] = useState('');
     const [isSubmitting, setIsSubmitting] = useState(false);
     const { comments } = useSelector(state => state.blogs);
     const blogComments = comments[blog.id] || [];

     const handleSubmitComment = () => {
          if (!newComment.trim()) {
               toast.error("Comment cannot be empty");
               return;
          }

          setIsSubmitting(true);

          setTimeout(() => {
               const comment = {
                    id: Date.now(),
                    name: "John Doe",
                    date: new Date().toISOString(),
                    content: newComment
               };

               dispatch(addComments({ id: parseInt(blog.id), comment }));
               setNewComment('');
               setIsSubmitting(false);
               toast.success("Your comment has been added");
          }, 1000);
     };
     return (
          <section className="max-w-3xl mx-auto pt-5">
               <h2 className="text-2xl font-bold mb-6">Comments ({blogComments?.length || 0})</h2>
               {blogComments?.length > 0 ? (
                    blogComments.map((comment) => (
                         <div key={comment.id} className="border border-gray-300 rounded-lg overflow-hidden shadow-sm mb-4">
                              <div className="p-4 border-b border-gray-300 bg-gray-50">
                                   <div className="flex items-center gap-4">
                                        <div className="relative w-9 h-9 rounded-full border  flex justify-center items-center overflow-hidden">
                                             <User />
                                        </div>
                                        <div>
                                             <h3 className="text-base font-semibold">{comment.name}</h3>
                                             <p className="text-xs text-gray-500">{formatDistanceToNow(comment.date)}</p>
                                        </div>
                                   </div>
                              </div>
                              <div className="p-4 bg-white">
                                   <p className="text-gray-700">{comment.content}</p>
                              </div>
                         </div>
                    ))
               ) : (
                    <p className="text-gray-500">No comments yet. Be the first to comment!</p>
               )}

               <div className="mt-6">
                    <h2 className="text-2xl font-bold mb-6">Leave a Comment</h2>
                    <textarea
                         className="w-full min-h-[120px] border border-gray-300 rounded-md p-4 focus:outline-none focus:border-blue-500"
                         placeholder="Leave a comment..."
                         value={newComment}
                         onChange={(e) => setNewComment(e.target.value)}
                    />
                    <button
                         onClick={handleSubmitComment}
                         disabled={isSubmitting}
                         className="mt-2 px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors cursor-pointer"
                    >
                         {isSubmitting ? "Submitting..." : "Post Comment"}
                    </button>
               </div>
          </section>
     )
}

export default BlogComments