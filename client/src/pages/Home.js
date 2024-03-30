
import React, { useState, useEffect } from "react";
import { DatePicker, Form, Input, message, Modal, Select, Table } from "antd";
import {UnorderedListOutlined,FieldTimeOutlined, EditOutlined,
  DeleteOutlined,LineChartOutlined} from "@ant-design/icons";
import axios from "axios";
import Spinner from "./../components/Spinner";
import Layout from "./../components/layouts/layout";
import moment from "moment";
import Analytics from "../components/Analytics";
// import Budget from "../components/Budget";
import Graph from "../components/Graph";
import BudgetSetting from "../components/BudgetSetting";

// import { text } from "express";

const { RangePicker } = DatePicker;

const HomePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allTransaction, setAllTransaction] = useState([]);
  const [frequency, setFrequency] = useState('7');
  const [selectedDate, setSelectDate] = useState([]);
  const [type, setType] = useState("all");
  const [viewData, setViewData] = useState("table");
  const [editable, setEditable] = useState(null);
  const [showBudgetModal, setShowBudgetModal] = useState(false);


  //table data
  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      render: (text) => <span>{moment(text).format("YYYY-MM-DD")}</span>
    },
    {
      title: "Amount",
      dataIndex: "amount",
    },
    {
      title: "Type",
      dataIndex: "type",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Reference",
      dataIndex: "reference",
    },
    {
      title: "Actions",
      render: (text, record) => (
        <div>
          <EditOutlined
            onClick={() => {
              setEditable(record);
              setShowModal(true);
            }}
          />
          <DeleteOutlined
            className="mx-2"
            onClick={() => {
              handleDelete(record);
            }}
          />
        </div>
      ),
    },
  ];

  //getall transactions
  //useEffect Hook
  useEffect(() => {
    const getAllTransactions = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        setLoading(true);
        const res = await axios.post("/api/v1/transactions/get-transaction", {
          userid: user._id,
          frequency,
          selectedDate,
          type,
        });
        setAllTransaction(res.data);
        setLoading(false);
        
      } catch (error) {
        message.error("Fetching Issue With Transaction");
      }
    };
    getAllTransactions();
  }, [frequency, selectedDate, type, setAllTransaction]);

   //delete handler
   const handleDelete = async (record) => {
    try {
      setLoading(true);
      await axios.post("/api/v1/transactions/delete-transaction", {
        transacationId: record._id,
      });
      setLoading(false);
      message.success("Transaction Deleted!");
      fetchTransactions();
    } catch (error) {
      setLoading(false);
      console.log(error);
      message.error("unable to delete");
    }
  };
  const fetchTransactions = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      setLoading(true);
      const res = await axios.post("/api/v1/transactions/get-transaction", {
        userid: user._id,
        frequency,
        selectedDate,
        type,
      });
      setAllTransaction(res.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      message.error("Error fetching transactions.");
    }
  };
  useEffect(() => {
    fetchTransactions();
    // eslint-disable-next-line
  }, [frequency, selectedDate, type]);


  // form handling
  const handleSubmit = async (values) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      setLoading(true);
      if (editable) {
        await axios.post("/api/v1/transactions/edit-transaction", {
          payload: {
            ...values,
            userId: user._id,
          },
          transacationId: editable._id,
        });
        setLoading(false);
        message.success("Transaction Updated Successfully");
        fetchTransactions();
      } else {
        await axios.post("/api/v1/transactions/add-transaction", {
          ...values,
          userid: user._id,
        });
        setLoading(false);
        message.success("Transaction Added Successfully");
      }
      fetchTransactions();
      setShowModal(false);
      setEditable(null);
    } catch (error) {
      setLoading(false);
      message.error("Please fill the feild");
    }
  };

  return (
    
    <Layout>
      
      {loading && <Spinner />}
      <BudgetSetting visible={showBudgetModal}
      onCancel={() => setShowBudgetModal(false)} 
      allTransaction={allTransaction} />
      <div className="filters">

        <div>
          <h6>Select Frequency</h6>

          <Select value={frequency} onChange={(values) => setFrequency(values)}>
            <Select.Option value="7">LAST 1 Week</Select.Option>
            <Select.Option value="30">LAST 1 Month</Select.Option>
            <Select.Option value="365">LAST 1 year</Select.Option>
            <Select.Option value="custom">custom</Select.Option>
          </Select>

          {frequency === "custom" && (
            <RangePicker
              value={selectedDate}
              onChange={(values) => setSelectDate(values)}
            />
          )}

        </div>
        <div>
          <h6>Select Type</h6>
          <Select value={type} onChange={(values) => setType(values)}>
            <Select.Option value="all">ALL</Select.Option>
            <Select.Option value="income">INCOME</Select.Option>
            <Select.Option value="expense">EXPENSE</Select.Option>
          </Select>
        </div>
        <div className="switch-icons">
          <UnorderedListOutlined
            className={`mx-2 ${
              viewData === "table" ? "active-icon" : "inactive-icon"
            }`}
            onClick={() => setViewData("table")}
          />
          <FieldTimeOutlined
            className={`mx-2 ${
              viewData === "analytics" ? "active-icon" : "inactive-icon"
            }`}
            onClick={() => setViewData("analytics")}
          />
           <LineChartOutlined
            className={`mx-2 ${
              viewData === "Graph" ? "active-icon" : "inactive-icon"
            }`}
            onClick={() => setViewData("Graph")}
          />
        
        </div>
        <div>
          <button
            className="btn btn-primary"
            onClick={() => setShowBudgetModal(true)}
          >
            Set Budget
          </button>
        </div>
        <div>
          <button
            className="btn btn-primary"
            onClick={() => setShowModal(true)}
          >
            Add New
          </button>
        </div>
      </div>
      <div className="content">
  {viewData === 'table' ? 
    <Table columns={columns} dataSource={allTransaction}/>
  : viewData === 'analytics' ?
    <Analytics allTransaction={allTransaction}/>
  :
    <Graph allTransaction={allTransaction}/> 
  }
</div>
      <Modal
        title={editable ? "Edit Transaction" : "Add Transection"}
        open={showModal}
        onCancel={() => setShowModal(false)}
        footer={false}
      >
        <Form layout="vertical" onFinish={handleSubmit} initialValues={editable}>
          <Form.Item label="Amount" name="amount">
            <Input type="text" required/>
          </Form.Item>
          <Form.Item label="type" name="type">
            <Select>
              <Select.Option value="income">Income</Select.Option>
              <Select.Option value="expense">Expense</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Category" name="category">
            <Select>
              <Select.Option value="salary">Salary</Select.Option>
              <Select.Option value="tip">Tip</Select.Option>
              <Select.Option value="project">Project</Select.Option>
              <Select.Option value="food">Food</Select.Option>
              <Select.Option value="movie">Movie</Select.Option>
              <Select.Option value="bills">Bills</Select.Option>
              <Select.Option value="medical">Medical</Select.Option>
              <Select.Option value="fee">Fee</Select.Option>
              <Select.Option value="tax">TAX</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Reference" name="reference">
            <Input type="text" />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input type="text" />
          </Form.Item>
          <Form.Item label="Date" name="date">
            <Input type="date" />
          </Form.Item>
          <div className="d-flex justify-content-end">
            <button type="submit" className="btn btn-primary">
              {" "}
              SAVE
            </button>
          </div>
        </Form>
      </Modal>
    
    </Layout>
  );
};

export default HomePage;
