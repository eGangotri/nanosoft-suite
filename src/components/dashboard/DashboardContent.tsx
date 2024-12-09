import React from 'react';
import EmployeeOverview from './EmployeeOverview';
import TaskSummary from './TaskSummary';
import Announcements from './Announcements';

const DashboardContent: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-2">
      <div className="col-span-1">
        <EmployeeOverview />
      </div>
      <div className="col-span-1">
        <TaskSummary />
      </div>
      <div className="col-span-1">
        <Announcements />
      </div>
    </div>
  );
};

export default DashboardContent;