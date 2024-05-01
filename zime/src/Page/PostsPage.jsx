import React from 'react'
import { Table, Input, Select, Pagination } from 'antd';
import { motion } from "framer-motion";

const { Search } = Input;
const { Option } = Select;

function PostsPage() {
    const columns = [
        {
          title: "Title",
          dataIndex: "title",
          key: "title",
          className: "text-sky-600 font-semibold",
        },
        {
          title: "Body",
          dataIndex: "body",
          key: "body",
          className: "text-gray-700",
        },
        {
          title: "Tags",
          dataIndex: "tags",
          key: "tags",
          render: (tags) => (
            <span className="text-gray-600 capitalize">{tags.join(", ")}</span>
          ),
        },
      ];
    
  return (
    <>
     <section className="bg-gray-100">
        <div className="container mx-auto p-4 sm:p-8">
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-3xl font-bold text-gray-600 mb-4"
          >
            Discover Great Posts
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-between mb-4"
          >
            <Search
              placeholder="Search posts"
              className="w-full max-w-md mb-4 sm:mb-0 sm:mr-4 rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:border-blue-500"
            />
            <Select
              mode="multiple"
              style={{ minWidth: 200 }}
              placeholder="Select tags"
              className="w-full sm:w-auto rounded-lg border border-gray-300 px-2 py-2 focus:outline-none focus:border-blue-500"
            >
            </Select>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="table-container overflow-x-auto rounded-lg shadow-lg"
          >
            <Table
              columns={columns}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="flex justify-center mt-4"
          >
            <Pagination
              className="text-blue-600"
            />
          </motion.div>
        </div>
      </section>
    </>
  );
}

export default PostsPage
