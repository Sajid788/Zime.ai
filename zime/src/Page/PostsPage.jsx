import React from 'react'
import { Table, Input, Select, Pagination } from 'antd';

const { Search } = Input;

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
          <h1 className="text-3xl font-bold text-gray-600 mb-4">
          Discover Great Posts 
          </h1>
          <div className="flex flex-col sm:flex-row items-center justify-between mb-4">
            <Search
              placeholder="Search posts"
              className="w-full max-w-md mb-4 sm:mb-0 sm:mr-4 rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:border-blue-500"
            />
            <Table columns={columns} />
          </div>
        </div>
      </section>
    </>
  );
}

export default PostsPage
