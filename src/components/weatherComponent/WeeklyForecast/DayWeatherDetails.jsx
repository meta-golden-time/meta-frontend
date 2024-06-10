import { Box, Grid, Typography } from '@mui/material';
import React,{useState, useEffect} from 'react';
import { weatherIcon_week } from '../../../utilities/weatherUtilities/IconsUtils';

const DayWeatherDetails = (props) => {
  const [icon, setIcon] = useState(null);

  useEffect(() => {
    async function fetchIcon() {
      const iconData = await weatherIcon_week(props.weatherList.icon);
      setIcon(iconData);     
    }
      
      
    fetchIcon();
  }, [props.weatherList]);
  return (
    <Grid
      container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        paddingLeft: { xs: '12px', sm: '20px', md: '32px' },
      }}
    >
      <Typography
        xs={12}
        sx={{
          fontFamily: 'Poppins',
          fontWeight: { xs: '400', sm: '600' },
          fontSize: { xs: '12px', sm: '13px', md: '14px' },
          color: 'white',
          lineHeight: 1,
          height: '31px',
          alignItems: 'center',
          display: 'flex',
        }}
      >
        {props.day}
      </Typography>
      <Box
        xs={12}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '31px',
        }}
      >
        {icon ? (
          <Box
            component="img"
            sx={{
              width: { xs: '36px', sm: '42px' },
              height: 'auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              alignSelf: 'center',
              margin: '0 auto',
            }}
            alt="weather"
            src={icon}
          />
        ) : (
          <Typography>Loading...</Typography>
        )}
        <Typography
          variant="h4"
          component="h4"
          sx={{
            fontSize: { xs: '12px', md: '14px' },
            color: 'rgba(255,255,255, .8)',
            lineHeight: 1,
            fontFamily: 'Roboto Condensed',
          }}
        >
          {props.description}
        </Typography>
      </Box>
    </Grid>
  );
};

export default DayWeatherDetails;
