import React, { useEffect, useState } from "react";
import { Table, Input, Select, Pagination,Tag } from "antd";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";

const { Search } = Input;
const { Option } = Select;

function PostsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    current: 1,
    limit: 10,
    total: 0,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [allTags, setAllTags] = useState([]);

  useEffect(() => {
    fetchData();
  }, [location]);

  useEffect(() => {
    const delaySearch = setTimeout(() => {
      fetchData();
    }, 500);
    return () => clearTimeout(delaySearch);
  }, [searchQuery, pagination.current, pagination.limit]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://dummyjson.com/posts/search?q=${searchQuery}&skip=${
          (pagination.current - 1) * pagination.limit
        }&limit=${pagination.limit}`
      );
      
      const { posts, total } = response.data;
      setPosts(posts);
      setPagination((prevPagination) => ({
        ...prevPagination,
        total,
      }));
      const tags = posts.reduce((acc, post) => {
        post.tags.forEach((tag) => {
          if (!acc.includes(tag)) {
            acc.push(tag);
          }
        });
        return acc;
      }, []);
      setAllTags(tags);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const handlePaginationChange = (page, limit) => {
    setPagination((prevPagination) => ({
      ...prevPagination,
      current: page,
      limit,
    }));
    navigate(`?page=${page}`);
  };

  const handleSearch = (value) => {
    setSearchQuery(value);
    setPagination((prevPagination) => ({
      ...prevPagination,
      current: 1,
    }));
    navigate(`?page=1&search=${value}`);
  };

  const handleTagChange = (value) => {
    setSelectedTags(value);
    setPagination((prevPagination) => ({
      ...prevPagination,
      current: 1,
    }));
    navigate(`?page=1&tags=${value.join(",")}`);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      width: "22%",
      className: "text-gray-600 font-semibold",
    },
    {
      title: "Body",
      dataIndex: "body",
      width: "60%",
    },
    
    {
      title: "Tags",
      dataIndex: "tags",
      key: "tags",
      responsive: ["lg"],
      render: (tags) => (
        <>
          {tags.map((tag) => (
            <Tag color="blue" key={tag}>{tag.toUpperCase()}</Tag>
          ))}
        </>
      ),
    },
  ];

  const filteredPosts = selectedTags.length
    ? posts.filter((post) =>
        selectedTags.every((tag) => post.tags.includes(tag))
      )
    : posts;

  return (
    <>
      <section className="bg-gray-100">
        <div className="p-4 md:p-14 mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-3xl font-bold text-gray-700 mb-4"
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
              placeholder="input search text"
              onSearch={handleSearch}
              enterButton
              onChange={(e) => setSearchQuery(e.target.value)}
              value={searchQuery}
              className="w-full md:w-auto mb-4 sm:mb-0 sm:mr-4 rounded-lg px-2 y-2 "
            />
            <Select
              mode="multiple"
              style={{ minWidth: 200 }}
              placeholder="Filter"
              onChange={handleTagChange}
              defaultValue={selectedTags}
              className="w-full sm:w-auto rounded-lg  px-2 py-2 focus:outline-none focus:border-blue-500"
            >
              {allTags.map((tag) => (
                <Option key={tag} value={tag}>
                  {tag}
                </Option>
              ))}
            </Select>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="table-container overflow-x-auto rounded-lg shadow-lg"
          >
            <Table
              dataSource={filteredPosts}
              columns={columns}
              loading={loading}
              pagination={false}
              style={{ width: "100%" }}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="flex justify-center mt-4"
          >
            <Pagination
              current={pagination.current}
              pageSize={pagination.pageSize}
              total={pagination.total}
              onChange={handlePaginationChange}
              className="text-blue-600"
            />
          </motion.div>
        </div>
      </section>
    </>
  );
}

export default PostsPage;
