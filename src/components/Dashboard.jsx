import axios from 'axios';
import * as React from 'react';
import { useEffect, useState } from 'react';
import '../styles/dashboard.css';
import BasicPie from './BasicPie';
import BasicTable from './BasicTable';
import CapabilityCard from './CapabilityCard';
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
        <div className='test-card-container'>
          <h2>Overall Metrics</h2>
          <div className='container'>
            <div className='pie-table-container'>
              {testData && <>
                <BasicPie data={[
                  { id: 0, value: testData.passed_tests, label: `Passed tests`, color: '#FFCC00' },
                  { id: 1, value: testData.failed_tests, label: 'Failed tests', color: '#DA291C' },
                  { id: 2, value: 0, label: `Total tests: ${testData.total_tests.toLocaleString('en-us')}`, color: 'white' },
                  { id: 3, value: testData.success_rate, label: `Success rate: ${testData.success_rate.toFixed(2).toLocaleString('en-us')}%`, color: 'green' },
                ]} />
                <BasicTable />
              </>
              }
            </div>
          </div>
        </div>
        <div className='test-card-container'>
          <h2>Capabilities</h2>
          <div className='capability-card-container'>
            {
              (testData && capabilitiesData) &&
              Object.keys(capabilitiesData).map((capability, cardIdx) => (
                <CapabilityCard
                  key={`card-${cardIdx}`}
                  pieData={[
                    { id: 0, value: capabilitiesData[capability].passed_tests, label: 'Passed tests', color: '#FFCC00' },
                    { id: 1, value: capabilitiesData[capability].failed_tests, label: 'Failed tests', color: '#DA291C' },
                    { id: 2, value: 0, label: `Total tests: ${capabilitiesData[capability].total_tests.toLocaleString('en-us')}`, color: 'white' },
                    { id: 3, value: 0, label: `Success rate: ${capabilitiesData[capability].success_rate.toFixed(2).toLocaleString('en-us')}%`, color: 'green' }
                  ]}
                  capabilityName={capability.slice(0, 1).toUpperCase() + capability.slice(1)}
                  capabilitiesData={capabilitiesData[capability].metrics}
                />
              ))
            }
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
