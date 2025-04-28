import { useEffect, useMemo, useState } from "react";
import ordersApi from "../../api/orders.api";
import analyticsApi from "../../api/analytics.api";
import PageHeader from "../../components/page-header/page-header.component";
import "./dashboard.page.scss";
import {
  AreaChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
} from "recharts";
import useScreenDimensions from "../../hooks/useScreenDimensions";

export default function Dashboard() {
  const { width, height } = useScreenDimensions();
  const [analytics, setAnalytics] = useState({});
  const [loading, setLoading] = useState({ fetch: false });

  const findAnalytics = async () => {
    setLoading({ ...loading, fetch: true });
    const promises = [ordersApi.findMany(), analyticsApi.findMany()];

    const [orders, entries] = await Promise.all(promises);
    if (orders.ok && entries.ok) {
      setAnalytics({ orders: orders.data, entries: entries.data });
    }
    setLoading({ ...loading, fetch: false });
  };

  const chartData = useMemo(() => {
    if (!analytics?.entries) return [];
    const ordersData = {};
    analytics?.orders?.forEach?.((order) => {
      const newDate = new Date(order.createdAt).toISOString().split("T")[0];
      if (!ordersData[newDate]) ordersData[newDate] = 0;
      ordersData[newDate] += 1;
    });

    return {
      entries: getLast120Days()
        .map((key) => {
          key = key.toISOString().split("T")[0];
          return {
            date: formatDate(new Date(key)),
            count: analytics.entries[key] || 0,
          };
        })
        .reverse(),
      orders: getLast120Days()
        .map((key) => {
          key = key.toISOString().split("T")[0];
          return {
            date: formatDate(new Date(key)),
            count: ordersData[key] || 0,
          };
        })
        .reverse(),
    };
  }, [analytics]);

  useEffect(() => {
    findAnalytics();
  }, []);

  return (
    <section>
      <PageHeader title="Dashboard" />

      <h2 className="chart-title">Website traffic (120 days)</h2>
      <AreaChart
        width={width - 292}
        height={350}
        data={loading.fetch ? [] : chartData.entries}
        margin={{ left: 0, right: 0, top: 0, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey="count" stroke="#fc7309" fill="#fc7309" />
      </AreaChart>

      <h2 className="chart-title">Orders (120 days)</h2>
      <AreaChart
        width={width - 292}
        height={350}
        data={loading.fetch ? [] : chartData.orders}
        margin={{ left: 0, right: 0, top: 0, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey="count" stroke="#fc7309" fill="#fc7309" />
      </AreaChart>
    </section>
  );
}

function formatDate(date) {
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const day = date.getDate();
  const monthIndex = date.getMonth();

  return `${monthNames[monthIndex]} ${day}`;
}
function getLast120Days() {
  const dates = [];
  const today = new Date(); // Today's date

  for (let i = 0; i < 120; i++) {
    const date = new Date(today); // Create a new Date object for mutation
    date.setDate(today.getDate() - i); // Subtract i days from today
    dates.push(date);
  }

  return dates;
}
