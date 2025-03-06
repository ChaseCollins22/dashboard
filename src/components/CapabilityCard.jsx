import '../styles/capabilityCard.css'
import BarChart from './BasicBarChart.jsx'
import BasicPie from './BasicPie.jsx'


export default function CapabilityCard({ pieData, capabilityName, capabilitiesData }) {
  return (
    <div className='card-container'>
      <h2>{capabilityName}</h2>
      <BasicPie
        data={pieData}
      />
      <BarChart
        capabilitiesData={capabilitiesData}
      />
    </div>
  )
}