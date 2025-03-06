import axios from 'axios';
import Papa from 'papaparse';
import * as React from 'react';
import { useEffect, useState } from 'react';
import '../styles/dashboard.css';
import BasicBarChart from './BasicBarChart';
import BasicPie from './BasicPie';
import BasicTable from './BasicTable.jsx';
import CapabilityCard from './CapabilityCard';
import Header from './Header';

function Dashboard() {
  const [testData, setTestData] = useState(null);
  const [capabilitiesData, setCapabilitiesData] = useState(null);
  const [clarityData, setClarityData] = useState(null);

  useEffect(() => {
    async function fetchTestSummaryData() {
      const testSummaryPath = "/test_summary_20250226_144245.json";
      try {
        const response = await axios.get(testSummaryPath);
        // Removed console.log statement here
        if (response.data) {
          setTestData(response.data.overall_metrics);
          setCapabilitiesData(response.data.capabilities);
        } else {
          console.error("Unexpected data structure:", response.data);
        }
      } catch (error) {
        console.error(`Error fetching data from ${testSummaryPath}:`, error);
      }
    }

    async function fetchClarityData() {
      const clarityPath = "/IDP-Clarity.csv";
      try {
        const response = await axios.get(clarityPath);
        if (response.data) {
          Papa.parse(response.data, {
            header: false,
            skipEmptyLines: true,
            complete: (results) => {
              const rawClarityData = results.data.filter(row => row.some(dataPoint => dataPoint !== ''));
              setClarityData(cleanClarityData(rawClarityData));
            },
            error: (error) => {
              console.error("Error parsing CSV:", error);
            }
          });
        }
      } catch (error) {
        console.error(`Error fetching data from ${clarityPath}:`, error);
      }
    }

    // Consider extracting these fetches into a custom hook for reuse
    fetchTestSummaryData();
    fetchClarityData();
  }, []);

  function transformOverallData() {
    return Object.entries(testData).slice(0, 4).reduce((returnObj, [key, value]) => {
      if (typeof value === 'object') {
        Object.keys(value).forEach(key => {
          returnObj[key] = value[key];
        });
      } else {
        returnObj[key] = value;
      }
      return { ...returnObj };
    }, {});
  }

  function cleanClarityData(arr) {
    const metricIndices = arr.map((row, index) => row[0] === 'Metric' && index).filter(row => row);
    const metricSections = metricIndices.map((metricIdx, currIdx) => {
      const nextIdx = currIdx < metricIndices.length - 1 ? metricIndices[currIdx + 1] : arr.length;
      return {
        metricName: arr[metricIdx][1],
        data: arr.slice(metricIdx, nextIdx)
      };
    });
    return metricSections;
  }

  return (
    <>
      <div className='page-container'>
        <Header />
        <div className='test-card-container'>
          <h2>Overall Metrics</h2>
          <div className='container'>
            {testData && <>
              <BasicPie data={[
                { id: 0, value: testData.passed_tests, label: `Passed tests`, color: '#FFCC00' },
                { id: 1, value: testData.failed_tests, label: 'Failed tests', color: '#DA291C' },
                { id: 2, value: 0, label: `Total tests: ${testData.total_tests.toLocaleString('en-us')}`, color: 'transparent' },
                { id: 3, value: 0, label: `Success rate: ${testData.success_rate.toFixed(2).toLocaleString('en-us')}%`, color: 'transparent' }
              ]} />
              <BasicBarChart
                capabilitiesData={transformOverallData(testData)}
                label='Overall Metrics'
              />
            </>}
          </div>
        </div>
        <div className='test-card-container'>
          <h2>Capabilities</h2>
          <div className='capability-card-container'>
            {(testData && capabilitiesData) && Object.keys(capabilitiesData).map((capability, cardIdx) => (
              <CapabilityCard
                key={`card-${cardIdx}`}
                pieData={[
                  { id: 0, value: capabilitiesData[capability].passed_tests, label: 'Passed tests', color: '#FFCC00' },
                  { id: 1, value: capabilitiesData[capability].failed_tests, label: 'Failed tests', color: '#DA291C' },
                  { id: 2, value: 0, label: `Total tests: ${capabilitiesData[capability].total_tests.toLocaleString('en-us')}`, color: 'transparent' },
                  { id: 3, value: 0, label: `Success rate: ${capabilitiesData[capability].success_rate.toFixed(2).toLocaleString('en-us')}%`, color: 'transparent' }
                ]}
                capabilityName={capability.slice(0, 1).toUpperCase() + capability.slice(1)}
                capabilitiesData={capabilitiesData[capability].metrics}
              />
            ))}
          </div>
        </div>
        <div className='test-card-container'>
          {clarityData && <>
            <h2>Clarity Metrics</h2>
            <div className='clarity-metrics-container'>
              <BasicTable clarityData={clarityData} />
            </div>
          </>}
        </div>
      </div>
      <div style={{ height: '7em' }}></div>
    </>
  );
}

export default Dashboard;


