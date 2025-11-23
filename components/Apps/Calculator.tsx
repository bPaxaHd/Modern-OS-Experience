import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Delete } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const Calculator = () => {
  const isMobile = useIsMobile();
  const [display, setDisplay] = useState("0");
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [newNumber, setNewNumber] = useState(true);

  const handleNumber = (num: string) => {
    if (newNumber) {
      setDisplay(num);
      setNewNumber(false);
    } else {
      setDisplay(display === "0" ? num : display + num);
    }
  };

  const handleOperation = (op: string) => {
    const currentValue = parseFloat(display);
    
    if (previousValue === null) {
      setPreviousValue(currentValue);
    } else if (operation) {
      const result = calculate(previousValue, currentValue, operation);
      setDisplay(String(result));
      setPreviousValue(result);
    }
    
    setOperation(op);
    setNewNumber(true);
  };

  const calculate = (a: number, b: number, op: string): number => {
    switch (op) {
      case "+": return a + b;
      case "-": return a - b;
      case "×": return a * b;
      case "÷": return a / b;
      default: return b;
    }
  };

  const handleEquals = () => {
    if (operation && previousValue !== null) {
      const result = calculate(previousValue, parseFloat(display), operation);
      setDisplay(String(result));
      setPreviousValue(null);
      setOperation(null);
      setNewNumber(true);
    }
  };

  const handleClear = () => {
    setDisplay("0");
    setPreviousValue(null);
    setOperation(null);
    setNewNumber(true);
  };

  const handleDecimal = () => {
    if (newNumber) {
      setDisplay("0.");
      setNewNumber(false);
    } else if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  };

  const handleBackspace = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay("0");
      setNewNumber(true);
    }
  };

  const buttonClass = isMobile 
    ? "h-14 text-base font-medium transition-os" 
    : "h-16 text-lg font-medium transition-os hover:scale-105";
  const numberClass = `${buttonClass} bg-muted hover:bg-muted/80`;
  const operationClass = `${buttonClass} bg-primary/20 hover:bg-primary/30 text-primary`;
  const equalsClass = `${buttonClass} bg-primary hover:bg-primary/90 text-primary-foreground burgundy-glow`;

  return (
    <div className={`h-full flex flex-col ${isMobile ? 'p-3' : 'p-4'} relative overflow-hidden`}>
      <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/3 to-background" />
      
      <div className={`mb-4 ${isMobile ? 'p-4' : 'p-6'} glass-effect rounded-2xl relative z-10 animate-fade-in-down`}>
        <div className="relative">
          <div className="text-sm text-muted-foreground mb-1 font-medium">
            {previousValue !== null && `${previousValue} ${operation || ""}`}
          </div>
          <div className={`${isMobile ? 'text-3xl' : 'text-4xl'} font-light text-right break-all text-foreground`}>
            {display}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2 flex-1 relative z-10">
        <Button variant="ghost" className={`${operationClass} animate-scale-in`} style={{ animationDelay: '0ms' }} onClick={handleClear}>C</Button>
        <Button variant="ghost" className={`${operationClass} animate-scale-in`} style={{ animationDelay: '50ms' }} onClick={handleBackspace}><Delete className="h-5 w-5" /></Button>
        <Button variant="ghost" className={`${operationClass} animate-scale-in`} style={{ animationDelay: '100ms' }} onClick={() => handleOperation("÷")}>÷</Button>
        <Button variant="ghost" className={`${operationClass} animate-scale-in`} style={{ animationDelay: '150ms' }} onClick={() => handleOperation("×")}>×</Button>

        <Button variant="ghost" className={`${numberClass} animate-scale-in`} style={{ animationDelay: '200ms' }} onClick={() => handleNumber("7")}>7</Button>
        <Button variant="ghost" className={`${numberClass} animate-scale-in`} style={{ animationDelay: '250ms' }} onClick={() => handleNumber("8")}>8</Button>
        <Button variant="ghost" className={`${numberClass} animate-scale-in`} style={{ animationDelay: '300ms' }} onClick={() => handleNumber("9")}>9</Button>
        <Button variant="ghost" className={`${operationClass} animate-scale-in`} style={{ animationDelay: '350ms' }} onClick={() => handleOperation("-")}>-</Button>

        <Button variant="ghost" className={`${numberClass} animate-scale-in`} style={{ animationDelay: '400ms' }} onClick={() => handleNumber("4")}>4</Button>
        <Button variant="ghost" className={`${numberClass} animate-scale-in`} style={{ animationDelay: '450ms' }} onClick={() => handleNumber("5")}>5</Button>
        <Button variant="ghost" className={`${numberClass} animate-scale-in`} style={{ animationDelay: '500ms' }} onClick={() => handleNumber("6")}>6</Button>
        <Button variant="ghost" className={`${operationClass} animate-scale-in`} style={{ animationDelay: '550ms' }} onClick={() => handleOperation("+")}>+</Button>

        <Button variant="ghost" className={`${numberClass} animate-scale-in`} style={{ animationDelay: '600ms' }} onClick={() => handleNumber("1")}>1</Button>
        <Button variant="ghost" className={`${numberClass} animate-scale-in`} style={{ animationDelay: '650ms' }} onClick={() => handleNumber("2")}>2</Button>
        <Button variant="ghost" className={`${numberClass} animate-scale-in`} style={{ animationDelay: '700ms' }} onClick={() => handleNumber("3")}>3</Button>
        <Button variant="ghost" className={`${equalsClass} row-span-2 animate-scale-in`} style={{ animationDelay: '750ms' }} onClick={handleEquals}>=</Button>

      <Button variant="ghost" className={`${numberClass} col-span-2 animate-scale-in`} style={{ animationDelay: '800ms' }} onClick={() => handleNumber("0")}>0</Button>
      <Button variant="ghost" className={`${numberClass} animate-scale-in`} style={{ animationDelay: '850ms' }} onClick={handleDecimal}>.</Button>
    </div>
  </div>
  );
};

export default Calculator;
