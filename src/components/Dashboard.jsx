import axios from 'axios';
import * as React from 'react';
import { useEffect, useState } from 'react';
import '../styles/dashboard.css';
import BasicPie from './BasicPie';
import BasicTable from './BasicTable';
import Header from './Header';

function Dashboard() {
  const [testData, setTestData] = useState(null);
  const [capabilitiesData, setCapabilitiesData] = useState(null);
  const [allData, setAllData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const testSummaryPath = "/test_summary_20250226_144245.json";
      try {
        const response = await axios.get(testSummaryPath);
        console.log(`Fetching data from ${testSummaryPath}`);
        if (response.data) {
          setTestData(response.data.overall_metrics);
          setCapabilitiesData(response.data.capabilities);
          setAllData(response.data);
        } else {
          console.error("Unexpected data structure:", response.data);
        }
      } catch (error) {
        console.error(`Error fetching data from ${testSummaryPath}:`, error);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <div className='page-container'>
        <Header />
        <div className='container'>
          <h2>Overall Metrics</h2>
          <div className='pie-table-container'>
            {testData && <>
              <BasicPie data={[
                { id: 0, value: testData.passed_tests, label: 'Passed tests', color: '#FFCC00' },
                { id: 1, value: testData.failed_tests, label: 'Failed tests', color: '#DA291C' }
              ]} />
              <BasicTable />
            </>
            }
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
