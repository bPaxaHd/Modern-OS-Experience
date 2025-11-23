import Calculator from "@/components/Apps/Calculator";
import AppLayout from "@/components/Layout/AppLayout";
import { Calculator as CalcIcon } from "lucide-react";

const CalculatorPage = () => {
  return (
    <AppLayout title="Calculator" icon={CalcIcon}>
      <Calculator />
    </AppLayout>
  );
};

export default CalculatorPage;
