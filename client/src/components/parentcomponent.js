// ParentComponent.js

import React, { useState, useEffect } from 'react';
import BudgetSetting from './BudgetSetting';

const ParentComponent = () => {
  const [showBudgetModal, setShowBudgetModal] = useState(false);
  const [allTransaction, setAllTransaction] = useState([]);

  // Your useEffect hook to fetch all transactions

  return (
    <>
      <BudgetSetting
        visible={showBudgetModal}
        onCancel={() => setShowBudgetModal(false)}
        allTransaction={allTransaction}
      />
      {/* Your other components */}
    </>
  );
};

export default ParentComponent;
