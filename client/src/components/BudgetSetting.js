import React, { useState, useEffect } from 'react';
import { Modal, Input, Button } from 'antd';

const BudgetSetting = ({ visible, onCancel, allTransaction }) => {
  const [budget, setBudget] = useState('');
  const [totalExpense, setTotalExpense] = useState(0);

  useEffect(() => {
    // Calculate total expense
    const totalExpenseTransactions = allTransaction.reduce((acc, transaction) => {
      if (transaction.type === "expense") {
        return acc + transaction.amount;
      }
      return acc;
    }, 0);
    setTotalExpense(totalExpenseTransactions);
  }, [allTransaction]);

  const handleSaveBudget = () => {
    console.log('Saving budget:', budget);
    onCancel();
  };

  return (
    <Modal
      title="Set Budget"
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button 
          key="save" 
          type="primary" 
          onClick={handleSaveBudget} 
          className={totalExpense > parseFloat(budget) ? 'red-button' : ''}
          style={{ backgroundColor: totalExpense > parseFloat(budget) ? 'red' : '' }}
        >
          Save
        </Button>,
      ]}
    >
      <div style={{ marginBottom: '1em' }}>
        <Input
          type="number"
          placeholder="Enter your budget"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
        />
      </div>
      <div>
        <Button 
          type="primary" 
          onClick={handleSaveBudget} 
          className={totalExpense > parseFloat(budget) ? 'red-button' : ''}
          style={{ backgroundColor: totalExpense > parseFloat(budget) ? 'red' : '' }}
        >
          Set Budget
        </Button>
      </div>
    </Modal>
  );
};

export default BudgetSetting;
