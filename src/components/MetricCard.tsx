interface MetricCardProps {
  title: string;
  value: number;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value }) => {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="text-lg font-bold">{title}</h3>
      <p>{value}</p>
    </div>
  );
};

export default MetricCard;
