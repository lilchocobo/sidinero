import { ResponsiveContainer, LineChart as RechartsLineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';

export function LineChart() {
  // Generate one-minute interval data for a single day
  const generateMinuteData = (startDate: string, startPrice: number, endPrice: number) => {
    const data = [];
    const start = new Date(startDate);
    const end = new Date(start);
    end.setHours(23, 59, 59);

    const totalMinutes = (end.getTime() - start.getTime()) / (1000 * 60);
    const baseIncrement = (endPrice - startPrice) / totalMinutes;

    for (let i = 0; i <= totalMinutes; i++) {
      const currentDate = new Date(start);
      currentDate.setMinutes(start.getMinutes() + i);
      
      // Add wave patterns and random noise
      const wave1 = Math.sin(i / 120) * 0.02; // Longer wave
      const wave2 = Math.sin(i / 30) * 0.01;  // Shorter wave
      const noise = (Math.random() - 0.5) * 0.005; // Random noise
      
      const currentPrice = startPrice + 
        (baseIncrement * i) + // Base linear trend
        wave1 + wave2 + noise; // Add variations
      
      data.push({ 
        date: currentDate.toISOString(), 
        price: Math.max(0, currentPrice) // Ensure price doesn't go negative
      });
    }

    return data;
  };

  const data = generateMinuteData('2024-03-07T00:00:00', 0.75, 0.85);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsLineChart data={data}>
        <XAxis 
          dataKey="date" 
          axisLine={false}
          tickLine={false}
          tick={{ fill: '#7C3AED', fontSize: 12 }}
        />
        <YAxis 
          hide={true}
          domain={['dataMin - 0.05', 'dataMax + 0.05']}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: '#7C3AED',
            border: 'none',
            borderRadius: '8px',
            padding: '8px'
          }}
          labelStyle={{ color: 'white' }}
          itemStyle={{ color: 'white' }}
          formatter={(value: number) => [`$${value.toFixed(2)}`, 'Price']}
        />
        <Line
          type="monotone"
          dataKey="price"
          stroke="#7C3AED"
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 6, fill: '#7C3AED' }}
        />
      </RechartsLineChart>
    </ResponsiveContainer>
  );
}