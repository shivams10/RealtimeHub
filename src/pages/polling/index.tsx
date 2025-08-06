import { useState, useEffect } from 'react';

const API_URL: string = import.meta.env.VITE_API_URL;
interface WeatherData {
  latitude: number;
  longitude: number;
  current: {
    time: string;
    temperature_2m: number;
  };
  current_units: {
    temperature_2m: string;
  };
  hourly: {
    time: string[];
    temperature_2m: number[];
  };
  hourly_units: {
    temperature_2m: string;
  };
}

export default function WeatherApp() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(`${API_URL}/api-polling`);

        if (!response.ok) {
          throw new Error('Failed to fetch weather data');
        }

        const data = await response.json();
        setWeatherData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    let interval: NodeJS.Timeout;

    fetchWeatherData()
      .then(() => {
        interval = setInterval(() => {
          fetchWeatherData()
            .then(() => console.log('Data updated'))
            .catch(() => console.log('Failed to fetch latest data'));
        }, 5000);
      })
      .catch(() => {
        console.log('Failed to fetch latest data');
      });

    return () => clearInterval(interval);
  }, []);

  const formatTime = (timeString: string) => {
    const date = new Date(timeString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  if (loading) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center'>
        <div className='text-white text-xl'>Loading weather data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center'>
        <div className='text-white text-xl'>Error: {error}</div>
      </div>
    );
  }

  if (!weatherData) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center'>
        <div className='text-white text-xl'>No weather data available</div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600'>
      <div className='container mx-auto px-4 py-8'>
        {/* Header */}
        <header className='text-center mb-8'>
          <h1 className='text-4xl font-bold text-white mb-2'>Weather Forecast</h1>
          <p className='text-blue-100'>
            Location: {weatherData.latitude.toFixed(3)}°N, {weatherData.longitude.toFixed(3)}°E
          </p>
        </header>

        {/* Current Weather */}
        <section className='bg-white/20 backdrop-blur-sm rounded-2xl p-8 mb-8 text-center'>
          <h2 className='text-2xl font-semibold text-white mb-4'>Current Weather</h2>
          <div className='text-6xl font-bold text-white mb-2'>
            {weatherData.current.temperature_2m}°C
          </div>
          <p className='text-blue-100 text-lg'>
            Last updated: {formatTime(weatherData.current.time)} (
            {Intl.DateTimeFormat().resolvedOptions().timeZone})
          </p>
        </section>

        {/* Footer */}
        <footer className='text-center mt-8'>
          <p className='text-blue-100 text-sm'>PS: This is fake</p>
        </footer>
      </div>
    </div>
  );
}
