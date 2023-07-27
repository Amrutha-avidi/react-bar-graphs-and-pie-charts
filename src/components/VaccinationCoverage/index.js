// Write your code here
import {BarChart, Bar, XAxis, YAxis, Legend} from 'recharts'
import './index.css'

const VaccinationCoverage = props => {
  const {vaccinationCoverageDetails} = props

  const DataFormatter = number => {
    if (number > 1000) {
      return `${(number / 1000).toString()}k`
    }
    return number.toString()
  }

  return (
    <div className="vaccination-by-coverage-con">
      <h1 className="vaccination-by-coverage-con-head">Vaccination Coverage</h1>
      <BarChart
        width={900}
        height={400}
        data={vaccinationCoverageDetails}
        margin={{top: 5}}
      >
        <XAxis
          dataKey="vaccineDate"
          tick={{
            stroke: '#cbd5e1',
            strokeWidth: 1,
          }}
        />
        <YAxis
          tickFormatter={DataFormatter}
          tick={{
            stroke: '#cbd5e1',
            strokeWidth: 0,
          }}
        />
        <Legend
          wrapperStyle={{
            padding: 30,
          }}
        />
        <Bar
          dataKey="dose1"
          radius={[10, 10, 0, 0]}
          name="Dose 1"
          fill="#5a8dee"
          barSize="20%"
        />
        <Bar
          dataKey="dose2"
          radius={[10, 10, 0, 0]}
          name="Dose 2"
          fill="#f54394"
          barSize="20%"
        />
      </BarChart>
    </div>
  )
}
export default VaccinationCoverage
