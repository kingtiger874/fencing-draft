import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Clock, User } from 'lucide-react';

const blogPosts = [
  {
    id: 1,
    title: 'How to Choose the Right Fence Material',
    excerpt: 'A comprehensive guide to selecting the perfect fence material for your property...',
    author: 'John Smith',
    date: 'March 15, 2024',
    imageUrl: 'https://plus.unsplash.com/premium_photo-1675630925589-5023afed40d1?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    id: 2,
    title: 'Maintenance Tips for Your Wooden Fence',
    excerpt: 'Learn how to keep your wooden fence looking beautiful and lasting longer with these maintenance tips...',
    author: 'Sarah Johnson',
    date: 'March 10, 2024',
    imageUrl: 'https://plus.unsplash.com/premium_photo-1667870036406-631ee715b494?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  }
];

const faqs = [
  {
    question: 'How long does fence installation take?',
    answer: 'The duration of fence installation varies depending on the size and complexity of the project. Most residential fence installations can be completed within 1-3 days.'
  },
  {
    question: 'Do I need a permit to install a fence?',
    answer: 'In most areas, you will need a permit to install a fence. We can help you navigate the permit process and ensure all requirements are met.'
  },
  {
    question: 'What type of fence is best for privacy?',
    answer: 'Privacy fences are typically 6-8 feet tall and can be made from wood, vinyl, or composite materials. Wood and vinyl privacy fences are the most popular choices.'
  },
  {
    question: 'How long will my fence last?',
    answer: 'The lifespan of your fence depends on the material: wood fences typically last 15-20 years, vinyl 20-30 years, and metal fences 30+ years with proper maintenance.'
  }
];

function BlogPost({ post }: { post: typeof blogPosts[0] }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg shadow-lg overflow-hidden"
    >
      <div
        className="h-48 w-full bg-cover bg-center"
        style={{ backgroundImage: `url(${post.imageUrl})` }}
      />
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{post.title}</h3>
        <p className="text-gray-600 mb-4">{post.excerpt}</p>
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center">
            <User className="h-4 w-4 mr-1" />
            {post.author}
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            {post.date}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function FAQ({ question, answer, index }: { question: string; answer: string; index: number }) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="border-b border-gray-200 last:border-0"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-4 flex items-center justify-between text-left"
      >
        <span className="font-semibold">{question}</span>
        <ChevronRight
          className={`h-5 w-5 text-gray-500 transition-transform ${
            isOpen ? 'transform rotate-90' : ''
          }`}
        />
      </button>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="pb-4 text-gray-600"
        >
          {answer}
        </motion.div>
      )}
    </motion.div>
  );
}

export default function Blog() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-12"
            >
              <h2 className="text-4xl font-bold mb-4">Latest Articles</h2>
              <p className="text-xl text-gray-600">
                Stay up to date with the latest trends and tips in fence installation and maintenance
              </p>
            </motion.div>

            <div className="space-y-8">
              {blogPosts.map((post) => (
                <BlogPost key={post.id} post={post} />
              ))}
            </div>
          </div>

          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-12"
            >
              <h2 className="text-4xl font-bold mb-4">FAQ</h2>
              <p className="text-xl text-gray-600">
                Find answers to commonly asked questions about our fence installation services
              </p>
            </motion.div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              {faqs.map((faq, index) => (
                <FAQ key={index} {...faq} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}