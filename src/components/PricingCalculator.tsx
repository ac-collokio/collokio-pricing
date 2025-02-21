
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Check, Plus, Minus } from "lucide-react";
import { BASE_PRICE, companySize, tools } from "@/data/pricingData";

const PricingCalculator = () => {
  const [selectedSize, setSelectedSize] = useState(companySize[0].id);
  const [selectedTools, setSelectedTools] = useState<string[]>([]);
  const [toolCounters, setToolCounters] = useState<Record<string, number>>({});
  const [totalPrice, setTotalPrice] = useState(BASE_PRICE);

  const calculatePrice = () => {
    const sizeMultiplier = companySize.find((size) => size.id === selectedSize)?.multiplier || 1;
    
    const toolsPrice = tools.reduce((acc, tool) => {
      if (tool.type === "counter") {
        return acc + (tool.price * (toolCounters[tool.id] || 0));
      } else if (selectedTools.includes(tool.id)) {
        return acc + tool.price;
      }
      return acc;
    }, 0);

    const baseWithMultipliers = BASE_PRICE * sizeMultiplier;
    return Math.round(baseWithMultipliers + toolsPrice);
  };

  useEffect(() => {
    setTotalPrice(calculatePrice());
  }, [selectedSize, selectedTools, toolCounters]);

  const handleToolToggle = (toolId: string) => {
    setSelectedTools((prev) =>
      prev.includes(toolId)
        ? prev.filter((id) => id !== toolId)
        : [...prev, toolId]
    );
  };

  const handleCounterChange = (toolId: string, increment: boolean) => {
    setToolCounters((prev) => {
      const currentValue = prev[toolId] || 0;
      const newValue = increment ? currentValue + 1 : Math.max(0, currentValue - 1);
      return {
        ...prev,
        [toolId]: newValue
      };
    });
  };

  return (
    <div className="min-h-screen bg-pricing-light py-12 px-4 sm:px-6 lg:px-8 animate-fade-in">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Calculadora de Precios
          </h1>
          <p className="text-lg text-gray-600">
            Personaliza tu plan según las necesidades de tu empresa
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Tamaño de Empresa</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {companySize.map((size) => (
                <button
                  key={size.id}
                  onClick={() => setSelectedSize(size.id)}
                  className={`p-4 rounded-xl transition-all duration-200 ${
                    selectedSize === size.id
                      ? "bg-pricing-accent text-white"
                      : "bg-gray-50 hover:bg-gray-100 text-gray-800"
                  }`}
                >
                  <div className="font-medium">{size.name}</div>
                  <div className="text-sm opacity-80">{size.description}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">PowerUps</h2>
            <div className="grid grid-cols-1 gap-4">
              {tools.map((tool) => (
                <motion.div
                  key={tool.id}
                  whileHover={{ scale: 1.01 }}
                  className={`p-4 rounded-xl border transition-all duration-200 ${
                    tool.type === "checkbox" && selectedTools.includes(tool.id)
                      ? "border-pricing-accent bg-pricing-accent bg-opacity-5"
                      : "border-gray-200"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-gray-900">{tool.name}</div>
                      <div className="text-sm text-gray-600">
                        {tool.type === "counter" 
                          ? `$${tool.price} ${tool.description}`
                          : `$${tool.price}/mes`}
                      </div>
                    </div>
                    {tool.type === "counter" ? (
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => handleCounterChange(tool.id, false)}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="w-12 text-center font-medium">
                          {toolCounters[tool.id] || 0}
                        </span>
                        <button
                          onClick={() => handleCounterChange(tool.id, true)}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    ) : (
                      <div
                        onClick={() => handleToolToggle(tool.id)}
                        className={`w-6 h-6 rounded-full flex items-center justify-center cursor-pointer ${
                          selectedTools.includes(tool.id)
                            ? "bg-pricing-accent text-white"
                            : "border-2 border-gray-300"
                        }`}
                      >
                        {selectedTools.includes(tool.id) && <Check size={14} />}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-pricing-accent text-white rounded-2xl p-8 text-center"
        >
          <div className="text-xl mb-2">Precio Total Estimado</div>
          <div className="text-5xl font-bold">${totalPrice}/mes</div>
        </motion.div>
      </div>
    </div>
  );
};

export default PricingCalculator;
