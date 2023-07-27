// Write your code here
import {Component} from 'react'

import Loader from 'react-loader-spinner'
import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByAge from '../VaccinationByAge'
import VaccinationByGender from '../VaccinationByGender'

import './index.css'

const apiStatusConstant = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class CowinDashboard extends Component {
  state = {
    apiStatus: apiStatusConstant.initial,
    cowinData: {},
  }

  componentDidMount() {
    this.getVaccinationDetails()
  }

  getVaccinationDetails = async () => {
    this.setState({apiStatus: apiStatusConstant.inProgress})
    const vaccinationDataApiUrl = 'https://apis.ccbp.in/covid-vaccination-data'
    const response = await fetch(vaccinationDataApiUrl)
    if (response.ok) {
      const data = await response.json()
      console.log(data)
      const formattedData = {
        last7DaysVaccination: data.last_7_days_vaccination.map(eachDayData => ({
          vaccineDate: eachDayData.vaccine_date,
          dose1: eachDayData.dose_1,
          dose2: eachDayData.dose_2,
        })),
        vaccinationByAge: data.vaccination_by_age.map(eachAge => ({
          age: eachAge.age,
          count: eachAge.count,
        })),
        vaccinationByGender: data.vaccination_by_gender.map(eachGender => ({
          gender: eachGender.gender,
          count: eachGender.count,
        })),
      }
      this.setState({
        cowinData: formattedData,
        apiStatus: apiStatusConstant.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstant.failure})
    }
  }

  renderFailedView = () => (
    <div className="failed-con">
      <img
        className="failed-img"
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
      />
      <h1 className="failed-head">Something went wrong</h1>
    </div>
  )

  renderLoader = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )

  renderCowinData = () => {
    const {cowinData} = this.state
    return (
      <>
        <VaccinationCoverage
          vaccinationCoverageDetails={cowinData.last7DaysVaccination}
        />
        <VaccinationByGender
          vaccinationByGenderDetails={cowinData.vaccinationByGender}
        />
        <VaccinationByAge vaccinationByAge={cowinData.vaccinationByAge} />
      </>
    )
  }

  renderResult = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstant.success:
        return this.renderCowinData()
      case apiStatusConstant.failure:
        return this.renderFailedView()
      case apiStatusConstant.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="main">
        <div className="logo-con">
          <img
            className="logo"
            src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
            alt="website logo"
          />
          <h1 className="head">Co-WIN</h1>
        </div>
        <h1 className="main-head">CoWIN Vaccination in India</h1>
        <div className="result-con"> {this.renderResult()}</div>
      </div>
    )
  }
}

export default CowinDashboard
