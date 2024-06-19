import React, { useState } from 'react';
import { Box, Container, Grid, Link, SvgIcon, Typography } from '@mui/material';
import Search from '../components/weatherComponent/Search/Search';
import WeeklyForecast from '../components/weatherComponent/WeeklyForecast/WeeklyForecast';
import TodayWeather from '../components/weatherComponent/TodayWeather/TodayWeather';
import { fetchWeatherData } from '../apis/weatherApis/OpenWeatherService';
import { transformDateFormat } from '../utilities/weatherUtilities/DatetimeUtils';
import UTCDatetime from '../components/weatherComponent/Reusable/UTCDatetime';
import LoadingBox from '../components/weatherComponent/Reusable/LoadingBox';
import SplashIcon from '../assets/weatherAssets/splash-icon.svg?react';
import Logo from '../assets/weatherAssets/logo.png';
import ErrorBox from '../components/weatherComponent/Reusable/ErrorBox';
import { ALL_DESCRIPTIONS } from '../utilities/weatherUtilities/DateConstants.jsx';
import GitHubIcon from '@mui/icons-material/GitHub';
import { 
  getTodayForecastWeather,
  getWeekForecastWeather,
} from '../utilities/weatherUtilities/DataUtils';
// import { WeatherBg } from './weatherBg';

function WeatherMap() {

  const [todayWeather, setTodayWeather] = useState(null);
  const [todayForecast, setTodayForecast] = useState([]);
  const [weekForecast, setWeekForecast] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const searchChangeHandler = async (enteredData) => {
    const [latitude, longitude] = enteredData.value.split(' ');

    setIsLoading(true);

    const currentDate = transformDateFormat();
    console.log("🚀 ~ searchChangeHandler ~ currentDate:", currentDate)
    // const date = new Date();
    // let dt_now = Math.floor(date.getTime() / 1000);
    const date = new Date();
    // 한국 시간대로 변환
    const kstDate = new Date(date.getTime() + (9 * 60 * 60 * 1000)); // UTC+9 시간대를 반영
    
    // 초 단위 타임스탬프 계산
    const dt_now = Math.floor(kstDate.getTime() / 1000);

    try {
      const [todayWeatherResponse, weekForecastResponse] =
      await fetchWeatherData(latitude, longitude);
      console.log("🚀 ~ searchChangeHandler ~ todayWeatherResponse:", todayWeatherResponse)
      console.log("🚀 ~ searchChangeHandler ~ weekForecastResponse:", weekForecastResponse)
      const all_today_forecasts_list = getTodayForecastWeather(
        weekForecastResponse,
        currentDate,
        dt_now
      );

      console.log("🚀 ~ searchChangeHandler ~ all_today_forecasts_list:", all_today_forecasts_list)
      const all_week_forecasts_list = getWeekForecastWeather(
        weekForecastResponse,
        ALL_DESCRIPTIONS
      );
      
      console.log("🚀 ~ searchChangeHandler ~ all_week_forecasts_list:", all_week_forecasts_list)
      setTodayForecast([...all_today_forecasts_list]);
      setTodayWeather({ city: enteredData.label, ...todayWeatherResponse });
      setWeekForecast({
        city: enteredData.label,
        list: all_week_forecasts_list,
      });
    } catch (error) {
      setError(true);
    }

    setIsLoading(false);
  };

  let appContent = (
    <Box
      xs={12}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      sx={{
        width: '100%',
        minHeight: '500px',
      }}
    >
      <SvgIcon
        component={SplashIcon}
        inheritViewBox
        sx={{ fontSize: { xs: '100px', sm: '120px', md: '140px' } }}
      />
      <Typography
        variant="h4"
        component="h4"
        sx={{
          fontSize: { xs: '12px', sm: '14px' },
          color: 'rgba(255,255,255, .85)',
          fontFamily: 'Poppins',
          textAlign: 'center',
          margin: '2rem 0',
          maxWidth: '100%',
          lineHeight: '22px',
        }}
      >
        Explore current weather data and 6-day forecast of more than 200,000
        cities!
      </Typography>
    </Box>
  );

  if (todayWeather && todayForecast && weekForecast) {
    appContent = (
      <React.Fragment>
        <Grid item xs={12} md={todayWeather ? 6 : 12}>
          <Grid item xs={12}>
            <TodayWeather data={todayWeather} forecastList={todayForecast} />
          </Grid>
        </Grid>
        <Grid item xs={12} md={6}>
          <WeeklyForecast data={weekForecast} />
        </Grid>
      </React.Fragment>
    );
  }

  if (error) {
    appContent = (
      <ErrorBox
        margin="3rem auto"
        flex="inherit"
        errorMessage="Something went wrong"
      />
    );
  }

  if (isLoading) {
    appContent = (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          minHeight: '500px',
        }}
      >
        <LoadingBox value="1">
          <Typography
            variant="h3"
            component="h3"
            sx={{
              fontSize: { xs: '10px', sm: '12px' },
              color: 'rgba(255, 255, 255, .8)',
              lineHeight: 1,
              fontFamily: 'Poppins',
            }}
          >
            Loading...
          </Typography>
        </LoadingBox>
      </Box>
    );
  }

  return (
    <div
      className='weatherPage'
    >
      <Container
        sx={{
          maxWidth: { xs: '95%', sm: '80%', md: '1200px' },
          width: '100%',
          height: '100%',
          backgroundColor: 'none',
          margin: '0 auto',
          padding: '1rem 0 3rem',
          marginBottom: '1rem',
          borderRadius: {
            xs: 'none',
            sm: '0 0 1rem 1rem',
          },
        }}
      >
        <Grid container columnSpacing={2}>
          <Grid item xs={12}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              sx={{
                width: '100%',
                marginBottom: '1rem',
              }}
            >
              <UTCDatetime />
            </Box>
            <Search onSearchChange={searchChangeHandler} />
          </Grid>
          {appContent}
        </Grid>
      </Container>
      {/* <div className='weatherBg'>
        <WeatherBg />
      </div> */}
    </div>
  );
}

export default WeatherMap;
