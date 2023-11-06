import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import store from '../../store';

export const WeatherChart = () => {
  // Получаем данные о загрязнениях из хранилища
  const weatherData = useSelector(
    (state: ReturnType<typeof store.getState>) =>
      state.Reducer.weatherDataReducer.weatherData
  );
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  return (
    <>
      {weatherData ? (
        <Line
          data={{
            // Загружаем метки даты и времени в график
            labels: weatherData.hourly.time.map((d: string) => {
              return new Date(d).toLocaleString([], {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
              });
            }),
            // загружаем данные в график
            datasets: [
              {
                label: 'pm 2,5',
                data: weatherData.hourly.pm2_5,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
              },
              {
                label: 'pm 10',
                data: weatherData.hourly.pm10,
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
              },
            ],
          }}
        />
      ) : (
        ''
      )}
    </>
  );
};
