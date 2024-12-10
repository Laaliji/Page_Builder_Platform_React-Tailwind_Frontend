import axios from 'axios'

axios.defaults.headers = {
  Authorization: 'aKbUDekFAKiWP0Rx4wGY3HdNU7wrbWJvhkrefgyW6pdiWuVCry8izvNHkpFhfG9B'
}

const APP_URL = 'http://173.249.14.149:3001/api'
//http://173.249.14.149:3001/api/Dashboards/5ef370de14213070188a41eb?access_Token=B6IES26pZSvpX4J8c8q4wmseASpRtmBOtvXzztH57NDDJXxO94qE7VbtJ7y718GZ
//http://173.249.14.149:3001/api/Dashboards/5ef370de14213070188a41eb/widgetSettings?access_token=B6IES26pZSvpX4J8c8q4wmseASpRtmBOtvXzztH57NDDJXxO94qE7VbtJ7y718GZ

export const addWidget = async (widgetData, dashboardId = '5ef370de14213070188a41eb') => {
  return axios
    .post(
      `${APP_URL}/Dashboards/${dashboardId}/widgetSettings`,
      widgetData
    )
}
export const updatedash = async (dashboardId, widgetData) => {
  return axios
    .put(
      `${APP_URL}/Dashboards/${dashboardId}`,
      {grapes: widgetData}
    )
}

//http://173.249.14.149:3001/api/widgetsettings/5ef7454a14213070188a46f9?access_token=B6IES26pZSvpX4J8c8q4wmseASpRtmBOtvXzztH57NDDJXxO94qE7VbtJ7y718GZ

export const updateWidget = async (widgetId, widgetData) => {
  return axios
    .put(
      `${APP_URL}/WidgetSettings/${widgetId}`,
      widgetData
    )
}

export const getWidgets = async (dashboardId = '5ef370de14213070188a41eb') => {
  return axios
    .get(
      `${APP_URL}/Dashboards/${dashboardId}/widgetSettings`
    )
}

export const getWidgetData = async (widgetId) => {
  return axios.get(
    `${APP_URL}/WidgetSettings/${widgetId}/execute-query`,
  )
}
