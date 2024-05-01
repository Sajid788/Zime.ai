import React from 'react'
import { Table } from 'antd';


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
      
    },
  ];

function PostsPage() {
  return (
    <>
       <Table columns={columns} />
    </>
  );
}

export default PostsPage
